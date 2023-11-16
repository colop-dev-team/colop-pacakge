'use client'

import React from 'react'
import { ProviderContext, ProviderContextType, defaultConfig, defaultBreakPoint } from './Context'
import { BreakPoint, Config } from './types'

export const ColopMaterialProvider = ({
  children,
  theme = 'auto',
  darkPalate = defaultConfig,
  lightPalate = defaultConfig,
  breakPoint = defaultBreakPoint,
}: {
  children: React.ReactNode
  theme?: 'light' | 'dark' | 'auto'
  darkPalate?: Config
  lightPalate?: Config
  breakPoint?: BreakPoint
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
        breakPoint,
      }
    if (theme === 'dark')
      return {
        setDarkMode,
        darkMode,
        palate: darkPalate,
        breakPoint,
      }
    return {
      setDarkMode,
      darkMode,
      palate: darkMode ? darkPalate : lightPalate,
      breakPoint,
    }
  }, [darkMode, theme, darkPalate, lightPalate])

  return <ProviderContext.Provider value={providerValue}>{children}</ProviderContext.Provider>
}
