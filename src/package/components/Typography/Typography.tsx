import styles from './Typography.module.css'
import React, { CSSProperties, useMemo } from 'react'
import useScreenSize from '../hook/useScreenSize'
import { CommonColorType } from '../common'

export type SizeTextTypography =
  | 'big'
  | 'middle'
  | 'small'
  | 'additional'
  | 'middleRegular'
  | 'smallRegular'
export interface TypographyProps {
  colorVariant?: CommonColorType
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'Text'
  size?: SizeTextTypography
  customColor?: string
  text: string
}

export const Typography = ({
  colorVariant = 'primary',
  variant = 'h1',
  customColor,
  size = 'big',
  text,
}: TypographyProps) => {
  const screen = useScreenSize()

  const getStyle = useMemo(() => {
    let styleObject: CSSProperties = {}
    if (!!customColor) {
      styleObject = { ...styleObject, color: customColor }
    }
    const className = variant === 'Text' ? `${size}${variant}` : `${variant}${screen}`
    return {
      styleObject,
      className,
    }
  }, [colorVariant, variant, screen, colorVariant, size])

  return (
    <span className={styles[getStyle.className]} style={getStyle.styleObject}>
      {text}
    </span>
  )
}
