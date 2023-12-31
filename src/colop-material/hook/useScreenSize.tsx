'use client'

import { useContext, useEffect, useMemo, useState } from 'react'
import { ProviderContext } from '../Provider/Context'

const useScreenSize = (): 'Mobile' | 'Tablet' | 'Desktop' => {
  const [screenSize, setScreenSize] = useState<{ width?: number; height?: number }>({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
  }, [])

  const { breakPoint } = useContext(ProviderContext)

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return useMemo(() => {
    const { Mobile, Tablet } = breakPoint
    const { width } = screenSize
    if (!width) return 'Mobile'
    if (width <= Mobile) return 'Mobile'
    if (width > Mobile && width <= Tablet) return 'Tablet'
    if (width > Tablet) return 'Desktop'
    return 'Desktop'
  }, [screenSize, breakPoint])
}

export default useScreenSize
