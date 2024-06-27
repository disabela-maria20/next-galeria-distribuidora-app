import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

import { Loading } from '@/components/atoms'
import { getHome } from '@/utils/server/requests'

const SobreNos = dynamic(() => import('@/components/templetes/SobreNos'), {
  ssr: false
})

export const metadata: Metadata = {
  title: 'Sobre Nós | Galeria Distribuidora',
  description:
    'Saiba mais sobre a Galeria Distribuidora Brasil, uma distribuidora de filmes dedicada a trazer conteúdo de alta qualidade para o público brasileiro. Conheça nossa história, missão e valores.'
}

export default async function Page() {
  const listaFilmes = await getHome()
  return (
    <Suspense fallback={<Loading altura={true} />}>
      <SobreNos listaFilmes={listaFilmes} />
    </Suspense>
  )
}
