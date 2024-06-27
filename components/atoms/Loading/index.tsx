import { PropagateLoader } from 'react-spinners'

import Style from './Loading.module.scss'

interface ILoadingProps {
  altura?: boolean
}

const Loading = ({ altura = false }: ILoadingProps) => {
  return (
    <section className={`${Style.loading} ${altura && Style.loadingHeight}`}>
      <PropagateLoader color="#fff" size={8} />
    </section>
  )
}

export default Loading
