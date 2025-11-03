'use client'

import * as React from 'react'

interface AnnouncementContextType {
  isVisible: boolean
  setIsVisible: (visible: boolean) => void
  height: number
}

const AnnouncementContext = React.createContext<AnnouncementContextType>({
  isVisible: true,
  setIsVisible: () => {},
  height: 48, // 12 * 4 = 48px
})

export function useAnnouncement() {
  return React.useContext(AnnouncementContext)
}

export function AnnouncementProvider({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = React.useState(true)
  const height = isVisible ? 48 : 0 // h-12 = 48px

  return (
    <AnnouncementContext.Provider value={{ isVisible, setIsVisible, height }}>
      {children}
    </AnnouncementContext.Provider>
  )
}
