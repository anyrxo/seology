'use client'

import * as React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: React.ReactNode
  hover?: boolean
  hoverScale?: boolean
}

const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ className, children, hover = true, hoverScale = false, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn('rounded-lg border border-gray-700 bg-gray-800 text-white shadow-sm', className)}
      whileHover={
        hover
          ? hoverScale
            ? { scale: 1.02, y: -4, transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] as const } }
            : { y: -4, transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] as const } }
          : undefined
      }
      {...props}
    >
      {children}
    </motion.div>
  )
)
AnimatedCard.displayName = 'AnimatedCard'

const AnimatedCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
))
AnimatedCardHeader.displayName = 'AnimatedCardHeader'

const AnimatedCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
    {...props}
  />
))
AnimatedCardTitle.displayName = 'AnimatedCardTitle'

const AnimatedCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-gray-400', className)} {...props} />
))
AnimatedCardDescription.displayName = 'AnimatedCardDescription'

const AnimatedCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
AnimatedCardContent.displayName = 'AnimatedCardContent'

const AnimatedCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
))
AnimatedCardFooter.displayName = 'AnimatedCardFooter'

export {
  AnimatedCard,
  AnimatedCardHeader,
  AnimatedCardFooter,
  AnimatedCardTitle,
  AnimatedCardDescription,
  AnimatedCardContent,
}
