'use client'

import * as React from "react"
import { DashflowTooltip } from "./dashflow-tooltip"
import {
  DashflowModal,
  DashflowModalHeader,
  DashflowModalBody,
  DashflowModalActions,
  DashflowModalTrigger,
  DashflowModalIcon,
  DashflowModalTitle
} from "./dashflow-modal"
import {
  DashflowTabs,
  DashflowTabsList,
  DashflowTabsTrigger,
  DashflowTabsContent,
  DashflowTabPanel
} from "./dashflow-tabs"
import { DashflowDataTable, DashflowUserTable } from "./dashflow-table"
import { DashflowBreadcrumbs } from "./dashflow-breadcrumbs"
import { DashflowEmptyState } from "./dashflow-empty-state"

/**
 * Complete examples of all Dashflow X components
 * Use this file as a reference for implementing these components in your app
 */

export function TooltipExamples() {
  return (
    <div className="card component-card">
      <h3 className="text-200 bold mg-bottom-24px">Tooltip Examples</h3>

      <div className="grid-2-columns gap-column-32px">
        {/* Right Tooltip */}
        <DashflowTooltip content="Right tooltip" position="right">
          <div className="text-100 medium color-neutral-800">Hover me (right)</div>
        </DashflowTooltip>

        {/* Left Tooltip */}
        <DashflowTooltip content="Left tooltip" position="left">
          <div className="text-100 medium color-neutral-800">Hover me (left)</div>
        </DashflowTooltip>

        {/* Top Tooltip */}
        <DashflowTooltip content="Top tooltip" position="top">
          <div className="text-100 medium color-neutral-800">Hover me (top)</div>
        </DashflowTooltip>

        {/* Bottom Tooltip */}
        <DashflowTooltip content="Bottom tooltip" position="bottom">
          <div className="text-100 medium color-neutral-800">Hover me (bottom)</div>
        </DashflowTooltip>
      </div>
    </div>
  )
}

export function ModalExamples() {
  const [standardModalOpen, setStandardModalOpen] = React.useState(false)
  const [centeredModalOpen, setCenteredModalOpen] = React.useState(false)

  return (
    <div className="card component-card">
      <h3 className="text-200 bold mg-bottom-24px">Modal Examples</h3>

      <div className="grid-2-columns gap-column-12px">
        {/* Standard Modal */}
        <DashflowModalTrigger onClick={() => setStandardModalOpen(true)}>
          Launch Standard Modal
        </DashflowModalTrigger>

        {/* Centered Modal */}
        <DashflowModalTrigger onClick={() => setCenteredModalOpen(true)}>
          Launch Centered Modal
        </DashflowModalTrigger>
      </div>

      {/* Standard Modal */}
      <DashflowModal
        isOpen={standardModalOpen}
        onClose={() => setStandardModalOpen(false)}
        variant="standard"
      >
        <DashflowModalHeader
          title="Modal title"
          onClose={() => setStandardModalOpen(false)}
        />
        <DashflowModalBody>
          Donec enim lectus elit suspendisse nisi sodales pretium sed sed etiam amet
          porttitor urna vel massa nisl mattis aliquet eu consectetur volutpat.
        </DashflowModalBody>
        <DashflowModalActions>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              setStandardModalOpen(false)
            }}
            className="btn-secondary w-inline-block"
          >
            <div className="flex-horizontal gap-column-4px">
              <div>Cancel</div>
            </div>
          </a>
          <a href="#" className="btn-primary w-inline-block">
            <div className="flex-horizontal gap-column-4px">
              <div>Accept</div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/primary-button-icon-right-dashflow-webflow-template.svg"
                alt=""
                className="link-icon arrow-right"
              />
            </div>
          </a>
        </DashflowModalActions>
      </DashflowModal>

      {/* Centered Modal */}
      <DashflowModal
        isOpen={centeredModalOpen}
        onClose={() => setCenteredModalOpen(false)}
        variant="centered"
      >
        <div
          onClick={() => setCenteredModalOpen(false)}
          className="close-icon-wrapper floating-icon-top-right"
        >
          <div className="close-icon-line first"></div>
          <div className="close-icon-line second"></div>
        </div>
        <DashflowModalIcon src="/images/card-square-icon-dashflow-webflow-ecommerce-template.png" />
        <DashflowModalTitle>Modal title</DashflowModalTitle>
        <DashflowModalBody>
          Donec enim lectus elit suspendisse nisi sodales pretium sed sed etiam amet
          porttitor urna vel massa nisl mattis aliquet eu consectet.
        </DashflowModalBody>
        <DashflowModalActions centered>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              setCenteredModalOpen(false)
            }}
            className="btn-secondary w-inline-block"
          >
            <div className="flex-horizontal gap-column-4px">
              <div>Cancel</div>
            </div>
          </a>
          <a href="#" className="btn-primary w-inline-block">
            <div className="flex-horizontal gap-column-4px">
              <div>Accept</div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/primary-button-icon-right-dashflow-webflow-template.svg"
                alt=""
                className="link-icon arrow-right"
              />
            </div>
          </a>
        </DashflowModalActions>
      </DashflowModal>
    </div>
  )
}

