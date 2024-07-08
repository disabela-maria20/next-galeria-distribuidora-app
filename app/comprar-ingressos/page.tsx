import { Metadata } from 'next'
import { Suspense, lazy } from 'react'

import { Loading } from '@/components/atoms'
import { getBanner, getHome } from '@/utils/server/requests'

const ComprarIngresso = lazy(
  () => import('@/components/templetes/ComprarIngresso')
)

export const metadata: Metadata = {
  title: 'Galeria Distribuidora - Comprar Ingresso'
}

const pageComprarIngresso = async () => {
  const listaFilmes = await getHome()
  const banner = await getBanner()
  return (
    <Suspense fallback={<Loading altura={true} />}>
      <ComprarIngresso banner={banner.banners} listaFilmes={listaFilmes} />
    </Suspense>
  )
}

export default pageComprarIngresso
