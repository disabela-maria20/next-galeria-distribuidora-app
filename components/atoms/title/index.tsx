import S from './title.module.scss'

type Props = {
  children: React.ReactNode
}

const Title = ({ children }: Props) => {
  return <h1 className={S.title}>{children}</h1>
}

export default Title