export function TabsExamples() {
  return (
    <div className="card component-card">
      <h3 className="text-200 bold mg-bottom-24px">Tabs Examples</h3>

      <div className="grid-2-columns gap-column-64px">
        {/* Badge Variant */}
        <div>
          <p className="text-100 medium mg-bottom-12px">Badge Style:</p>
          <DashflowTabs variant="badge" defaultTab="Tab 1">
            <DashflowTabsList>
              <DashflowTabsTrigger value="Tab 1">Overview</DashflowTabsTrigger>
              <DashflowTabsTrigger value="Tab 2">Details</DashflowTabsTrigger>
              <DashflowTabsTrigger value="Tab 3">Settings</DashflowTabsTrigger>
            </DashflowTabsList>
            <DashflowTabsContent>
              <DashflowTabPanel value="Tab 1">
                <div className="card pd-32px---24px">
                  <h3 className="text-200 bold">Overview Content</h3>
                  <p>This is the overview tab content.</p>
                </div>
              </DashflowTabPanel>
              <DashflowTabPanel value="Tab 2">
                <div className="card pd-32px---24px">
                  <h3 className="text-200 bold">Details Content</h3>
                  <p>This is the details tab content.</p>
                </div>
              </DashflowTabPanel>
              <DashflowTabPanel value="Tab 3">
                <div className="card pd-32px---24px">
                  <h3 className="text-200 bold">Settings Content</h3>
                  <p>This is the settings tab content.</p>
                </div>
              </DashflowTabPanel>
            </DashflowTabsContent>
          </DashflowTabs>
        </div>

        {/* Underline Variant */}
        <div>
          <p className="text-100 medium mg-bottom-12px">Underline Style:</p>
          <DashflowTabs variant="underline" defaultTab="Tab 1">
            <DashflowTabsList>
              <DashflowTabsTrigger value="Tab 1">Overview</DashflowTabsTrigger>
              <DashflowTabsTrigger value="Tab 2">Details</DashflowTabsTrigger>
              <DashflowTabsTrigger value="Tab 3">Settings</DashflowTabsTrigger>
            </DashflowTabsList>
            <DashflowTabsContent>
              <DashflowTabPanel value="Tab 1">
                <div className="card pd-32px---24px">
                  <h3 className="text-200 bold">Overview Content</h3>
                  <p>This is the overview tab content.</p>
                </div>
              </DashflowTabPanel>
              <DashflowTabPanel value="Tab 2">
                <div className="card pd-32px---24px">
                  <h3 className="text-200 bold">Details Content</h3>
                  <p>This is the details tab content.</p>
                </div>
              </DashflowTabPanel>
              <DashflowTabPanel value="Tab 3">
                <div className="card pd-32px---24px">
                  <h3 className="text-200 bold">Settings Content</h3>
                  <p>This is the settings tab content.</p>
                </div>
              </DashflowTabPanel>
            </DashflowTabsContent>
          </DashflowTabs>
        </div>
      </div>
    </div>
  )
}

