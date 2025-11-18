'use client'

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * DashflowDataTable - Simple data table from Dashflow X template
 *
 * Grid-based table for displaying structured data
 * Uses data-table-row with 5 columns
 */
interface DashflowDataTableProps {
  headers: string[]
  rows: Array<Record<string, string | number>>
  className?: string
}

export function DashflowDataTable({
  headers,
  rows,
  className
}: DashflowDataTableProps) {
  return (
    <div className={cn("card overflow-hidden border-none", className)}>
      <div className="overflow-auto">
        {/* Header */}
        <div className="data-table-row table-header">
          {headers.map((header, i) => (
            <div key={i} className="text-50 bold color-neutral-700">
              {header}
            </div>
          ))}
        </div>

        {/* Rows */}
        <div className="rows">
          {rows.map((row, i) => (
            <div key={i} className="data-table-row">
              {Object.values(row).map((value, j) => (
                <div
                  key={j}
                  className={cn(
                    "text-100",
                    j === 0 ? "bold color-neutral-800" : "medium"
                  )}
                >
                  {value}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * DashflowUserTable - User table with avatars from Dashflow X template
 *
 * Specialized table for displaying user information with:
 * - Avatar images
 * - Name and email
 * - Title and company
 * - Status badges
 * - Role
 */
interface UserRow {
  avatar: string
  name: string
  email: string
  title: string
  company: string
  status: "Active" | "Inactive" | "Pending"
  role: string
}

interface DashflowUserTableProps {
  users: UserRow[]
  className?: string
}

export function DashflowUserTable({
  users,
  className
}: DashflowUserTableProps) {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Active":
        return "color-badge green"
      case "Inactive":
        return "color-badge red"
      case "Pending":
        return "color-badge yellow"
      default:
        return "color-badge"
    }
  }

  return (
    <div className={cn("card overflow-hidden border-none", className)}>
      <div className="overflow-auto">
        {/* Header */}
        <div className="user-table-row table-header">
          <div className="text-50 bold color-neutral-700">Name</div>
          <div className="text-50 bold color-neutral-700">Title</div>
          <div className="text-50 bold color-neutral-700">Status</div>
          <div className="text-50 bold color-neutral-700">Role</div>
        </div>

        {/* Rows */}
        <div className="rows">
          {users.map((user, i) => (
            <div key={i} className="user-table-row">
              {/* Name with Avatar */}
              <div className="flex align-center gap-column-16px">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={user.avatar}
                  loading="eager"
                  alt={`${user.name} avatar`}
                  className="avatar-circle _40px"
                />
                <div>
                  <div className="text-100 bold color-neutral-800">{user.name}</div>
                  <div className="text-100 medium">{user.email}</div>
                </div>
              </div>

              {/* Title */}
              <div>
                <div className="text-100 bold color-neutral-800">{user.title}</div>
                <div className="text-100 medium">{user.company}</div>
              </div>

              {/* Status */}
              <div>
                <div className={getStatusBadgeClass(user.status)}>
                  {user.status}
                </div>
              </div>

              {/* Role */}
              <div className="text-100 medium">{user.role}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * Example usage - DataTable:
 *
 * const headers = ["Name", "Email", "Phone", "Company", "Country"]
 * const rows = [
 *   {
 *     name: "John Carter",
 *     email: "john@dataplus.com",
 *     phone: "(487) 180 - 5048",
 *     company: "Dataplus X",
 *     country: "United States"
 *   },
 *   {
 *     name: "Sophie Moore",
 *     email: "sophiemoore@saasly.com",
 *     phone: "(901) 870 - 6507",
 *     company: "Saasly X",
 *     country: "Canada"
 *   }
 * ]
 *
 * <DashflowDataTable headers={headers} rows={rows} />
 *
 * Example usage - UserTable:
 *
 * const users = [
 *   {
 *     avatar: "/images/avatar-image-dashflow-webflow-template.jpg",
 *     name: "John Carter",
 *     email: "john@dashflow.com",
 *     title: "CEO & Founder",
 *     company: "BRIX Templates",
 *     status: "Active",
 *     role: "Admin"
 *   }
 * ]
 *
 * <DashflowUserTable users={users} />
 */
