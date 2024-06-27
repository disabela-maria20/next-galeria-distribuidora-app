import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

import { Loading } from '@/components/atoms'
import { getHome } from '@/utils/server/requests'

const Catalogo = dynamic(() => import('@/components/templetes/Catalogo'), {
  ssr: false,
  loading: () => <Loading altura={true} />
})

export const metadata: Metadata = {
  title: 'Filmes | Galeria Distribuidora',
  description:
    'Explore nosso catálogo de filmes diversificado, incluindo os mais recentes lançamentos e clássicos imperdíveis. Encontre informações detalhadas sobre cada filme e descubra o que está em cartaz.'
}

const PageFilmes = async () => {
  const listaFilmes = await getHome()
  return (
    <Suspense fallback={<Loading altura={true} />}>
      <Catalogo listaFilmes={listaFilmes} />
    </Suspense>
  )
}

export default PageFilmes
