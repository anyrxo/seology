'use client'

import * as React from "react"
import { cn } from "@/lib/utils"

interface DashflowModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  variant?: "standard" | "centered"
  className?: string
}

interface DashflowModalTriggerProps {
  onClick: () => void
  children: React.ReactNode
  className?: string
}

/**
 * DashflowModal - Exact implementation from Dashflow X Webflow template
 *
 * Two variants:
 * 1. Standard (left-aligned content, close icon top-right)
 * 2. Centered (centered text, icon, close icon top-right)
 *
 * Features:
 * - Overlay backdrop
 * - Close on overlay click
 * - Close icon with X animation
 * - Card-based modal content
 * - Button groups for actions
 */
export function DashflowModal({
  isOpen,
  onClose,
  children,
  variant = "standard",
  className
}: DashflowModalProps) {
  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Close on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="modal-wrapper" style={{ display: 'flex' }}>
      <div className="modal-content-wrapper">
        <div className={cn("inner-container _370px", className)}>
          {variant === "standard" ? (
            <div className="card pd-24px---18px position-relative---z-index-1">
              {children}
            </div>
          ) : (
            <div className="position-relative---z-index-1">
              <div className="card pd-24px---18px text-center">
                {children}
              </div>
            </div>
          )}
        </div>
      </div>
      <div onClick={onClose} className="modal-close-overlay"></div>
    </div>
  )
}

/**
 * DashflowModalHeader - Modal header with title and close button
 */
export function DashflowModalHeader({
  title,
  onClose,
  className
}: {
  title: string
  onClose: () => void
  className?: string
}) {
  return (
    <div className={cn("_2-items-wrap-container gap-column-8px mg-bottom-4px", className)}>
      <h3 className="text-200 bold mg-bottom-0">{title}</h3>
      <div onClick={onClose} className="close-icon-wrapper floating-icon-top-right">
        <div className="close-icon-line first"></div>
        <div className="close-icon-line second"></div>
      </div>
    </div>
  )
}

/**
 * DashflowModalIcon - Centered icon for modal (centered variant)
 */
export function DashflowModalIcon({
  src,
  alt = "",
  className
}: {
  src: string
  alt?: string
  className?: string
}) {
  return (
    <div className={cn("mg-bottom-24px", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        loading="eager"
        alt={alt}
        sizes="(max-width: 767px) 40px, (max-width: 1439px) 48px, (max-width: 1919px) 3vw, 48px"
        srcSet={`${src.replace('.png', '-p-500.png')} 500w, ${src} 800w`}
        className="card-icon-square"
      />
    </div>
  )
}

/**
 * DashflowModalTitle - Title for centered modal variant
 */
export function DashflowModalTitle({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return <h3 className={cn("text-200 bold", className)}>{children}</h3>
}

/**
 * DashflowModalBody - Body text content
 */
export function DashflowModalBody({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return <p className={className}>{children}</p>
}

/**
 * DashflowModalActions - Button group for modal actions
 */
export function DashflowModalActions({
  children,
  centered = false,
  className
}: {
  children: React.ReactNode
  centered?: boolean
  className?: string
}) {
  return (
    <div className={cn("buttons-row gap-column-12px", centered && "center", className)}>
      {children}
    </div>
  )
}

/**
 * DashflowModalTrigger - Button to open modal
 */
export function DashflowModalTrigger({
  onClick,
  children,
  className
}: DashflowModalTriggerProps) {
  return (
    <div onClick={onClick}>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault()
          onClick()
        }}
        className={cn("btn-secondary w-inline-block", className)}
      >
        <div className="flex-horizontal gap-column-4px">
          <div>{children}</div>
        </div>
      </a>
    </div>
  )
}

/**
 * Example usage - Standard Modal:
 *
 * const [isOpen, setIsOpen] = useState(false)
 *
 * <DashflowModalTrigger onClick={() => setIsOpen(true)}>
 *   Launch modal v1
 * </DashflowModalTrigger>
 *
 * <DashflowModal isOpen={isOpen} onClose={() => setIsOpen(false)} variant="standard">
 *   <DashflowModalHeader title="Modal title" onClose={() => setIsOpen(false)} />
 *   <DashflowModalBody>
 *     Donec enim lectus elit suspendisse nisi sodales pretium sed sed etiam amet
 *     porttitor urna vel massa nisl mattis aliquet eu consectetur volutpat.
 *   </DashflowModalBody>
 *   <DashflowModalActions>
 *     <a href="#" className="btn-secondary w-inline-block">
 *       <div className="flex-horizontal gap-column-4px"><div>Cancel</div></div>
 *     </a>
 *     <a href="#" className="btn-primary w-inline-block">
 *       <div className="flex-horizontal gap-column-4px">
 *         <div>Accept</div>
 *         <img src="/images/primary-button-icon-right-dashflow-webflow-template.svg" className="link-icon arrow-right" />
 *       </div>
 *     </a>
 *   </DashflowModalActions>
 * </DashflowModal>
 *
 * Example usage - Centered Modal:
 *
 * <DashflowModal isOpen={isOpen} onClose={() => setIsOpen(false)} variant="centered">
 *   <div onClick={() => setIsOpen(false)} className="close-icon-wrapper floating-icon-top-right">
 *     <div className="close-icon-line first"></div>
 *     <div className="close-icon-line second"></div>
 *   </div>
 *   <DashflowModalIcon src="/images/card-square-icon-dashflow-webflow-ecommerce-template.png" />
 *   <DashflowModalTitle>Modal title</DashflowModalTitle>
 *   <DashflowModalBody>
 *     Donec enim lectus elit suspendisse nisi sodales pretium sed sed etiam amet
 *     porttitor urna vel massa nisl mattis aliquet eu consectet.
 *   </DashflowModalBody>
 *   <DashflowModalActions centered>
 *     ...buttons...
 *   </DashflowModalActions>
 * </DashflowModal>
 */
