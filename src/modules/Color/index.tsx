'use client'

import { useContext } from 'react'
import { ProviderContext } from '../../colop-material/Provider/Context'
import styles from './color.module.css'
import { Typography, List } from '../../colop-material/index'

export const ColorModule = () => {
  const config = useContext(ProviderContext)

  return (
    <>
      <Typography text="Color guidance" />
      <div style={{ maxWidth: '90px' }}>
        <List
          styled="number"
          contents={['ok', `Listing goals, conclusions, and other important points in the text;`]}
        />
      </div>
      <div className={styles.wrapper}>
        {Object.keys(config.palate).map((item) => (
          <div key={item} className={styles.itemColor}>
            <div>{item.toUpperCase()}</div>
            <div
              className={styles.colorSample}
              style={{ background: config.palate[item as keyof typeof config.palate] as string }}
            />
          </div>
        ))}
      </div>
    </>
  )
}
