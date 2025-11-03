'use client'

import * as React from "react"
import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  success?: string
  label?: string
  floatingLabel?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  loading?: boolean
  characterCount?: boolean
  helperText?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    type,
    error,
    success,
    label,
    floatingLabel = false,
    leftIcon,
    rightIcon,
    loading,
    characterCount,
    helperText,
    maxLength,
    value,
    ...props
  }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [charCount, setCharCount] = React.useState(0)
    const hasValue = value !== undefined ? String(value).length > 0 : false

    React.useEffect(() => {
      if (value !== undefined) {
        setCharCount(String(value).length)
      }
    }, [value])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCharCount(e.target.value.length)
      props.onChange?.(e)
    }

    const validationIcon = error ? (
      <AlertCircle className="h-4 w-4 text-red-500" />
    ) : success ? (
      <CheckCircle2 className="h-4 w-4 text-green-500" />
    ) : null

    return (
      <div className="w-full">
        {/* Standard label (non-floating) */}
        {label && !floatingLabel && (
          <label className="block text-sm font-medium text-white/80 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Input container */}
        <div className="relative">
          {/* Left icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
              {leftIcon}
            </div>
          )}

          {/* Input field */}
          <input
            ref={ref}
            type={type}
            value={value}
            maxLength={maxLength}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              "flex h-12 w-full rounded-lg px-4 py-3 text-sm text-white transition-all duration-200",
              "bg-white/5 backdrop-blur-sm border border-white/10",
              "placeholder:text-white/40",
              "focus:outline-none focus:ring-2 focus:border-white/30",
              "hover:border-white/20",
              "disabled:cursor-not-allowed disabled:opacity-50",
              leftIcon && "pl-10",
              (rightIcon || loading || validationIcon || characterCount) && "pr-10",
              error && "border-red-500/50 focus:ring-red-500/20 focus:border-red-500/50",
              success && "border-green-500/50 focus:ring-green-500/20 focus:border-green-500/50",
              !error && !success && "focus:ring-white/20",
              className
            )}
            {...props}
          />

          {/* Floating label */}
          {label && floatingLabel && (
            <label
              className={cn(
                "absolute left-4 transition-all duration-200 pointer-events-none",
                "text-white/60",
                (isFocused || hasValue) && "top-2 text-xs text-white/80",
                !isFocused && !hasValue && "top-1/2 -translate-y-1/2 text-sm"
              )}
            >
              {label}
              {props.required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}

          {/* Right side icons */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {loading && <Loader2 className="h-4 w-4 text-white/40 animate-spin" />}
            {validationIcon}
            {rightIcon && !loading && !validationIcon && (
              <span className="text-white/40">{rightIcon}</span>
            )}
          </div>
        </div>

        {/* Helper text, error, success, and character count */}
        <div className="mt-1.5 flex items-center justify-between gap-2">
          <div className="flex-1">
            {error && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {error}
              </p>
            )}
            {success && !error && (
              <p className="text-xs text-green-500 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                {success}
              </p>
            )}
            {helperText && !error && !success && (
              <p className="text-xs text-white/40">{helperText}</p>
            )}
          </div>

          {/* Character counter */}
          {characterCount && maxLength && (
            <p
              className={cn(
                "text-xs tabular-nums transition-colors",
                charCount > maxLength * 0.9 ? "text-yellow-500" : "text-white/40",
                charCount >= maxLength && "text-red-500"
              )}
            >
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
