'use client'
import React, { useState } from 'react'
import { IoSearchSharp } from 'react-icons/io5'

import Style from './Catalogo.module.scss'

import { Loading } from '@/components/atoms'
import { CardFilme } from '@/components/molecules'
import { useFormatarData } from '@/utils/hooks/useFormatarData/formatarData'
import { useGtag } from '@/utils/lib/gtag'
import { IFilmeResponse } from '@/utils/server/types'

interface ICatalogoProps {
  listaFilmes?: {
    releases: Array<IFilmeResponse>
    streaming: Array<IFilmeResponse>
    coming_soon: Array<IFilmeResponse>
    in_production: Array<IFilmeResponse>
    post_production: Array<IFilmeResponse>
  }
}

const Catalogo: React.FC<ICatalogoProps> = ({ listaFilmes }) => {
  const [filtroGenero, setFiltroGenero] = useState<string>('')
  const [filtroAno, setFiltroAno] = useState<string>('')
  const [pesquisa, setPesquisa] = useState<string>('')
  const [filtroAlfabeto, setFiltroAlfabeto] = useState<string>('')
  const [filtroPesquisa, setFiltroPesquisa] = useState<IFilmeResponse[]>([])
  const { formatAno } = useFormatarData()

  const concatFilmes = listaFilmes?.releases.concat(
    ...listaFilmes.coming_soon,
    ...listaFilmes.in_production,
    ...listaFilmes.post_production,
    ...listaFilmes.streaming
  )

  const { dataLayerMovieFilter } = useGtag()

  const handleGeneroChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // setFiltroAno('')
    // setPesquisa('')
    // setFiltroAlfabeto('')
    // setFiltroPesquisa([])
    const novoGenero = event.target.value
    setFiltroGenero(novoGenero)
    dataLayerMovieFilter('Filmes | Diamond Film', 'filmes', '', novoGenero, 0)
  }

  const handleAnoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // setFiltroGenero('')
    // setPesquisa('')
    // setFiltroAlfabeto('')
    // setFiltroPesquisa([])
    const novoAno = event.target.value
    setFiltroAno(novoAno)
  }

  const handleFiltroAlfabeto = (letra: string) => {
    // setFiltroGenero('')
    // setFiltroAno('')
    setPesquisa('')
    setFiltroPesquisa([])
    setFiltroAlfabeto(letra)
  }

  const handlePesquisa = () => {
    // setFiltroGenero('')
    // setFiltroAno('')
    setFiltroAlfabeto('')
    if (!concatFilmes) return
    const filmesPesquisados = concatFilmes.filter(ItemPesquisados)
    setFiltroPesquisa(filmesPesquisados)
  }

  const ItemPesquisados = (filme: IFilmeResponse) => {
    if (filme.title.toLowerCase().includes(pesquisa.toLowerCase())) {
      return filme.title.toLowerCase().includes(pesquisa.toLowerCase())
    }
  }

  const filtrarFilmes = (filme: IFilmeResponse) => {
    if (filtroPesquisa.length > 0 && !filtroPesquisa.includes(filme)) {
      return false
    }

    if (filtroGenero && filme.genre !== filtroGenero) {
      return false
    }
    if (filtroAno && formatAno(filme.releasedate) !== parseInt(filtroAno)) {
      return false
    }

    if (filtroAlfabeto === '#' && !isNaN(parseInt(filme.title.charAt(0)))) {
      return true
    }
    if (
      filtroAlfabeto &&
      filme.title.charAt(0).toUpperCase() !== filtroAlfabeto
    ) {
      return false
    }
    if (filtroAno === '2024' && formatAno(filme.releasedate) !== 2024) {
      return false
    }
    return true
  }

  if (!concatFilmes) return <Loading />
  return (
    <section className={Style.catalogo}>
      <div className="container">
        <h1>Filmes</h1>
        <div className={Style.gridCatalogo}>
          <select value={filtroGenero} onChange={handleGeneroChange}>
            <option value="">Gênero</option>
            {Array.from(new Set(concatFilmes.map((data) => data.genre))).map(
              (genre, index) => (
                <option key={index} value={genre}>
                  {genre}
                </option>
              )
            )}
          </select>
          <select value={filtroAno} onChange={handleAnoChange}>
            <option value="">Ano</option>
            {Array.from(
              new Set(concatFilmes.map((filme) => formatAno(filme.releasedate)))
            )
              .sort((a, b) => a - b)
              .map((ano, index) => (
                <option key={index} value={ano.toString()}>
                  {ano}
                </option>
              ))}
          </select>
          <div className={Style.areaPesquisarCatalogo}>
            <input
              type="text"
              placeholder="Pesquisar nome..."
              value={pesquisa}
              onChange={({ target }) => setPesquisa(target.value)}
            />
            <button onClick={() => handlePesquisa()}>
              <IoSearchSharp />
            </button>
          </div>
        </div>
        <div className={Style.gridFiltroAlfabeto}>
          <button onClick={() => handleFiltroAlfabeto('')}>
            <strong>TUDO</strong>
          </button>
          <button onClick={() => handleFiltroAlfabeto('#')}>#</button>
          {Array.from({ length: 26 }, (_, index) => (
            <button
              key={index}
              onClick={() =>
                handleFiltroAlfabeto(String.fromCharCode(65 + index))
              }
            >
              {String.fromCharCode(65 + index)}
            </button>
          ))}
        </div>
        {(filtroPesquisa.length > 0 ||
          concatFilmes.filter(filtrarFilmes).length > 0) && (
          <>
            <div className={Style.areaTitleCatalogoFilmeAno}>
              <h2>2024</h2> <span></span>
            </div>
            <div className={Style.gridFilmesCatalogo}>
              {(filtroPesquisa.length > 0
                ? filtroPesquisa
                : // eslint-disable-next-line no-unsafe-optional-chaining
                  concatFilmes.filter(filtrarFilmes)
              )
                .sort(
                  (a, b) =>
                    new Date(b.releasedate).getTime() -
                    new Date(a.releasedate).getTime()
                )
                .map((data) => (
                  <div key={data.id}>
                    <CardFilme data={data} slide="catalogo" />
                  </div>
                ))}
            </div>
          </>
        )}

        {filtroPesquisa.length === 0 &&
          concatFilmes.filter(filtrarFilmes).length === 0 && (
            <p className={Style.CatalogoVazio}>Nenhum filme encontrado</p>
          )}
      </div>
    </section>
  )
}

export default Catalogo
