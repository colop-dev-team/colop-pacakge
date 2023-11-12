import React from 'react'
import { ColopMaterialProvider } from '../../components'
import { ComponentLayout } from '../../modules'

export default function DefaultComponentLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentLayout>
      <ColopMaterialProvider>{children}</ColopMaterialProvider>
    </ComponentLayout>
  )
}
