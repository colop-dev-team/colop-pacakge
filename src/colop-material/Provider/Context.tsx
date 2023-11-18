'use client'

import React from 'react'
import { BreakPoint, Config } from './types'

export const defaultConfig: Config = {
  primary: '#9D3FE7',
  error: '#D51A52',
  attention: '#FF9500',
  approval: '#00B998',
  link: '#0F0BAB',
  hint: '#4B3A5A',
  border: '#ABA7AF',
  disabled: '#D4D2D5',
  spacer: '#D9D1E0',
  spacerLight: '#E5E0EB',
}

export const defaultBreakPoint: BreakPoint = {
  Mobile: 375,
  Tablet: 768,
  Desktop: 1280,
}
export interface ProviderContextType {
  setDarkMode: (v: boolean) => void
  darkMode: boolean
  palate: Config
  breakPoint: BreakPoint
}

const defaultProviderValue: ProviderContextType = {
  setDarkMode: () => {},
  darkMode: false,
  palate: defaultConfig,
  breakPoint: defaultBreakPoint,
}

export const ProviderContext = React.createContext<ProviderContextType>(defaultProviderValue)
