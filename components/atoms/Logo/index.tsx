import Style from './Logo.module.scss'

type TypeLogo = 'logo.png' | 'logo-BRANCO.png'

interface IPropsLogo {
  logo: TypeLogo
}

const Logo = ({ logo = 'logo.png' }: IPropsLogo): JSX.Element => {
  return (
    <img
      src={`/img/${logo}`}
      alt="Logo nsg"
      width={146}
      height={90}
      className={Style.logo}
    />
  )
}

export default Logo
