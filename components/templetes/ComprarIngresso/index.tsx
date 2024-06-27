'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import Style from './ComprarIngresso.module.scss'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'

import { Loading } from '@/components/atoms'
import { Newsletter, Slide } from '@/components/molecules'
import { Sessoes } from '@/components/organisms'
import useIsMobile from '@/utils/hooks/useIsMobile/isMobile'
import { IFilmeResponse } from '@/utils/server/types'
import axios from 'axios'
import { SwiperOptions } from 'swiper/types'

interface IComprarIngressoProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  banner: Array<any>
  listaFilmes: {
    releases: Array<IFilmeResponse>
    streaming: Array<IFilmeResponse>
  }
}

interface IComprarIngressoSessoesResponse {
  movie?: IFilmeResponse
}

const ComprarIngresso = ({ banner, listaFilmes }: IComprarIngressoProps) => {
  const { isMobile, isLoading } = useIsMobile()
  const [filmesComSessoes, setFilmesComSessoes] = useState<
    IComprarIngressoSessoesResponse[]
  >([])

  const [loading, setLoading] = useState<boolean>(false)
  const [sessoesArray, setSessoesArray] = useState<
    IComprarIngressoSessoesResponse[]
  >([])

  useEffect(() => {
    const fetchSessoes = async () => {
      try {
        setLoading(true)
        const sessoesArray = await Promise.all(
          listaFilmes.releases.map(async (data) => {
            const res = await axios.get(`/movie/get/${data.slug}`)
            return res.data
          })
        )
        setSessoesArray(sessoesArray)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchSessoes()
  }, [listaFilmes?.releases, sessoesArray?.length])

  useEffect(() => {
    const filmesComSessoes = sessoesArray.filter((data) => {
      return data.movie && data.movie.hasSession
    })
    setFilmesComSessoes(filmesComSessoes)
  }, [sessoesArray])

  const bannerSwiperOptions: SwiperOptions = {
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    },
    pagination: isMobile ? false : true,
    navigation: true,
    modules: [Navigation, Pagination, Autoplay]
  }

  const formatDateForSorting = (dateString: string) => {
    const date = new Date(dateString)
    return date.toISOString().slice(0, 10).replace(/-/g, '.')
  }

  if (isLoading) return <Loading altura={true} />
  return (
    <>
      {!isMobile && (
        <>
          <Slide.Content
            swiperOptions={bannerSwiperOptions}
            className={Style.slideBanner}
          >
            {banner?.map((data) => (
              <Link href={data.slug} key={data.id}>
                <img
                  src={isMobile ? data.bannerMobile : data.bannerDesktop}
                  alt="Banner"
                  width={1400}
                  height={440}
                />
              </Link>
            ))}
          </Slide.Content>
          <div className="container">
            <Newsletter isBg={true} isHorrizontal={!isMobile && true} />
          </div>
        </>
      )}
      <section className={Style.ComprarIngresso}>
        <div className="container">
          <h1>
            EM EXIBIÇÃO
            <span>
              Confira os horários das sessões dos filmes da Diamond em exibição
              nos cinemas e garanta seus ingressos.
            </span>
          </h1>
          {filmesComSessoes.length === 0 && !loading && (
            <p className={Style.CompraIgressoSessaoIndisponivel}>
              Nenhuma sessão disponível no momento.
            </p>
          )}
          {loading && <Loading />}
          {!loading && (
            <>
              {filmesComSessoes
                .sort((a, b) => {
                  const dateA = formatDateForSorting(
                    a.movie?.releasedate as string
                  )
                  const dateB = formatDateForSorting(
                    b.movie?.releasedate as string
                  )
                  if (dateA > dateB) return -1
                  if (dateA < dateB) return 1
                  return 0
                })
                .map((sessoes) => {
                  return (
                    <div key={sessoes.movie?.id} className={Style.itemSessao}>
                      {sessoes.movie && (
                        <>
                          <Sessoes
                            filme={sessoes?.movie}
                            poster={sessoes.movie.cover}
                            color={sessoes?.movie.color}
                          />
                        </>
                      )}
                    </div>
                  )
                })}
            </>
          )}
        </div>
      </section>
    </>
  )
}

export default ComprarIngresso
