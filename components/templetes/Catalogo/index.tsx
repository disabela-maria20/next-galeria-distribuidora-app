/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState, useEffect } from 'react'
import { IoSearchSharp } from 'react-icons/io5'

import Style from './Catalogo.module.scss'

import { Loading } from '@/components/atoms'
import { CardFilme } from '@/components/molecules'
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
  const currentYear = new Date().getFullYear().toString()
  const [filtroGenero, setFiltroGenero] = useState<string>('')
  const [filtroAno, setFiltroAno] = useState<string>(currentYear) // Inicia com o ano atual
  const [pesquisa, setPesquisa] = useState<string>('')
  const [filtroAlfabeto, setFiltroAlfabeto] = useState<string>('')
  const [filtroPesquisa, setFiltroPesquisa] = useState<IFilmeResponse[]>([])

  const concatFilmes = listaFilmes
    ? [
        ...listaFilmes.releases,
        ...listaFilmes.coming_soon,
        ...listaFilmes.in_production,
        ...listaFilmes.post_production,
        ...listaFilmes.streaming
      ]
    : []

  const anosDisponiveis = Array.from(
    new Set(concatFilmes.map((filme) => filme.releaseYear))
  ).sort((a, b) => Number(b) - Number(a))

  const { dataLayerMovieFilter } = useGtag()

  useEffect(() => {
    if (concatFilmes) {
      setFiltroPesquisa(concatFilmes.filter(filtrarFilmes))
    }
  }, [filtroAno, concatFilmes])

  const handleGeneroChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const novoGenero = event.target.value
    setFiltroGenero(novoGenero)
    dataLayerMovieFilter('Filmes | Diamond Film', 'filmes', '', novoGenero, 0)
  }

  const handleAnoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFiltroAno(event.target.value)
  }

  const handleFiltroAlfabeto = (letra: string) => {
    setPesquisa('')
    setFiltroPesquisa([])
    setFiltroAlfabeto(letra)
  }

  const handlePesquisa = () => {
    setFiltroAlfabeto('')
    if (!concatFilmes) return
    const filmesPesquisados = concatFilmes.filter(ItemPesquisados)
    setFiltroPesquisa(filmesPesquisados)
  }

  const ItemPesquisados = (filme: IFilmeResponse) => {
    return filme.title.toLowerCase().includes(pesquisa.toLowerCase())
  }

  const filtrarFilmes = (filme: IFilmeResponse) => {
    if (filtroPesquisa.length > 0 && !filtroPesquisa.includes(filme)) {
      return false
    }

    if (filtroGenero && filme.genre !== filtroGenero) {
      return false
    }
    if (filtroAno && filme.releaseYear !== filtroAno) {
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
            {anosDisponiveis.map((ano, index) => (
              <option key={index} value={ano}>
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
            <button onClick={handlePesquisa}>
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
              <h2>{filtroAno}</h2> <span></span>
            </div>
            <div className={Style.gridFilmesCatalogo}>
              {(filtroPesquisa.length > 0
                ? filtroPesquisa
                : concatFilmes.filter(filtrarFilmes)
              )
                .sort(
                  (a, b) =>
                    new Date(b.releaseYear).getTime() -
                    new Date(a.releaseYear).getTime()
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
