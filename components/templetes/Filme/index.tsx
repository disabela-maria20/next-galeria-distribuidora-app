/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'

import { useRouter } from 'next/navigation'
import { useLayoutEffect, useState } from 'react'
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import Style from './Filme.module.scss'
import { FreeMode, Scrollbar } from 'swiper/modules'

import { Loading } from '@/components/atoms'
import { Model, Newsletter, Slide } from '@/components/molecules'
import { Sessoes } from '@/components/organisms'
import { useFormatarData } from '@/utils/hooks/useFormatarData/formatarData'
import useIsMobile from '@/utils/hooks/useIsMobile/isMobile'
import { useGtag } from '@/utils/lib/gtag'
import { IFilmeResponse, IFilmeResponseUrl } from '@/utils/server/types'
import { SwiperOptions } from 'swiper/types'

import 'react-lazy-load-image-component/src/effects/blur.css'
import { FaXTwitter } from 'react-icons/fa6'
interface IFilmeProps {
  movie: {
    movie: IFilmeResponse
  }
}

enum EStatus {
  LANCAMENTO = 'lançamento',
  STREAMING = 'streaming',
  INATIVO = 'inativo'
}

const classificacoesIndicativas = [
  { idade: 'Livre', cor: '#048f16' },
  { idade: '10', cor: '#0281df' },
  { idade: '12', cor: '#f5d218' },
  { idade: '14', cor: '#f0850c' },
  { idade: '16', cor: '#d40011' },
  { idade: '18', cor: '#161616' }
]

const swiperOptions: SwiperOptions = {
  slidesPerView: 2,
  spaceBetween: 10,
  freeMode: true,
  pagination: {
    clickable: true
  },
  scrollbar: { hide: true },
  modules: [FreeMode, Scrollbar],
  breakpoints: {
    640: {
      slidesPerView: 3,
      spaceBetween: 20
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 10
    }
  }
}
function setDefinirCorClassificacaoIndicativa(idade: string) {
  const classificacao = classificacoesIndicativas.find(
    (classificacao) => classificacao.idade === idade
  )

  return classificacao ? classificacao.cor : ''
}

function converterParaHorasEMinutos(totalMinutos: number) {
  const horas = Math.floor(totalMinutos / 60)
  const minutos = totalMinutos % 60

  return `${horas}h e ${minutos}min`
}

