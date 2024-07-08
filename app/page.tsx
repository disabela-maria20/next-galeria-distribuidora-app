import dynamic from 'next/dynamic'
import { Suspense } from 'react'

import { Loading } from '@/components/atoms'
import { getBanner, getHome } from '@/utils/server/requests'

const Home = dynamic(() => import('@/components/templetes/Home'), {
  ssr: false,
  loading: () => <Loading altura={true} />
})

export default async function PageHome() {
  const listaFilmes = await getHome()
  const banner = await getBanner()

  return (
    <Suspense fallback={<Loading altura={true} />}>
      <Home banner={banner.banners} listaFilmes={listaFilmes} />
    </Suspense>
  )
}
