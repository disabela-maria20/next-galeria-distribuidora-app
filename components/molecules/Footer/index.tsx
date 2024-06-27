import Style from './Footer.module.scss'

import { Logo, NavLink, RedesSociais } from '@/components/atoms'

const Footer = () => {
  // const BANDEIRAS = [
  //   { id: 0, img: 'argentina', link: '' },
  //   { id: 1, img: 'chile', link: '' },
  //   { id: 2, img: 'colombia', link: '' },
  //   { id: 3, img: 'bolivia', link: '' },
  //   { id: 4, img: 'mexico', link: '' },
  //   { id: 5, img: 'espanha', link: '' },
  //   { id: 6, img: 'peru', link: '' }
  // ]
  return (
    <footer className={Style.footer}>
      <div className="container">
        <div className={Style.areaGridFooter}>
          <div className={Style.areaLogo}>
            <Logo logo="logo-BRANCO.png" />
          </div>
          <div className={Style.areaCopy}>
            <h3>© 2023 Galeria Distribuidora. </h3>
            <p>Todos os direitos reservados.</p>
          </div>
          <div className={Style.areaMapaSite}>
            <h3>Mapa do Site</h3>
            <ul>
              <NavLink area="footer" />
            </ul>
          </div>
          <div className={Style.areaRedesSociais}>
            <h3>Redes Sociais</h3>
            <RedesSociais />
          </div>
          {/* <div className={Style.areaFiliais}>
            <h3>Filiais</h3>
            <ul>
              {BANDEIRAS.map((data) => (
                <li key={data.id}>
                  <a href={data.link} target="_blank" rel="noopener noreferrer">
                    <img
                      src={`/img/bandeiras/${data.img}.png`}
                      alt={data.img}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div> */}
        </div>
      </div>
    </footer>
  )
}

export default Footer
