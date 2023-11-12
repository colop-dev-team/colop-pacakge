'use client'

import { useContext } from 'react'
import { ProviderContext } from '../../components/Provider/Context'
import styles from './color.module.css'

export const ColorModule = () => {
  const config = useContext(ProviderContext)

  return (
    <div className={styles.wrapper}>
      {Object.keys(config.palate).map((item) => (
        <div key={item} className={styles.itemColor}>
          <div>{item.toUpperCase()}</div>
          <div
            className={styles.colorSample}
            style={{ background: config.palate[item as keyof typeof config.palate] }}
          />
        </div>
      ))}
    </div>
  )
}
