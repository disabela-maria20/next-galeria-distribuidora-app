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
    coming_soon: Array<IFilmeResponse>
    in_production: Array<IFilmeResponse>
    post_production: Array<IFilmeResponse>
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
  EMBREVE = 'em-breve'
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

  const filmes = listaFilmes?.releases.concat(
    ...listaFilmes.coming_soon,
    ...listaFilmes.in_production,
    ...listaFilmes.post_production
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

  const checkStatus = (status: string | undefined, data: IFilmeResponse) => {
    if (!status) return

    const statusKey = status as Status
    const statusCorrigido = statusCorrecoes[statusKey]

    const dia = new Date(data.releasedate).getDate() + 1
    const mes = new Date(data.releasedate).getMonth() + 1
    const diaFormatado = dia < 10 ? `0${dia}` : dia
    const mesFormatado = mes < 10 ? `0${mes}` : mes

    if (statusCorrigido == 'Lançamento' && data.streaming.length == 0) {
      return `${diaFormatado}/${mesFormatado} nos cinemas`
    }

    if (data.streaming.length > 0 && statusCorrigido == 'Lançamento') {
      return `${diaFormatado}/${mesFormatado} na ${data.streaming[0].platform}`
    }

    return statusCorrigido
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
                      style={{ background: `${data.color_status}` }}
                    >
                      {checkStatus(data.status, data)}
                    </span>
                  </Link>
                  <h3>{data.title}</h3>
                  {!data.hasSession ? (
                    <span className={Style.data}>
                      Estreia:{' '}
                      {data?.releasedate == '0000-00-00'
                        ? 'A confirmar'
                        : formatarData(data?.releasedate)}
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
          ?.sort((a, b) => {
            const [dayA, monthA, yearA] = a.releaseYear.split('-').map(Number)
            const [dayB, monthB, yearB] = b.releaseYear.split('-').map(Number)

            return (
              yearB - yearA || // Ordena por ano
              monthB - monthA || // Se os anos forem iguais, ordena por mês
              dayB - dayA // Se os meses forem iguais, ordena por dia
            )
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
                  {checkStatus(data.status, data)}
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
            {checkStatus(data?.status, data)}
          </span>
        </Link>
        <h3>{data?.title}</h3>
      </div>
    )
  }
}

export default CardFilme
