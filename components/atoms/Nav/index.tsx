'use client'

import { IoClose } from 'react-icons/io5'

import Style from './Nav.module.scss'

import { NavLink, RedesSociais } from '..'

interface NavProps {
  open: boolean
  setOpen?: (value: boolean) => void
}

const Nav: React.FC<NavProps> = ({ open, setOpen }) => {
  return (
    <nav className={`${Style.navBar}`}>
      <div className={`${Style.NavArea} ${!open ? Style.open : Style.close}`}>
        <button
          aria-label="Fechar"
          className={Style.navFechar}
          onClick={() => setOpen && setOpen(!open)}
        >
          <IoClose />
        </button>
        <ul>
          <li className={Style.NomeMenu}>
            <span>Menu</span>
          </li>
          {/* <li className={Style.comprarIngressos}>
            <Link href="/comprar-ingressos">COMPRAR INGRESSOS</Link>
          </li> */}
          <NavLink area="menu" setOpen={setOpen} open={open} />
          {/* <li className={Style.logo}>
            <Logo logo="logo-BRANCO.png" />
          </li> */}
        </ul>
        <RedesSociais />
        {/* {!isMobile && <Search />} */}
      </div>
    </nav>
  )
}

export default Nav
