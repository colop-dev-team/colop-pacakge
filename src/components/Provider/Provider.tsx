import React from 'react'
import { ProviderContext, ProviderContextType } from './Context'

export const ColopMaterialProvider = ({
  children,
  theme = 'auto',
}: {
  children: React.ReactNode
  theme?: 'light' | 'dark' | 'auto'
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
    // const configValue = deepClone(defaultConfig, config)
    if (theme === 'light' || theme === 'dark')
      return {
        setDarkMode,
        darkMode,
      }
    return {
      setDarkMode,
      darkMode,
    }
  }, [darkMode, theme])

  return <ProviderContext.Provider value={providerValue}>{children}</ProviderContext.Provider>
}
