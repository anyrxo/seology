/**
 * Team Collaboration System
 * Manage teams, members, invitations, and permissions
 */

import { db } from './db'
import { TeamRole, InvitationStatus } from '@prisma/client'
import crypto from 'crypto'
import { sendEmail } from './email'

// ==================== PERMISSIONS ====================

type Permission =
  | '*'
  | 'team.update'
  | 'team.invite'
  | 'team.remove_member'
  | 'connection.create'
  | 'connection.update'
  | 'connection.delete'
  | 'connection.view'
  | 'issue.view'
  | 'fix.view'
  | 'fix.execute'
  | 'fix.approve'

const PERMISSIONS: Record<TeamRole, Permission[]> = {
  OWNER: ['*'], // All permissions
  ADMIN: [
    'team.update',
    'team.invite',
    'team.remove_member',
    'connection.create',
    'connection.update',
    'connection.delete',
    'fix.execute',
    'fix.approve',
  ],
  MEMBER: [
    'connection.view',
    'connection.create',
    'issue.view',
    'fix.view',
    'fix.execute',
  ],
  VIEWER: ['connection.view', 'issue.view', 'fix.view'],
}

/**
 * Check if user has permission in team
 */
export async function hasPermission(
  userId: string,
  teamId: string,
  permission: string
): Promise<boolean> {
  const member = await db.teamMember.findUnique({
    where: {
      teamId_userId: {
        teamId,
        userId,
      },
    },
  })

  if (!member) return false

  const rolePermissions = PERMISSIONS[member.role]
  return (
    rolePermissions.includes('*' as Permission) ||
    rolePermissions.includes(permission as Permission)
  )
}

// ==================== TEAM MANAGEMENT ====================

/**
 * Create a new team
 */
export async function createTeam(
  userId: string,
  name: string,
  description?: string
) {
  const team = await db.team.create({
    data: {
      name,
      description,
      ownerId: userId,
      members: {
        create: {
          userId,
          role: 'OWNER',
        },
      },
    },
    include: {
      members: {
        include: {
          user: {
            select: { id: true, email: true, name: true },
          },
        },
      },
    },
  })

  return team
}

/**
 * Get user's teams
 */
export async function getUserTeams(userId: string) {
  const memberships = await db.teamMember.findMany({
    where: { userId },
    include: {
      team: {
        include: {
          owner: {
            select: { id: true, email: true, name: true },
          },
          _count: {
            select: { members: true, connections: true },
          },
        },
      },
    },
    orderBy: {
      joinedAt: 'desc',
    },
  })

  return memberships.map((m) => ({
    ...m.team,
    myRole: m.role,
    memberCount: m.team._count.members,
    connectionCount: m.team._count.connections,
  }))
}

/**
 * Get team details
 */
export async function getTeam(teamId: string, userId: string) {
  // Verify user is member
  const member = await db.teamMember.findUnique({
    where: {
      teamId_userId: {
        teamId,
        userId,
      },
    },
  })

  if (!member) {
    throw new Error('Not a member of this team')
  }

  const team = await db.team.findUnique({
    where: { id: teamId },
    include: {
      owner: {
        select: { id: true, email: true, name: true },
      },
      members: {
        include: {
          user: {
            select: { id: true, email: true, name: true },
          },
        },
        orderBy: {
          joinedAt: 'asc',
        },
      },
      invitations: {
        where: {
          status: 'PENDING',
        },
        include: {
          inviter: {
            select: { email: true, name: true },
          },
        },
      },
      connections: {
        select: {
          id: true,
          platform: true,
          domain: true,
          displayName: true,
          status: true,
          createdAt: true,
        },
      },
    },
  })

  return team
}

/**
 * Update team
 */
export async function updateTeam(
  teamId: string,
  userId: string,
  updates: {
    name?: string
    description?: string
  }
) {
  // Check permission
  if (!(await hasPermission(userId, teamId, 'team.update'))) {
    throw new Error('No permission to update team')
  }

  const team = await db.team.update({
    where: { id: teamId },
    data: updates,
  })

  return team
}

/**
 * Delete team
 */
export async function deleteTeam(teamId: string, userId: string) {
  // Only owner can delete
  const team = await db.team.findUnique({
    where: { id: teamId },
  })

  if (!team || team.ownerId !== userId) {
    throw new Error('Only team owner can delete team')
  }

  await db.team.delete({
    where: { id: teamId },
  })

  return { success: true }
}

// ==================== INVITATIONS ====================

/**
 * Invite user to team
 */
export async function inviteToTeam(
  teamId: string,
  inviterId: string,
  email: string,
  role: TeamRole = 'MEMBER'
) {
  // Check permission
  if (!(await hasPermission(inviterId, teamId, 'team.invite'))) {
    throw new Error('No permission to invite members')
  }

  // Check if already a member
  const existingUser = await db.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    const existingMember = await db.teamMember.findUnique({
      where: {
        teamId_userId: {
          teamId,
          userId: existingUser.id,
        },
      },
    })

    if (existingMember) {
      throw new Error('User is already a team member')
    }
  }

  // Check for existing pending invitation
  const existingInvitation = await db.teamInvitation.findUnique({
    where: {
      teamId_email: {
        teamId,
        email,
      },
    },
  })

  if (existingInvitation && existingInvitation.status === 'PENDING') {
    throw new Error('Invitation already sent to this email')
  }

  // Generate unique token
  const token = crypto.randomBytes(32).toString('hex')

  // Create invitation (expires in 7 days)
  const invitation = await db.teamInvitation.create({
    data: {
      teamId,
      email,
      role,
      invitedBy: inviterId,
      token,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    include: {
      team: true,
      inviter: {
        select: { email: true, name: true },
      },
    },
  })

  // Send invitation email
  await sendInvitationEmail(invitation)

  return invitation
}

