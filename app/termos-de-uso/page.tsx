import { Metadata } from 'next'
import { Suspense } from 'react'

import { Loading } from '@/components/atoms'
import TermosCondicoes from '@/components/templetes/TermosCondicoes'

export const metadata: Metadata = {
  title: 'Termos Condicoes | Galeria Distribuidora'
}

const pageTermosCondicoes = () => {
  return (
    <Suspense fallback={<Loading altura={true} />}>
      <TermosCondicoes />
    </Suspense>
  )
}

export default pageTermosCondicoes
