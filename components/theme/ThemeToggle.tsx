'use client'

import { useTheme } from './ThemeProvider'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="toggle-button-wrapper"
      aria-label="Toggle theme"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className={`toggle-button-bg ${theme === 'dark' ? 'active' : ''}`}></div>
      <div className={`toggle-button-circle-inside ${theme === 'dark' ? 'active' : ''}`}>
        {theme === 'light' ? (
          <Sun className="w-3 h-3 text-white" />
        ) : (
          <Moon className="w-3 h-3 text-white" />
        )}
      </div>
    </button>
  )
}