export function TableExamples() {
  const dataTableHeaders = ["Name", "Email", "Phone", "Company", "Country"]
  const dataTableRows = [
    {
      name: "John Carter",
      email: "john@dataplus.com",
      phone: "(487) 180 - 5048",
      company: "Dataplus X",
      country: "United States"
    },
    {
      name: "Sophie Moore",
      email: "sophiemoore@saasly.com",
      phone: "(901) 870 - 6507",
      company: "Saasly X",
      country: "Canada"
    },
    {
      name: "Andy Smith",
      email: "andy@promoplus.com",
      phone: "(317) 197 - 0475",
      company: "Promoplus X",
      country: "Australia"
    }
  ]

  const users = [
    {
      avatar: "/images/avatar-image-dashflow-webflow-template.jpg",
      name: "John Carter",
      email: "john@dashflow.com",
      title: "CEO & Founder",
      company: "BRIX Templates",
      status: "Active" as const,
      role: "Admin"
    },
    {
      avatar: "/images/sophie-moore-avatar-dashflow-webflow-template.jpg",
      name: "Sophie Moore",
      email: "sophie@dashflow.com",
      title: "CTO & Co-Founder",
      company: "BRIX Templates",
      status: "Active" as const,
      role: "Member"
    }
  ]

  return (
    <div className="card component-card">
      <h3 className="text-200 bold mg-bottom-24px">Table Examples</h3>

      <div className="mg-bottom-32px">
        <p className="text-100 medium mg-bottom-12px">Data Table:</p>
        <DashflowDataTable headers={dataTableHeaders} rows={dataTableRows} />
      </div>

      <div>
        <p className="text-100 medium mg-bottom-12px">User Table:</p>
        <DashflowUserTable users={users} />
      </div>
    </div>
  )
}

export function BreadcrumbsExamples() {
  return (
    <div className="card component-card">
      <h3 className="text-200 bold mg-bottom-24px">Breadcrumbs Examples</h3>

      <div className="mg-bottom-40px">
        <p className="text-100 medium mg-bottom-12px">Simple Style:</p>
        <DashflowBreadcrumbs
          variant="simple"
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Sites", href: "/dashboard/sites" },
            { label: "Analytics" }
          ]}
        />
      </div>

      <div>
        <p className="text-100 medium mg-bottom-12px">Badge Style with Icons:</p>
        <DashflowBreadcrumbs
          variant="badge"
          items={[
            {
              label: "Home",
              href: "/",
              icon: "/images/breadcrumb-icon-1-dashflow-webflow-template.svg"
            },
            {
              label: "Dashboard",
              href: "/dashboard",
              icon: "/images/breadcrumb-icon-2-dashflow-webflow-template.svg"
            },
            {
              label: "Current Page",
              icon: "/images/breadcrumb-icon-3-dashflow-webflow-template.svg"
            }
          ]}
        />
      </div>
    </div>
  )
}

export function EmptyStateExamples() {
  return (
    <div className="card component-card">
      <h3 className="text-200 bold mg-bottom-24px">Empty State Examples</h3>

      <div className="grid-2-columns gap-column-32px">
        {/* Centered */}
        <div>
          <p className="text-100 medium mg-bottom-12px">Centered:</p>
          <DashflowEmptyState
            variant="centered"
            icon="/images/empty-state-card-icon-dashflow-webflow-template.png"
            title="No data found"
            description="Donec enim lectus elit suspendisse nisi sodales pretium sed sed etiam amet porttitor urna vel massa nisl mattis aliquet eu consectet."
            actionLabel="Create file"
            onAction={() => console.log('Create clicked')}
          />
        </div>

        {/* Left-aligned */}
        <div>
          <p className="text-100 medium mg-bottom-12px">Left-aligned:</p>
          <DashflowEmptyState
            variant="left"
            icon="/images/empty-state-card-icon-dashflow-webflow-template.png"
            title="No data found"
            description="Donec enim lectus elit suspendisse nisi sodales pretium sed sed etiam ametoler porttitor urna vel massa nisl mattis."
            actionLabel="Create file"
            onAction={() => console.log('Create clicked')}
          />
        </div>
      </div>
    </div>
  )
}

/**
 * Complete demo page with all components
 */
export function DashflowComponentsShowcase() {
  return (
    <div className="container-default w-container">
      <div className="pd-top-48px pd-bottom-48px">
        <h1 className="text-700 bold mg-bottom-48px">Dashflow X Components</h1>

        <div className="grid-1-column gap-row-48px">
          <TooltipExamples />
          <ModalExamples />
          <TabsExamples />
          <TableExamples />
          <BreadcrumbsExamples />
          <EmptyStateExamples />
        </div>
      </div>
    </div>
  )
}
