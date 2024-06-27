'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import Style from './Header.module.scss'

import { Menu } from '../../molecules/'

type Props = {
  children?: React.ReactNode
}

const Header = ({ children }: Props) => {
  const [isScrolling, setIsScrolling] = useState<boolean>(false)
  const scroll = useRef<HTMLDivElement | null>(null)

  const handleScroll = useCallback(() => {
    const scrollTop: number = window.scrollY
    const clientHeight: number = scroll.current?.clientHeight ?? 0

    setIsScrolling(scrollTop > clientHeight)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])
  return (
    <>
      <header
        ref={scroll}
        className={`${Style.bg_header} ${isScrolling ? Style.active : ''}`}
      >
        <Menu />
        {children}
      </header>
    </>
  )
}

export default Header
