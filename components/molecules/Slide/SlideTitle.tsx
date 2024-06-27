interface ISlideTitle {
  children: React.ReactNode
  className: string
}

const SlideTitle = ({ children, className }: ISlideTitle) => {
  return <h2 className={className}>{children}</h2>
}

export default SlideTitle
