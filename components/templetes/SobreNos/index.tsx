// eslint-disable-next-line prettier/prettier

'use client'
import Link from 'next/link'
import { useState } from 'react'
import { FaYoutube } from 'react-icons/fa'

import Style from './SobreNos.module.scss'
import { Navigation, Pagination } from 'swiper/modules'

import { Loading } from '@/components/atoms'
import { Model, Newsletter, Slide } from '@/components/molecules'
import useFilmeTextStatus from '@/utils/hooks/useFilmeTextStatus'
import { useFormatarData } from '@/utils/hooks/useFormatarData/formatarData'
import useIsMobile from '@/utils/hooks/useIsMobile/isMobile'
import { IFilmeResponse } from '@/utils/server/types'
import { SwiperOptions } from 'swiper/types'
interface ISobreNosProps {
  listaFilmes: {
    releases: Array<IFilmeResponse>
    streaming: Array<IFilmeResponse>
  }
}
const SobreNos = ({ listaFilmes }: ISobreNosProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const [iframe, setIframe] = useState<IFilmeResponse>()

  const { isMobile, isLoading } = useIsMobile()
  const { formatarData } = useFormatarData()
  const statusTextData = useFilmeTextStatus()
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
  function handleVerImagem(data: IFilmeResponse) {
    setOpen(true)
    setIframe(data)
  }
  if (isLoading) return <Loading altura={true} />
  return (
    <section className={Style.SobreNos}>
      <div className="container" style={{ overflow: 'hidden' }}>
        <img src="/img/logo.png" alt="logo" width={300} height={200} />
        <h1>SOBRE NÓS</h1>
        <h2>Uma companhia brasileira, nascida para fazer diferente</h2>
        <p>
          Fundada em 2018, a Galeria Distribuidora é uma empresa brasileira que
          atua no desenvolvimento, produção e distribuição de longas-metragens e
          séries nacionais. Inovação e dinamismo estão no DNA da Galeria, que
          atua em parceria com as maiores produtoras do país desde o início de
          cada projeto. Focada em conteúdos comerciais e com grande apelo junto
          ao público, a empresa apresenta em seu catálogo filmes como{' '}
          <em>'Detetive Madeinusa'</em>, comédia com fenômenos do humor liderada
          pelo humorista Tirullipa; <em>'Papai é Pop'</em>, filme inspirado no
          livro homônimo de Marcos Piangers, estrelado por Lázaro Ramos ao lado
          de Paolla Oliveira; <em>'Fazendo Meu Filme'</em>, estrelado por Bela
          Fernandes; <em>'Meninas Não Choram'</em> com Letícia Braga e Duda
          Matte; e <em>'Partiu América'</em>, protagonizado por Matheus Ceará.
          Os próximos lançamentos da Galeria Distribuidora são:{' '}
          <em>'Vovó Ninja'</em>, filme para toda a família com direção de Bruno
          Barreto e protagonizado por Gloria Pires; <em>'Doce Família'</em> com
          Mariana Xavier e Viih Tube; e <em>'Mãe Fora da Caixa'</em> com Miá
          Mello. A Galeria Distribuidora é coprodutora e distribuidora de um
          case inédito no mercado cinematográfico local:{' '}
          <em>'A Menina Que Matou Os Pais' e 'O Menino Que Matou Meus Pais'</em>
          , dois longas com pontos de vista diferentes sobre o caso von
          Richthofen. A trilogia sobre um dos crimes que mais chocou o Brasil
          foi concluída com o lançamento de{' '}
          <em>'A Menina Que Matou Os Pais – A Confissão'</em>.
        </p>

        <hr />
        {/* <h2 className={Style.titleOutline}>MISSÃO</h2>
        <p>
          Ser uma distribuidora que tem como melhor característica a qualidade
          de seus filmes, a partir de grandes produções e estrelas consagradas.
        </p>
        <h2 className={Style.titleOutline}>VISÃO</h2>
        <p>
          Ser reconhecida como líder no mercado de filmes independentes, sempre
          comprometidos com a sustentabilidade do negócio e com a satisfação de
          seus clientes.
        </p>
        <h2 className={Style.titleOutline}>VALORES</h2>
        <p>
          Enxergamos cada filme como um desafio único, para o qual destinamos
          uma atenção integral. Sempre com profissionalismo na distribuição e
          dedicação aos detalhes. Tudo isso sempre com muito respeito aos
          profissionais e clientes envolvidos
        </p>
        <hr /> */}
        <h2>VOCÊ AMA CINEMA?</h2>
        <Newsletter
          isHorrizontal={!isMobile ? true : false}
          isBg={true}
          title={false}
        />
        <h2 className={Style.titleLancamento}>
          LANÇAMENTOS
          <span>
            Confira os filmes em exibição e os que serão lançados em breve
            somente nos cinemas.
          </span>
        </h2>
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
                <Link href={`/${data.slug}`}>
                  <img
                    src={data.cover}
                    alt={data.title}
                    width={300}
                    height={200}
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
      </div>
    </section>
  )
}

export default SobreNos
