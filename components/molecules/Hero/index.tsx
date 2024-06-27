import Style from './Hero.module.scss'

const Hero = () => {
  return (
    <section className={Style.hero}>
      <div className="container">
        <div className={Style.grid}>
          <div className={Style.areaTitle}>
            <h1>
              A parceira conectada ao seu&nbsp;
              <strong>planejamento e resultados.</strong>
            </h1>
          </div>
          <div className={Style.illustration}>
            <img
              src="/images/illustration/1.webp"
              alt=""
              className={Style.megaphone}
            />
            <img
              src="/images/illustration/3D_.webp"
              alt=""
              className={Style.graphics}
            />
            <img
              src="/images/illustration/Calendar.webp"
              alt=""
              className={Style.calendar}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
