'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FaYoutube } from 'react-icons/fa'

import Style from './CardFilme.module.scss'
import { Navigation, Pagination } from 'swiper/modules'

import { Model } from '../Model'
import { Slide } from '../Slide'

import useFilmeTextStatus from '@/utils/hooks/useFilmeTextStatus'
import { useFormatarData } from '@/utils/hooks/useFormatarData/formatarData'
import useIsMobile from '@/utils/hooks/useIsMobile/isMobile'
import { IFilmeResponse } from '@/utils/server/types'
import { SwiperOptions } from 'swiper/types'

interface ICardFilmeProps {
  listaFilmes?: {
    releases: Array<IFilmeResponse>
    streaming: Array<IFilmeResponse>
  }
  slide?: TSlide
  data?: IFilmeResponse
}
type TSlide = 'streaming' | 'lancamento' | 'catalogo'

enum Status {
  LANCAMENTO = 'lancamento',
  STREAMING = 'streaming',
  INATIVO = 'inativo',
  PRODUCAO = 'producao',
  POSPRODUCAO = 'pos-producao',
  EMBREVE = 'embreve'
}

const statusCorrecoes: Record<Status, string> = {
  [Status.LANCAMENTO]: 'Lançamento',
  [Status.STREAMING]: 'Streaming',
  [Status.INATIVO]: 'Inativo',
  [Status.PRODUCAO]: 'Produção',
  [Status.POSPRODUCAO]: 'Pós-Produção',
  [Status.EMBREVE]: 'Em Breve'
}

import 'swiper/css/navigation'
import 'react-lazy-load-image-component/src/effects/blur.css'

const CardFilme = ({
  data,
  listaFilmes,
  slide = 'lancamento'
}: ICardFilmeProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const [iframe, setIframe] = useState<IFilmeResponse>()

  const { formatarData } = useFormatarData()
  const statusTextData = useFilmeTextStatus()
  const { isMobile } = useIsMobile()

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

  const checkStatus = (status: string | undefined) => {
    if (!status) return
    const statusKey = status as Status
    const statusCorrigido = statusCorrecoes[statusKey]
    return statusCorrigido
  }

  if (slide == 'lancamento') {
    return (
      <>
        <Slide.Content
          className={Style.slideFilmehomePromo}
          swiperOptions={filmesSwiperOptions}
        >
          {listaFilmes?.releases
            .reverse()
            .sort(
              (a, b) =>
                new Date(b.releasedate).getTime() -
                new Date(a.releasedate).getTime()
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
                    style={{ background: `${data.color_status}` }}
                  >
                    {checkStatus(data.status)}
                  </span>
                </Link>
                <h3>{data.title}</h3>
                {!data.hasSession ? (
                  <span className={Style.data}>
                    Estreia: {formatarData(data?.releasedate ?? '')}
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
        {listaFilmes?.streaming.reverse().map((data) => (
          <div key={data.id} className={Style.CardFilme}>
            <Link href={`/${data.slug}`}>
              <img src={data.cover} alt={data.title} width={300} height={200} />
              <span
                className={Style.status}
                style={{ background: `${data.color_status}` }}
              >
                {checkStatus(data.status)}
              </span>
            </Link>
            <h3>{data.title}</h3>
          </div>
        ))}
      </Slide.Content>
    )
  }
  if (slide == 'catalogo') {
    return (
      <div key={data?.id} className={Style.CardFilme}>
        <Link href={`/${data?.slug}`}>
          <img src={data?.cover} alt={data?.title} width={300} height={200} />
          <span
            className={Style.status}
            style={{ background: `${data?.color_status}` }}
          >
            {checkStatus(data?.status)}
          </span>
        </Link>
        <h3>{data?.title}</h3>
      </div>
    )
  }
}

export default CardFilme
