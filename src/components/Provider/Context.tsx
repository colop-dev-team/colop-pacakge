import React from 'react'

export interface ProviderContextType {
  setDarkMode: (v: boolean) => void
  darkMode: boolean
}

const defaultProviderValue: ProviderContextType = {
  setDarkMode: () => {},
  darkMode: false,
}

export const ProviderContext = React.createContext<ProviderContextType>(defaultProviderValue)
