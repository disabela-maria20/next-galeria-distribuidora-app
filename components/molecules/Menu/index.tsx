/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import Style from './Menu.module.scss'

import { Burger, Logo, Nav } from '../../atoms'

const Menu = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(true)

  useEffect(() => {
    if (!open) {
      document.body.classList.add(Style.bgOpacity)
    }
    if (open) {
      document.body.classList.remove(Style.bgOpacity)
    }
  }, [open])
  return (
    <>
      <div className={Style.bgNav}>
        <div className={Style.container}>
          <div className={Style.flexDeskTop}>
            <Nav open={open} setOpen={setOpen} />
            <div className={Style.flexMobile}>
              <Burger open={!open} setOpen={() => setOpen(!open)} />
              <Link href="/">
                <Logo logo={'logo.webp'} />
              </Link>
              {/* {isMobile && <Search />} */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Menu
