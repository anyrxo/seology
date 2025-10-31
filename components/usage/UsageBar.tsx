'use client'

interface UsageBarProps {
  label: string
  current: number
  limit: number
  unit: string
  showWarning?: boolean
}

export function UsageBar({
  label,
  current,
  limit,
  unit,
  showWarning = true,
}: UsageBarProps) {
  const percentage = Math.min((current / limit) * 100, 100)
  const isNearLimit = percentage >= 90
  const isAtLimit = percentage >= 100

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {current.toLocaleString()} / {limit.toLocaleString()} {unit}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
        <div
          className={`h-full transition-all ${
            isAtLimit
              ? 'bg-red-600'
              : isNearLimit
              ? 'bg-yellow-500'
              : 'bg-green-600'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showWarning && isAtLimit && (
        <p className="mt-1 text-xs text-red-600">
          You've reached your limit. Upgrade to continue.
        </p>
      )}
      {showWarning && isNearLimit && !isAtLimit && (
        <p className="mt-1 text-xs text-yellow-600">
          You're approaching your limit ({Math.round(percentage)}% used). Consider upgrading.
        </p>
      )}
    </div>
  )
}
