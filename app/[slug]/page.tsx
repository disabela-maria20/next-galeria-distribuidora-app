import { Metadata } from 'next'
import { Suspense } from 'react'

import { Loading } from '@/components/atoms'
import { Filme } from '@/components/templetes'
import { getCatalogoFilme, getHome } from '@/utils/server/requests'

type Params = {
  params: {
    slug: string
  }
}

interface ICatalogoFilmeProps {
  slug: string
}

export async function generateMetadata({
  params: { slug }
}: Params): Promise<Metadata> {
  const filme = await getCatalogoFilme(slug)
  return {
    title: `Galeria Distribuidora - ${filme?.movie.title || 'Filme'}`,
    description: filme?.movie.shortSynopsis || 'Descrição não disponível',
    openGraph: {
      title: filme?.movie.title || 'Filme',
      description: filme?.movie.shortSynopsis || 'Descrição não disponível',
      images: filme?.movie.bannerDesktop || []
    }
  }
}

export default async function PageCatalogoFilme({ params: { slug } }: Params) {
  const filme = await getCatalogoFilme(slug)

  return (
    <Suspense fallback={<Loading altura={true} />}>
      <Filme movie={filme} />
    </Suspense>
  )
}

export async function generateStaticParams() {
  const posts = await getHome()

  const concatFilmes = [
    ...posts.releases,
    ...posts.coming_soon,
    ...posts.in_production,
    ...posts.post_production,
    ...posts.streaming
  ]

  const lancamento: ICatalogoFilmeProps[] = concatFilmes.map((post) => ({
    slug: post.slug
  }))

  return lancamento
}
