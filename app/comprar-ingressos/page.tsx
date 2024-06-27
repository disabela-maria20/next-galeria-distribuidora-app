import { Metadata } from 'next'
import { Suspense, lazy } from 'react'

import { Loading } from '@/components/atoms'
import banner from '@/utils/server/json/Banner.json'
import { getHome } from '@/utils/server/requests'

const ComprarIngresso = lazy(
  () => import('@/components/templetes/ComprarIngresso')
)

export const metadata: Metadata = {
  title: 'Galeria Distribuidora - Comprar Ingresso'
}

const pageComprarIngresso = async () => {
  const listaFilmes = await getHome()
  return (
    <Suspense fallback={<Loading altura={true} />}>
      <ComprarIngresso banner={banner} listaFilmes={listaFilmes} />
    </Suspense>
  )
}

export default pageComprarIngresso
