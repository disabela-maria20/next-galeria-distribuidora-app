'use client'

import Link from 'next/link'
import { FaYoutube } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa6'

import Style from './RedesSociais.module.scss'

const RedesSociais: React.FC = () => {
  const navRedes = [
    {
      id: 1,
      name: 'Instagram',
      icone: <FaInstagram />,
      link: 'https://www.instagram.com/mais_galeria/'
    },
    {
      id: 2,
      name: 'Youtube',
      icone: <FaYoutube />,
      link: 'https://www.youtube.com/@galeriadistribuidora856'
    }
  ]

  return (
    <ul className={Style.redesSociais}>
      {navRedes.map((redes) => (
        <li key={redes.id}>
          <Link href={redes.link} aria-label={redes.name} target="_blank">
            <i>{redes.icone}</i>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default RedesSociais
