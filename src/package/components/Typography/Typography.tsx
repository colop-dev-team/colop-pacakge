import styles from './typography.module.css'
import { CSSProperties, useMemo } from 'react'
import useScreenSize from '../../hook/useScreenSize'
import { CommonColorType } from '../../common/CommonColorTypes'

export interface TypographyProps {
  colorVariant?: CommonColorType
  variant?: 'h1' | 'h2' | 'h3' | 'h4'
  customColor?: string
  text: string
}

export const Typography = ({
  colorVariant = 'primary',
  variant = 'h1',
  customColor,
  text,
}: TypographyProps) => {
  const screen = useScreenSize()

  const getStyle = useMemo(() => {
    let styleObject: CSSProperties = {}
    if (!!customColor) {
      styleObject = { ...styleObject, color: customColor }
    }
    const className = `${variant}${screen}`
    return {
      styleObject,
      className,
    }
  }, [colorVariant, variant, screen])

  return (
    <span className={styles[getStyle.className]} style={getStyle.styleObject}>
      {text}
    </span>
  )
}
