/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import Style from './Home.module.scss'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'

import 'swiper/css/navigation'
import 'react-lazy-load-image-component/src/effects/blur.css'

import { Loading } from '@/components/atoms'
import { Newsletter, Slide } from '@/components/molecules'
import { CardFilme } from '@/components/molecules/'
import useIsMobile from '@/utils/hooks/useIsMobile/isMobile'
import { useGtag } from '@/utils/lib/gtag'
import { IFilmeResponse } from '@/utils/server/types'
import { SwiperOptions } from 'swiper/types'

interface IHomeProps {
  banner: Array<any>
  listaFilmes?: {
    releases: Array<IFilmeResponse>
    streaming: Array<IFilmeResponse>
    coming_soon: Array<IFilmeResponse>
    in_production: Array<IFilmeResponse>
    post_production: Array<IFilmeResponse>
    streaming_coming_soon: Array<IFilmeResponse>
  }
}

const Home = ({ banner, listaFilmes }: IHomeProps) => {
  const { dataLayerHome, dataLayerBannerClick } = useGtag()
  const { isMobile, isLoading } = useIsMobile()

  console.log(listaFilmes)

  const bannerSwiperOptions: SwiperOptions = {
    slidesPerView: 1,
    loop: false,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    },
    // pagination: isMobile ? false : true,
    navigation: isMobile ? false : true,
    modules: [Navigation, Pagination, Autoplay]
  }

  const routerPush = useRouter()

  useEffect(() => {
    const pageView = () => {
      dataLayerHome('Galeria Filmess', '')
    }
    pageView()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleClickBanner(data: any) {
    dataLayerBannerClick(data.title, data.slug, data.id)
    routerPush.push(`${data.slug}`)
  }

  if (isLoading) return <Loading altura={true} />

  return (
    <>
      <Slide.Content
        swiperOptions={bannerSwiperOptions}
        className={Style.slideBanner}
      >
        {banner?.map((data) => (
          <div className={Style.areaBanner} key={data.id} aria-label="banner">
            <LazyLoadImage
              effect="blur"
              alt="banner"
              src={isMobile ? data.bannerMobile : data?.bannerDesktop}
              onClick={() => handleClickBanner(data)}
            />
            <div className="container">
              <span className={Style.title} style={{ color: data.color }}>
                {data.title}
              </span>
            </div>
          </div>
        ))}
      </Slide.Content>
      <div className="container">
        <Newsletter isBg={true} isHorrizontal={!isMobile && true} />
      </div>

      <section className={Style.areaSlideFilmes}>
        <div className="container" style={{ overflow: 'hidden' }}>
          <Slide.Title className={Style.slideTitle}>
            LANÇAMENTOS
            <span>
              Confira os filmes em exibição e os que serão lançados em breve
              somente nos cinemas.
            </span>
          </Slide.Title>
          <CardFilme listaFilmes={listaFilmes} />
          {/* <Slide.Title className={Style.slideTitle}>
              ASSISTA ONDE E QUANDO QUISER
              <span>Nossos filmes disponíveis nos streamings.</span>
            </Slide.Title>
            <Slide.Content
              swiperOptions={filmesStreaming}
              className={Style.slideFilmehomePromo}
            >
              {listaFilmes?.streaming?.map((data) => (
                <div key={data.id} className={Style.filme}>
                  <Link href={`/catalogo/${data.slug}`}>
                    <img src={data.cover} />
                  </Link>
                  <h2>{data.title}</h2>
                  <a href={data.trailer} className={Style.streaming}>
                    <span>Assista Agora</span>
                  </a>
                </div>
              ))}
            </Slide.Content> */}
          {true && (
            <>
              <Slide.Title className={Style.slideTitle}>CATÁLOGO</Slide.Title>
              <CardFilme slide="streaming" listaFilmes={listaFilmes} />
            </>
          )}
        </div>
      </section>
    </>
  )
}

export default Home
