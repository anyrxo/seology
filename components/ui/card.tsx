'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'glass' | 'elevated' | 'outlined' | 'gradient'
  hover?: boolean
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', children, variant = 'glass', hover = true, ...props }, ref) => {
    const variants = {
      default: 'bg-black/40 border-white/10',
      glass: 'bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/10',
      elevated: 'bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/10 shadow-2xl shadow-black/50',
      outlined: 'bg-transparent border-white/20',
      gradient: 'bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-xl border-white/20',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl border text-white transition-all duration-300 overflow-hidden relative group',
          variants[variant],
          hover && 'hover:border-white/20 hover:shadow-2xl hover:shadow-black/60 hover:-translate-y-1',
          className
        )}
        {...props}
      >
        {/* Inner glow on hover */}
        {hover && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    )
  }
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className = '', children, ...props }, ref) => (
    <div ref={ref} className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
      {children}
    </div>
  )
)
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(
  ({ className = '', children, ...props }, ref) => (
    <h3
      ref={ref}
      className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
      {...props}
    >
      {children}
    </h3>
  )
)
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className = '', children, ...props }, ref) => (
    <p ref={ref} className={`text-sm text-gray-400 ${className}`} {...props}>
      {children}
    </p>
  )
)
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className = '', children, ...props }, ref) => (
    <div ref={ref} className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  )
)
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className = '', children, ...props }, ref) => (
    <div ref={ref} className={`flex items-center p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  )
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
