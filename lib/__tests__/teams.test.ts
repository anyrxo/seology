/**
 * Unit tests for team management functions
 */

import { db } from '@/lib/db'
import {
  createTeam,
  inviteToTeam,
  acceptInvitation,
  updateMemberRole,
  removeMember,
  hasPermission,
} from '@/lib/teams'
import { TeamRole } from '@prisma/client'

// Mock Prisma client
jest.mock('@/lib/db', () => ({
  db: {
    team: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    teamMember: {
      create: jest.fn(),
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    teamInvitation: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
    },
  },
}))

// Mock email service
jest.mock('@/lib/email', () => ({
  sendTeamInvitation: jest.fn().mockResolvedValue(undefined),
}))

describe('Team Management', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('createTeam', () => {
    it('should create a team with the user as owner', async () => {
      const mockTeam = {
        id: 'team-123',
        name: 'Test Team',
        description: 'Test Description',
        ownerId: 'user-123',
        plan: 'STARTER',
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const mockMember = {
        id: 'member-123',
        teamId: 'team-123',
        userId: 'user-123',
        role: 'OWNER' as TeamRole,
        joinedAt: new Date(),
      }

      ;(db.team.create as jest.Mock).mockResolvedValue(mockTeam)
      ;(db.teamMember.create as jest.Mock).mockResolvedValue(mockMember)

      const result = await createTeam('user-123', 'Test Team', 'Test Description')

      expect(result).toEqual(mockTeam)
      expect(db.team.create).toHaveBeenCalledWith({
        data: {
          name: 'Test Team',
          description: 'Test Description',
          ownerId: 'user-123',
        },
      })
      expect(db.teamMember.create).toHaveBeenCalledWith({
        data: {
          teamId: 'team-123',
          userId: 'user-123',
          role: 'OWNER',
        },
      })
    })

    it('should create a team without description', async () => {
      const mockTeam = {
        id: 'team-123',
        name: 'Test Team',
        description: null,
        ownerId: 'user-123',
        plan: 'STARTER',
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      ;(db.team.create as jest.Mock).mockResolvedValue(mockTeam)
      ;(db.teamMember.create as jest.Mock).mockResolvedValue({})

      const result = await createTeam('user-123', 'Test Team')

      expect(result).toEqual(mockTeam)
      expect(db.team.create).toHaveBeenCalledWith({
        data: {
          name: 'Test Team',
          description: undefined,
          ownerId: 'user-123',
        },
      })
    })
  })

  describe('inviteToTeam', () => {
    it('should send invitation email to new member', async () => {
      const mockTeam = {
        id: 'team-123',
        name: 'Test Team',
        ownerId: 'user-123',
      }

      const mockUser = {
        id: 'user-123',
        email: 'owner@test.com',
        name: 'Owner',
      }

      const mockInvitation = {
        id: 'invite-123',
        teamId: 'team-123',
        email: 'member@test.com',
        role: 'MEMBER' as TeamRole,
        token: 'invite-token-123',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      }

      ;(db.team.findUnique as jest.Mock).mockResolvedValue(mockTeam)
      ;(db.user.findUnique as jest.Mock).mockResolvedValue(mockUser)
      ;(db.teamMember.findFirst as jest.Mock).mockResolvedValue({
        role: 'OWNER',
      })
      ;(db.teamInvitation.create as jest.Mock).mockResolvedValue(mockInvitation)

      const result = await inviteToTeam(
        'team-123',
        'user-123',
        'member@test.com',
        'MEMBER'
      )

      expect(result).toEqual(mockInvitation)
      expect(db.teamInvitation.create).toHaveBeenCalled()
    })

    it('should throw error if user is not admin or owner', async () => {
      const mockTeam = {
        id: 'team-123',
        ownerId: 'other-user',
      }

      ;(db.team.findUnique as jest.Mock).mockResolvedValue(mockTeam)
      ;(db.teamMember.findFirst as jest.Mock).mockResolvedValue({
        role: 'MEMBER',
      })

      await expect(
        inviteToTeam('team-123', 'user-123', 'member@test.com', 'MEMBER')
      ).rejects.toThrow('Only team owners and admins can invite members')
    })
  })

  describe('acceptInvitation', () => {
    it('should add user to team when accepting valid invitation', async () => {
      const mockInvitation = {
        id: 'invite-123',
        teamId: 'team-123',
        email: 'member@test.com',
        role: 'MEMBER' as TeamRole,
        token: 'valid-token',
        expiresAt: new Date(Date.now() + 1000 * 60 * 60),
        acceptedAt: null,
      }

      const mockUser = {
        id: 'user-123',
        email: 'member@test.com',
      }

      const mockTeam = {
        id: 'team-123',
        name: 'Test Team',
      }

      const mockMember = {
        id: 'member-123',
        teamId: 'team-123',
        userId: 'user-123',
        role: 'MEMBER' as TeamRole,
      }

      ;(db.teamInvitation.findUnique as jest.Mock).mockResolvedValue(mockInvitation)
      ;(db.user.findUnique as jest.Mock).mockResolvedValue(mockUser)
      ;(db.teamMember.create as jest.Mock).mockResolvedValue(mockMember)
      ;(db.team.findUnique as jest.Mock).mockResolvedValue(mockTeam)

      const result = await acceptInvitation('valid-token', 'user-123')

      expect(result).toEqual(mockTeam)
      expect(db.teamMember.create).toHaveBeenCalledWith({
        data: {
          teamId: 'team-123',
          userId: 'user-123',
          role: 'MEMBER',
        },
      })
    })

    it('should throw error for expired invitation', async () => {
      const mockInvitation = {
        id: 'invite-123',
        expiresAt: new Date(Date.now() - 1000),
        acceptedAt: null,
      }

      ;(db.teamInvitation.findUnique as jest.Mock).mockResolvedValue(mockInvitation)

      await expect(acceptInvitation('expired-token', 'user-123')).rejects.toThrow(
        'Invitation has expired'
      )
    })

    it('should throw error for already accepted invitation', async () => {
      const mockInvitation = {
        id: 'invite-123',
        expiresAt: new Date(Date.now() + 1000),
        acceptedAt: new Date(),
      }

      ;(db.teamInvitation.findUnique as jest.Mock).mockResolvedValue(mockInvitation)

      await expect(acceptInvitation('used-token', 'user-123')).rejects.toThrow(
        'Invitation has already been accepted'
      )
    })
  })

  describe('updateMemberRole', () => {
    it('should update member role successfully', async () => {
      const mockTeam = {
        id: 'team-123',
        ownerId: 'user-123',
      }

      const mockMember = {
        id: 'member-123',
        userId: 'target-user',
        role: 'ADMIN' as TeamRole,
      }

      ;(db.team.findUnique as jest.Mock).mockResolvedValue(mockTeam)
      ;(db.teamMember.findFirst as jest.Mock)
        .mockResolvedValueOnce({ role: 'OWNER' }) // Calling user
        .mockResolvedValueOnce(mockMember) // Target user
      ;(db.teamMember.update as jest.Mock).mockResolvedValue({
        ...mockMember,
        role: 'MEMBER',
      })

      const result = await updateMemberRole(
        'team-123',
        'user-123',
        'target-user',
        'MEMBER'
      )

      expect(result.role).toBe('MEMBER')
      expect(db.teamMember.update).toHaveBeenCalled()
    })

    it('should prevent changing owner role', async () => {
      const mockTeam = {
        id: 'team-123',
        ownerId: 'target-user',
      }

      ;(db.team.findUnique as jest.Mock).mockResolvedValue(mockTeam)
      ;(db.teamMember.findFirst as jest.Mock).mockResolvedValue({
        role: 'OWNER',
      })

      await expect(
        updateMemberRole('team-123', 'user-123', 'target-user', 'MEMBER')
      ).rejects.toThrow('Cannot change the role of the team owner')
    })
  })

  describe('removeMember', () => {
    it('should remove member from team', async () => {
      const mockTeam = {
        id: 'team-123',
        ownerId: 'user-123',
      }

      const mockMember = {
        id: 'member-123',
        userId: 'target-user',
      }

      ;(db.team.findUnique as jest.Mock).mockResolvedValue(mockTeam)
      ;(db.teamMember.findFirst as jest.Mock)
        .mockResolvedValueOnce({ role: 'OWNER' }) // Calling user
        .mockResolvedValueOnce(mockMember) // Target user
      ;(db.teamMember.delete as jest.Mock).mockResolvedValue(mockMember)

      await removeMember('team-123', 'user-123', 'target-user')

      expect(db.teamMember.delete).toHaveBeenCalledWith({
        where: { id: 'member-123' },
      })
    })

    it('should prevent removing team owner', async () => {
      const mockTeam = {
        id: 'team-123',
        ownerId: 'target-user',
      }

      ;(db.team.findUnique as jest.Mock).mockResolvedValue(mockTeam)
      ;(db.teamMember.findFirst as jest.Mock).mockResolvedValue({
        role: 'OWNER',
      })

      await expect(
        removeMember('team-123', 'user-123', 'target-user')
      ).rejects.toThrow('Cannot remove the team owner')
    })
  })

  describe('hasPermission', () => {
    it('should return true for team owner with any permission', async () => {
      const mockMember = {
        id: 'member-123',
        teamId: 'team-123',
        userId: 'user-123',
        role: 'OWNER' as TeamRole,
      }

      ;(db.teamMember.findUnique as jest.Mock).mockResolvedValue(mockMember)

      const result = await hasPermission('user-123', 'team-123', 'team.update')

      expect(result).toBe(true)
    })

    it('should return true for team admin with admin permission', async () => {
      const mockMember = {
        id: 'member-123',
        teamId: 'team-123',
        userId: 'user-123',
        role: 'ADMIN' as TeamRole,
      }

      ;(db.teamMember.findUnique as jest.Mock).mockResolvedValue(mockMember)

      const result = await hasPermission('user-123', 'team-123', 'team.invite')

      expect(result).toBe(true)
    })

    it('should return false for member without permission', async () => {
      const mockMember = {
        id: 'member-123',
        teamId: 'team-123',
        userId: 'user-123',
        role: 'MEMBER' as TeamRole,
      }

      ;(db.teamMember.findUnique as jest.Mock).mockResolvedValue(mockMember)

      const result = await hasPermission('user-123', 'team-123', 'team.update')

      expect(result).toBe(false)
    })

    it('should return false for non-member', async () => {
      ;(db.teamMember.findUnique as jest.Mock).mockResolvedValue(null)

      const result = await hasPermission('user-123', 'team-123', 'team.update')

      expect(result).toBe(false)
    })
  })
})
