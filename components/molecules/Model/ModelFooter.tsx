import Link from 'next/link'

import Style from './Model.module.scss'

import { Logo } from '@/components/atoms'

const ModelFooter = () => {
  return (
    <div className={Style.modelFooter}>
      <Logo logo="logo-BRANCO.png" />
      <ul>
        <li>
          <Link href="/politica-de-privacidade">Politica de privacidade</Link>
        </li>
      </ul>
    </div>
  )
}

export default ModelFooter
