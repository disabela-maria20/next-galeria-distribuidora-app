interface Cinema {
  CINEMA: string
  CIDADE: string
  ESTADO: string
  SALAS: Sala[]
}

interface Sala {
  SALA: string
  TIPO: string
  LEGENDA: string
  HORARIOS: Horario[]
}

interface Horario {
  HORARIO: string
  URL_COMPRA: string
}

interface Props {
  cinemas: Cinema[]
}

const Ingresso: React.FC<Props> = () => {
  return <>tes</>
}

export default Ingresso