const Filme = (data: IFilmeProps) => {
  const filme = data.movie?.movie
  //const streaming = filme.streaming.map((data) => data.platform).join(',')
  const isStreaming = filme.status == EStatus.STREAMING
  const {
    formatMesmaSemana,
    formatPassouUmaSemanaDesdeData,
    formatfaltaUmaSemanaParaDataMarcada
  } = useFormatarData()
  const { formatarData } = useFormatarData()
  const { dataLayerFichafilme, dataLayerPlayTrailer, dataLayerMovieStream } =
    useGtag()
  const { isMobile, isLoading } = useIsMobile()
  const [imageIndex, setImageIndex] = useState<number>(0)
  const [open, setOpen] = useState<boolean>(false)
  const [iframe, setIframe] = useState<string>()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [saibaMais, setSaibaMais] = useState<boolean>(
    formatfaltaUmaSemanaParaDataMarcada(filme.releasedate) && filme.hasSession
  )

  const handlePrevImage = () => {
    setImageIndex((prevIndex) =>
      prevIndex === 0 ? filme.images.length - 1 : prevIndex - 1
    )
  }

  const handleNextImage = () => {
    setImageIndex((prevIndex) =>
      prevIndex === filme.images.length - 1 ? 0 : prevIndex + 1
    )
  }

  //const formatarData = useFormatarData()
  const emExibicao =
    formatMesmaSemana(filme?.releasedate) ||
    formatPassouUmaSemanaDesdeData(filme?.releasedate) ||
    filme?.hasSession

  const router = useRouter()
  useLayoutEffect(() => {
    const pageFichafilme = () => {
      dataLayerFichafilme(
        filme?.title,
        filme?.slug,
        filme?.originalTitle,
        filme?.genre,
        Number(filme?.idVibezzMovie)
      )
    }
    pageFichafilme()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  function handleVerImagem(data: IFilmeResponseUrl, index: number) {
    setOpen(true)
    setImageIndex(index)
  }

  function handleVerVideo(data: string) {
    setOpenModal(true)
    setIframe(data)
  }

  if (isLoading) return <Loading altura={true} />

  const isFilmeFeparaoimpossivel = filme.title == 'Fé Para o Impossível'
  return (
    <>
      <section
        className={Style.areaBanner}
        style={{
          backgroundImage: `url(${isMobile ? filme?.bannerMobile : filme?.bannerDesktop})`
        }}
      >
        <div className={Style.bannerFilme}>
          <div className="container">
            <div className={Style.areaTituloBanner}>
              <h1 style={{ color: filme.slug }}>{filme?.title}</h1>
              <div className={Style.subTitle}>
                <h2 className={Style.emExibicao}>
                  {filme.title == 'Fé Para o Impossível' &&
                  filme.releasedate == '0000-00-00'
                    ? 'Fevereiro nos Cinemas'
                    : formatarData(filme.releasedate)}
                </h2>
                <div className={Style.areaBtnCompra}>
                  {!isStreaming && emExibicao && !isMobile && (
                    <button
                      onClick={() => {
                        router.push('#sessao', { scroll: true })
                      }}
                    >
                      COMPRAR INGRESSOS
                    </button>
                  )}
                  {filme.streaming.length > 0 && !isMobile && (
                    <button
                      onClick={() => {
                        dataLayerMovieStream(
                          filme.title,
                          filme.slug,
                          filme.originalTitle,
                          filme.genre,
                          filme.streaming.toString(),
                          Number(filme.idVibezzMovie)
                        )
                        window.location.href = ' https://www.primevideo.com/'
                      }}
                    >
                      ASSISTA AGORA NO
                      <LazyLoadImage
                        src={`/img/streaming/${'amazonprime'}.png`}
                        // alt={service.toLowerCase()}
                        width="100"
                        effect="blur"
                      />
                    </button>
                  )}
                </div>
              </div>
              <div className={Style.AreaSaibamais}>
                {filme.hasSession && (
                  <button
                    className={Style.btnSaibaMais}
                    onClick={() => {
                      setSaibaMais(!saibaMais)
                      router.push('#saibamais', { scroll: true })
                    }}
                  >
                    Saiba +
                  </button>
                )}
              </div>
            </div>
            {/* {!isMobile && <Links youtube={filme?.trailer} insta="" />} */}
          </div>
        </div>
      </section>

      <div style={{ overflow: 'hidden' }}>
        <div className="container">
          {!filme.hasSession && (
            <div className={Style.areaNewsletter}>
              <Newsletter
                isHorrizontal={!isMobile}
                isBg={true}
                filmes={filme}
                type="filme"
              />
            </div>
          )}
          {emExibicao && isMobile && !isStreaming && (
            <div className={Style.areaBtnCompra}>
              <button onClick={() => router.push('#sessao', { scroll: true })}>
                COMPRAR INGRESSOS
              </button>
            </div>
          )}
          {filme.streaming.length > 0 && isMobile && (
            <button
              onClick={() => {
                dataLayerMovieStream(
                  filme.title,
                  filme.slug,
                  filme.originalTitle,
                  filme.genre,
                  filme.streaming.toString(),
                  Number(filme.idVibezzMovie)
                )
              }}
            >
              ASSISTA AGORA NO
              <LazyLoadImage
                src={`/img/streaming/${'amazonprime'}.png`}
                // alt={service.toLowerCase()}
                width="100"
                effect="blur"
              />
            </button>
          )}

          {!saibaMais && (
            <section className={Style.filmeSaibaMais}>
              <div className={Style.areaPoster}>
                <div className={Style.areaFlexPoster} id="saibamais">
                  <LazyLoadImage
                    src={filme?.cover}
                    alt={filme?.title}
                    width={270}
                    height={400}
                  />
                  <div>
                    <h2>Sinopse</h2>
                    <p>{filme?.shortSynopsis}</p>
                    {filme?.trailer === '' && (
                      <div className={Style.AreaLinksSociais}>
                        <span
                          className={Style.areaAssitirTrailer}
                          onClick={() => handleVerVideo(filme?.trailer)}
                        >
                          <FaYoutube />
                          <span>ASSISTA AO TRAILER</span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className={Style.areaFlexInformacoes}>
                  <div>
                    <h2>Informações</h2>
                    <div className={Style.areaClassificaçãoIndicativa}>
                      {filme?.age && (
                        <span
                          style={{
                            background: `${setDefinirCorClassificacaoIndicativa(filme?.age)}`
                          }}
                        >
                          {filme?.age}
                        </span>
                      )}

                      <p>{filme?.ageExplain}</p>
                    </div>
                    <ul className={Style.areainformacaoFilme}>
                      <li>
                        <strong>Título Internacional:</strong>
                        {filme?.originalTitle}
                      </li>
                      <li>
                        <strong>Duração:</strong>
                        {converterParaHorasEMinutos(filme?.duration)}
                      </li>
                      <li>
                        <strong>Gênero:</strong>
                        {filme?.genre}
                      </li>
                      <li>
                        <strong>Elenco:</strong>
                        {filme?.cast}
                      </li>
                      <li>
                        <strong>Direção:</strong>
                        {filme?.director}
                      </li>
                      <li>
                        <strong>Data de Estreia:</strong>
                        {formatarData(filme?.releasedate)}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {isFilmeFeparaoimpossivel && (
                <section className={Style.FilmesPersonalizados}>
                  <Slide.Title className={Style.slideTitle}>
                    Materiais do Filme
                  </Slide.Title>
                  <p>
                    Para baixar os materiais oficiais do filme Fé Para O
                    Impossível, clique no botão abaixo. (Esse link será
                    adicionado com os materiais já divulgados, como trailer,
                    artes para telão, posts, etc.)
                  </p>
                  <div className={Style.btn}>
                    <a
                      target="_blank"
                      href="https://drive.google.com/drive/folders/1aKhUfjRqC8ZoeN6SxI2hm6gt1iQ0SBjq?usp=sharing"
                      rel="noreferrer"
                    >
                      Baixar
                    </a>
                  </div>

                  <Slide.Title className={Style.slideTitle}>
                    Ingressos em Grupo
                  </Slide.Title>
                  <p>
                    Vai assistir em grupo? Preencha o formulário se tiver
                    interesse em comprar ingressos para grupos de 20 pessoas ou
                    mais.
                  </p>
                  <div className={Style.btn}>
                    <a
                      target="_blank"
                      href="https://forms.gle/ZEYz46xXXfEjZSet6"
                      rel="noreferrer"
                    >
                      Baixar
                    </a>
                  </div>

                  <Slide.Title className={Style.slideTitle}>
                    Redes Sociais
                  </Slide.Title>
                  <ul>
                    <li>
                      <a
                        href="https://www.instagram.com/feparaoimpossivel/"
                        aria-label="Instagram"
                      >
                        <FaInstagram />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://x.com/feproimpossivel"
                        aria-label="X (Twitter)"
                      >
                        <FaXTwitter />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.tiktok.com/@feparaoimpossivel"
                        aria-label="Tiktok"
                      >
                        <FaTiktok />
                      </a>
                    </li>
                  </ul>
                </section>
              )}

              {filme.images.length != 0 && (
                <Slide.Title className={Style.slideTitle}>Vídeos</Slide.Title>
              )}
              <section className={Style.areaIframeVideoYoutube}>
                <section className={Style.gridIframeVideoYoutube}>
                  {filme?.videos?.map((data) => (
                    <div
                      className={Style.iframeVideoYoutube}
                      key={data.url}
                      onClick={() => {
                        dataLayerPlayTrailer(
                          filme.title,
                          filme.slug,
                          filme.originalTitle,
                          filme.genre,
                          'HUB',
                          Number(filme.idVibezzMovie)
                        )
                      }}
                    >
                      <iframe
                        className={Style.embedResponsiveItem}
                        src={`${data.url}?enablejsapi=1&origin=diamondfilms.com.br`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ))}
                </section>
              </section>

              {filme.videos.length != 0 && (
                <Slide.Title className={Style.slideTitle}>Galeria</Slide.Title>
              )}

              <Slide.Content
                swiperOptions={swiperOptions}
                className={Style.areaSlide}
              >
                {filme?.images?.map((data, i) => (
                  <div key={data.url}>
                    <LazyLoadImage
                      effect="blur"
                      alt="Filme"
                      className={Style.SlideImgFilme}
                      src={`${data.url}`}
                      onClick={() => handleVerImagem(data, i)}
                      style={{ cursor: 'pointer' }}
                      width={300}
                      height={200}
                    />
                  </div>
                ))}
              </Slide.Content>
            </section>
          )}
          {filme.hasSession && (
            <section id="sessao" className={Style.combrarIngresso}>
              <h2 className={Style.slideTitle}>Comprar ingressos</h2>
              <p>
                Para buscar as sessões: Selecione o ESTADO e a CIDADE, e veja os
                cinemas disponiveis com as sessões
              </p>
              <Sessoes filme={filme} color={filme.color} poster={filme.cover} />
            </section>
          )}

          <div className={Style.areaNewsletter}>
            <Newsletter
              isHorrizontal={!isMobile}
              isBg={true}
              filmes={filme}
              type="filme"
            />
          </div>

          {open && (
            <Model.Root>
              <Model.Body
                setOpen={() => setOpen(!open)}
                className={Style.modalImageFilme}
              >
                <LazyLoadImage
                  effect="blur"
                  src={filme.images[imageIndex]?.url}
                  className={Style.modalSlideImg}
                  alt="Imagem filmes"
                  width={700}
                  height={500}
                />
                <div className={Style.btnSlideImagem}>
                  <button onClick={handlePrevImage}>
                    <FiChevronLeft />
                  </button>
                  <button onClick={handleNextImage}>
                    <FiChevronRight />
                  </button>
                </div>
              </Model.Body>
            </Model.Root>
          )}
          {openModal && (
            <Model.Root>
              <Model.Body
                setOpen={() => setOpenModal(!openModal)}
                className={Style.ModaliframeVideoYoutube}
              >
                <div className={Style.iframeVideoYoutube} key={iframe}>
                  <iframe
                    className={Style.embedResponsiveItem}
                    src={iframe}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </Model.Body>
            </Model.Root>
          )}
        </div>
      </div>
    </>
  )
}

export default Filme
