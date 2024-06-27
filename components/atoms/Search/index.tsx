'use client'

import { useState } from 'react'
import { CgSearch } from 'react-icons/cg'

import Style from './Search.module.scss'

import useIsMobile from '@/utils/hooks/useIsMobile/isMobile'

const Search: React.FC = () => {
  const [searchPopUp, setSearchPopUp] = useState<boolean>(false)
  const { isMobile } = useIsMobile()

  return (
    <>
      <button
        aria-label="Pesquisar"
        className={Style.btnPesquisar}
        onClick={() => setSearchPopUp(!searchPopUp)}
      >
        <CgSearch />
      </button>
      {searchPopUp && (
        <section className={Style.popUpformInputSearch}>
          <InputSearch />
        </section>
      )}
      {!isMobile && (
        <div className={Style.formInputSearch}>
          <InputSearch />
        </div>
      )}
    </>
  )
}

const InputSearch: React.FC = () => {
  return (
    <div className={Style.InputSearch}>
      <input type="text" placeholder="Buscar..." />
      <button>
        <CgSearch />
      </button>
    </div>
  )
}

export default Search