/**
 * Send invitation email
 */
async function sendInvitationEmail(invitation: {
  token: string
  email: string
  team: { name: string }
  inviter: { email: string; name: string | null }
  role: TeamRole
}) {
  const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL}/teams/accept?token=${invitation.token}`

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Team Invitation</h1>
          </div>
          <div class="content">
            <p>Hi there!</p>
            <p><strong>${invitation.inviter.name || invitation.inviter.email}</strong> has invited you to join the team <strong>${invitation.team.name}</strong> on SEOLOGY.AI as a <strong>${invitation.role}</strong>.</p>
            <p>Click the button below to accept the invitation:</p>
            <p style="text-align: center;">
              <a href="${inviteUrl}" class="button">Accept Invitation</a>
            </p>
            <p style="font-size: 14px; color: #666;">This invitation will expire in 7 days.</p>
            <p style="font-size: 14px; color: #666;">If you didn't expect this invitation, you can safely ignore this email.</p>
          </div>
          <div class="footer">
            <p>SEOLOGY.AI - AI-Powered SEO Automation</p>
          </div>
        </div>
      </body>
    </html>
  `

  await sendEmail({
    to: invitation.email,
    subject: `You've been invited to join ${invitation.team.name} on SEOLOGY.AI`,
    html,
  })
}

/**
 * Accept team invitation
 */
export async function acceptInvitation(token: string, userId: string) {
  const invitation = await db.teamInvitation.findUnique({
    where: { token },
    include: { team: true },
  })

  if (!invitation) {
    throw new Error('Invalid invitation')
  }

  if (invitation.status !== 'PENDING') {
    throw new Error('Invitation already processed')
  }

  if (new Date() > invitation.expiresAt) {
    await db.teamInvitation.update({
      where: { id: invitation.id },
      data: { status: 'EXPIRED' },
    })
    throw new Error('Invitation has expired')
  }

  // Get user email
  const user = await db.user.findUnique({
    where: { id: userId },
  })

  if (!user || user.email !== invitation.email) {
    throw new Error('Invitation is for a different email address')
  }

  // Create team membership
  await db.teamMember.create({
    data: {
      teamId: invitation.teamId,
      userId,
      role: invitation.role,
    },
  })

  // Mark invitation as accepted
  await db.teamInvitation.update({
    where: { id: invitation.id },
    data: {
      status: 'ACCEPTED',
      acceptedAt: new Date(),
    },
  })

  return invitation.team
}

/**
 * Revoke invitation
 */
export async function revokeInvitation(
  invitationId: string,
  userId: string,
  teamId: string
) {
  // Check permission
  if (!(await hasPermission(userId, teamId, 'team.invite'))) {
    throw new Error('No permission to revoke invitations')
  }

  await db.teamInvitation.update({
    where: { id: invitationId },
    data: { status: 'REVOKED' },
  })

  return { success: true }
}

// ==================== MEMBERS ====================

/**
 * Update member role
 */
export async function updateMemberRole(
  teamId: string,
  userId: string,
  targetUserId: string,
  newRole: TeamRole
) {
  // Only admins and owners can change roles
  if (!(await hasPermission(userId, teamId, 'team.invite'))) {
    throw new Error('No permission to update member roles')
  }

  // Can't change owner's role
  const team = await db.team.findUnique({
    where: { id: teamId },
  })

  if (team?.ownerId === targetUserId) {
    throw new Error('Cannot change team owner role')
  }

  const member = await db.teamMember.update({
    where: {
      teamId_userId: {
        teamId,
        userId: targetUserId,
      },
    },
    data: { role: newRole },
  })

  return member
}

/**
 * Remove team member
 */
export async function removeMember(
  teamId: string,
  userId: string,
  targetUserId: string
) {
  // Check permission
  if (!(await hasPermission(userId, teamId, 'team.remove_member'))) {
    throw new Error('No permission to remove members')
  }

  // Can't remove owner
  const team = await db.team.findUnique({
    where: { id: teamId },
  })

  if (team?.ownerId === targetUserId) {
    throw new Error('Cannot remove team owner')
  }

  await db.teamMember.delete({
    where: {
      teamId_userId: {
        teamId,
        userId: targetUserId,
      },
    },
  })

  return { success: true }
}

/**
 * Leave team
 */
export async function leaveTeam(teamId: string, userId: string) {
  const team = await db.team.findUnique({
    where: { id: teamId },
  })

  if (team?.ownerId === userId) {
    throw new Error('Owner cannot leave team. Transfer ownership or delete team.')
  }

  await db.teamMember.delete({
    where: {
      teamId_userId: {
        teamId,
        userId,
      },
    },
  })

  return { success: true }
}

/**
 * Transfer team ownership
 */
export async function transferOwnership(
  teamId: string,
  currentOwnerId: string,
  newOwnerId: string
) {
  const team = await db.team.findUnique({
    where: { id: teamId },
  })

  if (team?.ownerId !== currentOwnerId) {
    throw new Error('Only current owner can transfer ownership')
  }

  // Update team owner
  await db.team.update({
    where: { id: teamId },
    data: { ownerId: newOwnerId },
  })

  // Update roles
  await db.$transaction([
    // New owner gets OWNER role
    db.teamMember.update({
      where: {
        teamId_userId: {
          teamId,
          userId: newOwnerId,
        },
      },
      data: { role: 'OWNER' },
    }),
    // Previous owner becomes ADMIN
    db.teamMember.update({
      where: {
        teamId_userId: {
          teamId,
          userId: currentOwnerId,
        },
      },
      data: { role: 'ADMIN' },
    }),
  ])

  return { success: true }
}
