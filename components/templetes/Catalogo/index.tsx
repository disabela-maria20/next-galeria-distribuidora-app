'use client'
import React, { useState, useMemo } from 'react'
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
  const [filtroGenero, setFiltroGenero] = useState<string>('')
  const [filtroAno, setFiltroAno] = useState<string>('')
  const [pesquisa, setPesquisa] = useState<string>('')
  const [filtroAlfabeto, setFiltroAlfabeto] = useState<string>('')

  const concatFilmes = useMemo(() => {
    if (!listaFilmes) return []
    return listaFilmes.releases.concat(
      listaFilmes.coming_soon,
      listaFilmes.in_production,
      listaFilmes.post_production,
      listaFilmes.streaming
    )
  }, [listaFilmes])

  const { dataLayerMovieFilter } = useGtag()

  const handleGeneroChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const novoGenero = event.target.value
    setFiltroGenero(novoGenero)
    dataLayerMovieFilter('Filmes | Diamond Film', 'filmes', '', novoGenero, 0)
  }

  const handleAnoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const novoAno = event.target.value
    setFiltroAno(novoAno)
  }

  const handleFiltroAlfabeto = (letra: string) => {
    setPesquisa('')
    setFiltroAlfabeto(letra)
  }

  const handlePesquisa = () => {
    setFiltroGenero('')
    setFiltroAno('')
    setFiltroAlfabeto('')
  }

  const filtrarFilmes = (filme: IFilmeResponse) => {
    if (pesquisa) {
      return filme.title.toLowerCase().includes(pesquisa.toLowerCase())
    }

    if (filtroGenero && filme.genre !== filtroGenero) return false
    if (filtroAno && parseInt(filme.releaseYear) !== parseInt(filtroAno))
      return false
    if (filtroAlfabeto === '#' && !isNaN(parseInt(filme.title.charAt(0))))
      return true
    if (
      filtroAlfabeto &&
      filme.title.charAt(0).toUpperCase() !== filtroAlfabeto
    )
      return false
    return true
  }

  const filmesFiltrados = useMemo(() => {
    return concatFilmes.filter(filtrarFilmes)
  }, [concatFilmes, filtrarFilmes])

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
            {Array.from(new Set(concatFilmes.map((filme) => filme.releaseYear)))
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .sort((a: any, b: any) => a - b)
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
        {filmesFiltrados.length > 0 && (
          <>
            {['2024', '2025'].map(
              (ano) =>
                filmesFiltrados.filter((data) => data.releaseYear === ano)
                  .length > 0 && (
                  <React.Fragment key={ano}>
                    <div className={Style.areaTitleCatalogoFilmeAno}>
                      <h2>{ano}</h2> <span></span>
                    </div>
                    <div className={Style.gridFilmesCatalogo}>
                      {filmesFiltrados
                        .filter((data) => data.releaseYear === ano)
                        .sort(
                          (a, b) =>
                            new Date(a.releasedate).getTime() -
                            new Date(b.releasedate).getTime()
                        )
                        .map((data) => (
                          <div key={data.id}>
                            <CardFilme data={data} slide="catalogo" />
                          </div>
                        ))}
                    </div>
                  </React.Fragment>
                )
            )}
            {filmesFiltrados.filter(
              (data) => !['2024', '2025'].includes(data.releaseYear)
            ).length > 0 && (
              <>
                <div className={Style.areaTitleCatalogoFilmeAno}>
                  <h2>CATÁLOGO</h2> <span></span>
                </div>
                <div className={Style.gridFilmesCatalogo}>
                  {filmesFiltrados
                    ?.sort((a, b) => {
                      const [dayA, monthA, yearA] = a.releaseYear
                        .split('-')
                        .map(Number)
                      const [dayB, monthB, yearB] = b.releaseYear
                        .split('-')
                        .map(Number)

                      return yearB - yearA || monthB - monthA || dayB - dayA
                    })
                    .filter(
                      (data) => !['2024', '2025'].includes(data.releaseYear)
                    )

                    .map((data) => (
                      <div key={data.id}>
                        <CardFilme data={data} slide="catalogo" />
                      </div>
                    ))}
                </div>
              </>
            )}
          </>
        )}
        {filmesFiltrados.length === 0 && (
          <p className={Style.CatalogoVazio}>Nenhum filme encontrado</p>
        )}
      </div>
    </section>
  )
}

export default Catalogo
