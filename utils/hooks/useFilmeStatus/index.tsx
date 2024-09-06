enum Status {
  LANCAMENTO = 'lancamento',
  STREAMING = 'streaming',
  INATIVO = 'inativo',
  PRODUCAO = 'producao',
  POSPRODUCAO = 'pos-producao',
  EMBREVE = 'em-breve'
}

type IFilmeResponse = {
  releasedate: string // Data de lançamento do filme
  streaming: { platform: string }[] // Plataforma de streaming
  hasSession: boolean // Se o filme está em cartaz no cinema
}

const statusCorrecoes: Record<Status, string> = {
  [Status.LANCAMENTO]: 'Lançamento',
  [Status.STREAMING]: 'Streaming',
  [Status.INATIVO]: 'Inativo',
  [Status.PRODUCAO]: 'Produção',
  [Status.POSPRODUCAO]: 'Pós-Produção',
  [Status.EMBREVE]: 'Em Breve'
}

// Função que tenta converter a string para o enum Status
const parseStatus = (status: string | undefined): Status | undefined => {
  if (!status) return undefined
  const upperStatus = status.toUpperCase() as keyof typeof Status
  return Status[upperStatus] || undefined
}

const formatDateToYYYYMMDD = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const useFilmeStatus = (
  status: string | undefined,
  data: IFilmeResponse
) => {
  // Calcular o parsedStatus diretamente
  const parsedStatus = parseStatus(status)

  // Se parsedStatus for indefinido, retornar uma string vazia
  if (!parsedStatus) return ''

  const statusCorrigido = statusCorrecoes[parsedStatus]
  const today = new Date()

  const dia = new Date(data.releasedate).getDate() + 1
  const mes = new Date(data.releasedate).getMonth() + 1
  const diaFormatado = dia < 10 ? `0${dia}` : dia
  const mesFormatado = mes < 10 ? `0${mes}` : mes

  if (
    (formatDateToYYYYMMDD(today) === data.releasedate &&
      data.streaming.length === 0) ||
    data.hasSession
  ) {
    return 'Hoje nos Cinemas'
  }

  if (
    formatDateToYYYYMMDD(today) === data.releasedate &&
    data.streaming.length !== 0
  ) {
    return `Hoje na ${data.streaming[0].platform}`
  }

  if (statusCorrigido === 'Lançamento' && data.streaming.length === 0) {
    return `${diaFormatado}/${mesFormatado} nos cinemas`
  }

  if (data.streaming.length > 0 && statusCorrigido === 'Lançamento') {
    return `${diaFormatado}/${mesFormatado} na ${data.streaming[0].platform}`
  }

  return statusCorrigido
}
