'use client'

import React from 'react'
import { CheckCircle2, Circle, Clock } from 'lucide-react'

export interface TimelineEvent {
  id: string
  title: string
  description?: string | React.ReactNode
  date?: string
  status?: 'completed' | 'current' | 'upcoming'
  icon?: React.ReactNode
}

export interface TimelineProps {
  events: TimelineEvent[]
  variant?: 'default' | 'minimal' | 'card' | 'modern' | 'centered'
  className?: string
}

export function Timeline({ events, variant = 'default', className = '' }: TimelineProps) {
  const getIcon = (event: TimelineEvent, index: number) => {
    if (event.icon) return event.icon

    const status = event.status || (index === 0 ? 'current' : 'upcoming')
    const iconClass = 'w-6 h-6'

    switch (status) {
      case 'completed':
        return <CheckCircle2 className={iconClass} style={{ color: '#3898ec' }} />
      case 'current':
        return <Clock className={iconClass} style={{ color: '#3898ec' }} />
      default:
        return <Circle className={iconClass} style={{ color: '#6d6d6d' }} />
    }
  }

  const getVariantClasses = () => {
    switch (variant) {
      case 'minimal':
        return {
          container: 'space-y-6',
          item: 'relative pl-8 border-l-2 border-gray-200',
          icon: 'absolute -left-[13px] top-0 bg-white',
          content: '',
          line: '',
        }
      case 'card':
        return {
          container: 'space-y-8',
          item: 'relative pl-12',
          icon: 'absolute left-0 top-0 bg-white p-2 rounded-full border-4 border-[#3898ec]',
          content: 'bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow',
          line: 'absolute left-[19px] top-12 bottom-0 w-0.5 bg-gray-200',
        }
      case 'modern':
        return {
          container: 'space-y-10',
          item: 'relative pl-16',
          icon: 'absolute left-0 top-0 bg-gradient-to-br from-[#3898ec] to-[#2563eb] p-3 rounded-xl shadow-lg',
          content: 'bg-gradient-to-r from-white to-blue-50 p-6 rounded-lg border-l-4 border-[#3898ec]',
          line: 'absolute left-[23px] top-16 bottom-0 w-1 bg-gradient-to-b from-[#3898ec] to-gray-200',
        }
      case 'centered':
        return {
          container: 'relative space-y-12',
          item: 'relative',
          icon: 'mx-auto bg-white p-3 rounded-full border-4 border-[#3898ec] shadow-md',
          content: 'text-center max-w-2xl mx-auto',
          line: 'absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -z-10',
        }
      default:
        return {
          container: 'space-y-8',
          item: 'relative pl-10',
          icon: 'absolute left-0 top-0 bg-white',
          content: '',
          line: 'absolute left-3 top-8 bottom-0 w-0.5 bg-gray-200',
        }
    }
  }

  const variantClasses = getVariantClasses()

  return (
    <div className={`rt-timeline ${variantClasses.container} ${className}`}>
      {variant === 'centered' && <div className={variantClasses.line} />}

      {events.map((event, index) => {
        const isLast = index === events.length - 1

        return (
          <div key={event.id} className={`rt-timeline-item ${variantClasses.item}`}>
            {!isLast && variant !== 'centered' && <div className={variantClasses.line} />}

            <div className={variantClasses.icon}>{getIcon(event, index)}</div>

            <div className={variantClasses.content}>
              {event.date && (
                <div className="text-sm text-[#3898ec] font-medium mb-2">{event.date}</div>
              )}

              <h3 className="text-[#150438] font-semibold text-lg mb-2">{event.title}</h3>

              {event.description && (
                <div className="text-[#6d6d6d] leading-relaxed">{event.description}</div>
              )}
            </div>
          </div>
        )
      })}

      <style jsx>{`
        .rt-timeline-item:hover .rt-timeline-icon {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  )
}

// Process Timeline variant - shows step-by-step process
export interface ProcessStep {
  step: number
  title: string
  description: string
}

export interface ProcessTimelineProps {
  steps: ProcessStep[]
  currentStep?: number
  className?: string
}

export function ProcessTimeline({ steps, currentStep, className = '' }: ProcessTimelineProps) {
  const events: TimelineEvent[] = steps.map((step) => ({
    id: `step-${step.step}`,
    title: step.title,
    description: step.description,
    status:
      currentStep !== undefined
        ? step.step < currentStep
          ? 'completed'
          : step.step === currentStep
          ? 'current'
          : 'upcoming'
        : 'upcoming',
    icon: (
      <div
        className={`
          w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg
          ${
            currentStep && step.step <= currentStep
              ? 'bg-[#3898ec] text-white'
              : 'bg-gray-200 text-gray-600'
          }
          transition-all duration-300
        `}
      >
        {step.step}
      </div>
    ),
  }))

  return (
    <section className={`rt-component-section ${className}`}>
      <div className="w-layout-blockcontainer rt-component-container w-container">
        <div className="text-center mb-12">
          <h2 className="rt-component-heading-two text-4xl font-semibold mb-4">How It Works</h2>
          <p className="text-[#6d6d6d] text-lg">Follow these simple steps to get started</p>
        </div>
        <Timeline events={events} variant="modern" />
      </div>
    </section>
  )
}

// History Timeline variant - shows chronological history
export interface HistoryEvent {
  year: string
  title: string
  description: string
  image?: string
}

export interface HistoryTimelineProps {
  events: HistoryEvent[]
  className?: string
}

export function HistoryTimeline({ events, className = '' }: HistoryTimelineProps) {
  const timelineEvents: TimelineEvent[] = events.map((event, index) => ({
    id: `history-${index}`,
    title: event.title,
    description: (
      <div>
        {event.image && (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}
        <p>{event.description}</p>
      </div>
    ),
    date: event.year,
    status: 'completed',
  }))

  return (
    <section className={`rt-component-section ${className}`}>
      <div className="w-layout-blockcontainer rt-component-container w-container">
        <div className="text-center mb-12">
          <h2 className="rt-component-heading-two text-4xl font-semibold mb-4">Our Journey</h2>
          <p className="text-[#6d6d6d] text-lg">
            Discover the milestones that shaped our story
          </p>
        </div>
        <Timeline events={timelineEvents} variant="card" />
      </div>
    </section>
  )
}
