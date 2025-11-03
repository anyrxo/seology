'use client'

import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion'
import { Trash2 } from 'lucide-react'

interface SwipeableNotificationProps {
  notification: {
    id: string
    type: string
    title: string
    message: string
    read: boolean
    createdAt: string
  }
  onDismiss: (id: string) => void
  onMarkAsRead: (id: string) => void
  children: React.ReactNode
}

export function SwipeableNotification({
  notification,
  onDismiss,
  onMarkAsRead,
  children,
}: SwipeableNotificationProps) {
  const x = useMotionValue(0)
  const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0])
  const deleteOpacity = useTransform(x, [-150, -100, 0], [1, 0.5, 0])

  function handleDragEnd(_event: PointerEvent, info: PanInfo) {
    const swipeThreshold = 100

    // Swiped left to dismiss
    if (info.offset.x < -swipeThreshold) {
      onDismiss(notification.id)
    }
    // Swiped right to mark as read
    else if (info.offset.x > swipeThreshold && !notification.read) {
      onMarkAsRead(notification.id)
    }
  }

  return (
    <div className="relative overflow-hidden">
      {/* Background action indicator - Delete */}
      <motion.div
        className="absolute inset-0 bg-red-500/20 flex items-center justify-end px-6"
        style={{ opacity: deleteOpacity }}
      >
        <Trash2 className="w-5 h-5 text-red-400" />
      </motion.div>

      {/* Swipeable content */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -150, right: notification.read ? 0 : 150 }}
        dragElastic={0.2}
        style={{ x, opacity }}
        onDragEnd={handleDragEnd}
        className="cursor-grab active:cursor-grabbing touch-pan-y"
      >
        {children}
      </motion.div>
    </div>
  )
}
