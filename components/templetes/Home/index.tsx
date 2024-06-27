/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaYoutube } from 'react-icons/fa'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import Style from './Home.module.scss'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'

import 'swiper/css/navigation'
import 'react-lazy-load-image-component/src/effects/blur.css'

import { Loading } from '@/components/atoms'
import { Model, Newsletter, Slide } from '@/components/molecules'
import useFilmeTextStatus from '@/utils/hooks/useFilmeTextStatus'
import { useFormatarData } from '@/utils/hooks/useFormatarData/formatarData'
import useIsMobile from '@/utils/hooks/useIsMobile/isMobile'
import { useGtag } from '@/utils/lib/gtag'
import { IFilmeResponse } from '@/utils/server/types'
import { SwiperOptions } from 'swiper/types'

interface IHomeProps {
  banner: Array<any>
  listaFilmes: {
    releases: Array<IFilmeResponse>
    streaming: Array<IFilmeResponse>
  }
}

const Home = ({ banner, listaFilmes }: IHomeProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const [iframe, setIframe] = useState<IFilmeResponse>()

  const { formatarData } = useFormatarData()
  const statusTextData = useFilmeTextStatus()
  const { dataLayerHome, dataLayerBannerClick } = useGtag()
  const { isMobile, isLoading } = useIsMobile()

  const bannerSwiperOptions: SwiperOptions = {
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    },
    // pagination: isMobile ? false : true,
    navigation: isMobile ? false : true,
    modules: [Navigation, Pagination, Autoplay]
  }
  const filmesSwiperOptions: SwiperOptions = {
    slidesPerView: 2,
    pagination: false,
    navigation: isMobile ? false : true,
    modules: [Navigation, Pagination],
    spaceBetween: 20,
    breakpoints: {
      640: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      990: {
        slidesPerView: 5,
        spaceBetween: 10
      }
    }
  }

  const filmesStreaming: SwiperOptions = {
    slidesPerView: 2,
    pagination: false,
    spaceBetween: 20,
    //navigation: isMobile ? false : true,
    navigation: false,
    modules: [Navigation, Pagination],
    breakpoints: {
      640: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 10
      },
      990: {
        slidesPerView: 5,
        spaceBetween: 10
      },
      1100: {
        slidesPerView: 6,
        spaceBetween: 10
      }
    }
  }

  function handleVerImagem(data: IFilmeResponse) {
    setOpen(true)
    setIframe(data)
  }

  const routerPush = useRouter()

  useEffect(() => {
    const pageView = () => {
      dataLayerHome('Galeria Distribuidora', '')
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
          // <Link href={data.slug} key={data.id}>
          //   <img src={isMobile ? data.bannerMobile : data?.bannerDesktop} onClick={} />
          // </Link>
          <span key={data.id} aria-label="banner">
            <LazyLoadImage
              effect="blur"
              alt="banner"
              sizes="(min-width: 480px) 90vw, (max-width: 1024px) 5vw"
              src={isMobile ? data.bannerMobile : data?.bannerDesktop}
              onClick={() => handleClickBanner(data)}
            />
          </span>
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
          <Slide.Content
            swiperOptions={filmesSwiperOptions}
            className={Style.slideFilmehomePromo}
          >
            {listaFilmes?.releases
              .reverse()
              .sort(
                (a, b) =>
                  new Date(b.releasedate).getTime() -
                  new Date(a.releasedate).getTime()
              )
              .map((data) => (
                <div key={data.id} className={Style.filme}>
                  <Link href={`/${data.slug}`} aria-label={data.title}>
                    <LazyLoadImage
                      src={data.cover}
                      alt={data.title}
                      width={270}
                      height={200}
                      effect="blur"
                    />
                  </Link>
                  <h2>{data.title}</h2>
                  {!data.hasSession ? (
                    <span className={Style.data}>
                      Estreia: {formatarData(data?.releasedate)}
                    </span>
                  ) : (
                    <span className={Style.data}>{statusTextData(data)}</span>
                  )}

                  <span
                    onClick={() => handleVerImagem(data)}
                    className={Style.tralher}
                  >
                    <FaYoutube />
                    <span>Assista ao Trailer</span>
                  </span>
                </div>
              ))}
          </Slide.Content>
          {open && (
            <Model.Root>
              <Model.Body
                setOpen={() => setOpen(!open)}
                className={Style.ModaliframeVideoYoutube}
              >
                <div className={Style.iframeVideoYoutube} key={iframe?.trailer}>
                  <iframe
                    className={Style.embedResponsiveItem}
                    src={iframe?.trailer}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </Model.Body>
            </Model.Root>
          )}
          {open && (
            <Model.Root>
              <Model.Body
                setOpen={() => setOpen(!open)}
                className={Style.ModaliframeVideoYoutube}
              >
                <div className={Style.iframeVideoYoutube} key={iframe?.trailer}>
                  <iframe
                    className={Style.embedResponsiveItem}
                    src={iframe?.trailer}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </Model.Body>
            </Model.Root>
          )}
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
              <Slide.Content
                swiperOptions={filmesStreaming}
                className={Style.slideFilmehomePromo}
              >
                {listaFilmes?.streaming?.reverse().map((data) => (
                  <div key={data.id} className={Style.filme}>
                    <Link href={`/${data.slug}`}>
                      <img src={data.cover} />
                      <h2>{data.title}</h2>
                    </Link>
                  </div>
                ))}
              </Slide.Content>
            </>
          )}
        </div>
      </section>
    </>
  )
}

export default Home
