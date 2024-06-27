import Style from './Burger.module.scss'

interface BurgerProps {
  open: boolean
  setOpen(): void
}

const Burger: React.FC<BurgerProps> = ({ setOpen }) => {
  return (
    <div className={Style.burger} onClick={setOpen}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

export default Burger
