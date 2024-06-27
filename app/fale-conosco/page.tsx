import { Metadata } from 'next'
import { Suspense, lazy } from 'react'

import { Loading } from '@/components/atoms'

const Contato = lazy(() => import('@/components/templetes/Contato'))

export const metadata: Metadata = {
  title: 'Galeria Distribuidora - Fale Conosco',
  description:
    'Tem alguma dúvida sobre nossos filmes ou está interessado em parcerias? Entre em contato com a Galeria Distribuidora Brasil para obter mais informações. Estamos aqui para ajudar!'
}
export default function Page() {
  return (
    <Suspense fallback={<Loading altura={true} />}>
      <Contato />
    </Suspense>
  )
}
