import { useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

import Style from './Model.module.scss'

interface IModelBodyProps {
  children: React.ReactNode
  setOpen(): void
  className?: string
}

const ModelBody: React.FC<IModelBodyProps> = ({
  children,
  setOpen,
  className
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [setOpen])

  return (
    <div className={`${Style.modelBody} ${className}`}>
      {children}
      <button
        className={Style.modelBodyIconClose}
        onClick={setOpen}
        aria-label="Fechar"
      >
        <AiOutlineClose />
      </button>
    </div>
  )
}

export default ModelBody
