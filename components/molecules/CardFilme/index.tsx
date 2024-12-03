/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FaYoutube } from 'react-icons/fa'

import Style from './CardFilme.module.scss'
import { Navigation, Pagination } from 'swiper/modules'

import { Model } from '../Model'
import { Slide } from '../Slide'

import { useFilmeStatus } from '@/utils/hooks/useFilmeStatus'
import useFilmeTextStatus from '@/utils/hooks/useFilmeTextStatus'
import useIsMobile from '@/utils/hooks/useIsMobile/isMobile'
import { IFilmeResponse } from '@/utils/server/types'
import { SwiperOptions } from 'swiper/types'
interface ICardFilmeProps {
  listaFilmes?: {
    releases: Array<IFilmeResponse>
    streaming: Array<IFilmeResponse>
    coming_soon: Array<IFilmeResponse>
    in_production: Array<IFilmeResponse>
    post_production: Array<IFilmeResponse>
    streaming_coming_soon: Array<IFilmeResponse>

  }
  slide?: TSlide
  data?: IFilmeResponse
}
type TSlide = 'streaming' | 'lancamento' | 'catalogo'

import 'swiper/css/navigation'
import 'react-lazy-load-image-component/src/effects/blur.css'

const CardFilme = ({
  data,
  listaFilmes,
  slide = 'lancamento'
}: ICardFilmeProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const [iframe, setIframe] = useState<IFilmeResponse>()

  // const { formatarData } = useFormatarData()
  const statusTextData = useFilmeTextStatus()
  const { isMobile } = useIsMobile()

  const filmes = listaFilmes?.releases.concat(
    ...listaFilmes.coming_soon,
    ...listaFilmes.in_production,
    ...listaFilmes.post_production,
    ...listaFilmes.streaming_coming_soon
  )

  function handleVerImagem(data: IFilmeResponse) {
    setOpen(true)
    setIframe(data)
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
    navigation: isMobile ? false : true,
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

  if (slide == 'lancamento') {
    return (
      <>
        <Slide.Content
          className={Style.slideFilmehomePromo}
          swiperOptions={filmesSwiperOptions}
        >
          {filmes &&
            filmes
              .sort(
                (a, b) =>
                  new Date(a.releasedate).getTime() -
                  new Date(b.releasedate).getTime()
              )
              .map((data) => (
                <div key={data.id} className={Style.CardFilme}>
                  <Link href={`/${data.slug}`}>
                    <img
                      src={data.cover}
                      alt={data.title}
                      width={300}
                      height={200}
                    />
                    <span
                      className={Style.status}
                      style={{ background: `${data.color_status != '' ? data.color_status : '#000'}` }}
                    >
                      {useFilmeStatus(data.status, data)}
                    </span>
                  </Link>
                  <h3>{data.title}</h3>
                  {!data.hasSession ? (
                    <span className={Style.data}>
                      {useFilmeStatus(data.status, data)}
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
                  src={iframe?.trailer ?? ''}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </Model.Body>
          </Model.Root>
        )}
      </>
    )
  }
  if (slide == 'streaming') {
    return (
      <Slide.Content
        className={Style.slideFilmehomePromo}
        swiperOptions={filmesStreaming}
      >
        {listaFilmes?.streaming
          ?.sort((a: any, b: any) => {
            const dataA: any = new Date(a.releasedate)
            const dataB: any = new Date(b.releasedate)
            return dataB - dataA
          })
          .map((data) => (
            <div key={data.id} className={Style.CardFilme}>
              <Link href={`/${data.slug}`}>
                <img
                  src={data.cover}
                  alt={data.title}
                  width={300}
                  height={200}
                />
                <span
                  className={Style.status}
                  style={{ background: `${data.color_status}` }}
                >
                  {useFilmeStatus(data.status, data)}
                </span>
              </Link>
              <h3>{data.title}</h3>
            </div>
          ))}
      </Slide.Content>
    )
  }
  if (slide == 'catalogo' && data) {
    return (
      <div key={data?.id} className={Style.CardFilme}>
        <Link href={`/${data?.slug}`}>
          <img src={data?.cover} alt={data?.title} width={300} height={200} />
          <span
            className={Style.status}
            style={{ background: `${data?.color_status}` }}
          >
            {useFilmeStatus(data?.status, data)}
          </span>
        </Link>
        <h3>{data?.title}</h3>
      </div>
    )
  }
}

export default CardFilme
