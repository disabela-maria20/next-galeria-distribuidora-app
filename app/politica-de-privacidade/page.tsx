import { Metadata } from 'next'
import { Suspense } from 'react'

import { Loading } from '@/components/atoms'
import PoliticaDePrivacidade from '@/components/templetes/PoliticaDePrivacidade'

export const metadata: Metadata = {
  title: 'Galeria Distribuidora - Politica De Privacidade'
}

const pagePoliticaDePrivacidade = () => {
  return (
    <Suspense fallback={<Loading altura={true} />}>
      <PoliticaDePrivacidade />
    </Suspense>
  )
}

export default pagePoliticaDePrivacidade
