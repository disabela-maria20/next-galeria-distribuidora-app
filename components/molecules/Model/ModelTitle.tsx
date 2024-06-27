import Style from './Model.module.scss'

interface IModelTitleProps {
  children: React.ReactNode
}
const ModelTitle = ({ children }: IModelTitleProps) => {
  return <h2 className={Style.modelTitle}>{children}</h2>
}

export default ModelTitle
