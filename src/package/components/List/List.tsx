import React, { useContext } from 'react'
import styles from './List.module.css'
import { ProviderContext } from '../Provider/Context'
import { CommonColorType } from '../common'

export interface ListProps {
  contents: string[]
  styled?: 'marked' | 'number'
  customColor?: string
  colorVariant?: CommonColorType
}
export const List = ({
  colorVariant = 'primary',
  customColor,
  styled = 'marked',
  contents,
}: ListProps) => {
  const { palate } = useContext(ProviderContext)
  const getMark = (content: string) => {
    if (styled === 'marked') {
      return (
        <div
          style={{ background: customColor || palate[colorVariant] }}
          className={styles.marked}
        />
      )
    }

    return (
      <div style={{ color: customColor || palate[colorVariant] }} className={styles.number}>
        {content}.
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      {contents.map((item, index) => (
        <div className={styles.row} key={index}>
          {getMark(String(index))}
          <div className={styles.content}>{item}</div>
        </div>
      ))}
    </div>
  )
}
