'use client'

import React from 'react'
import { ProviderContext, ProviderContextType, defaultConfig } from './Context'
import { Config } from './types'

export const ColopMaterialProvider = ({
  children,
  theme = 'auto',
  darkPalate = defaultConfig,
  lightPalate = defaultConfig,
}: {
  children: React.ReactNode
  theme?: 'light' | 'dark' | 'auto'
  darkPalate?: Config
  lightPalate?: Config
}) => {
  const [darkMode, setDarkMode] = React.useState(false)
  const windowQuery =
    typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme:dark)') : undefined

  const darkModeChange = React.useCallback((event: MediaQueryListEvent) => {
    setDarkMode(!!event.matches)
  }, [])

  React.useEffect(() => {
    if (!!windowQuery) {
      windowQuery.addEventListener('change', darkModeChange)
      return () => {
        windowQuery.removeEventListener('change', darkModeChange)
      }
    }
    return () => {}
  }, [windowQuery, darkModeChange])

  React.useEffect(() => {
    setDarkMode(!!windowQuery?.matches)
  }, [])

  const providerValue: ProviderContextType = React.useMemo(() => {
    if (theme === 'light')
      return {
        setDarkMode,
        darkMode,
        palate: lightPalate,
      }
    if (theme === 'dark')
      return {
        setDarkMode,
        darkMode,
        palate: darkPalate,
      }
    return {
      setDarkMode,
      darkMode,
      palate: darkMode ? darkPalate : lightPalate,
    }
  }, [darkMode, theme, darkPalate, lightPalate])

  return <ProviderContext.Provider value={providerValue}>{children}</ProviderContext.Provider>
}
