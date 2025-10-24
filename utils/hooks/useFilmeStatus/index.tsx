import { useMemo } from 'react'

import { IFilmeResponse } from '@/utils/server/types'

enum Status {
  LANCAMENTO = 'lancamento',
  STREAMING = 'streaming',
  INATIVO = 'inativo',
  PRODUCAO = 'producao',
  POSPRODUCAO = 'pos-producao',
  EMBREVE = 'em-breve',
  STREAMINGEMBREVE = 'streaming-em-breve'
}

const statusCorrecoes: Record<Status, string> = {
  [Status.LANCAMENTO]: 'Lançamento',
  [Status.STREAMING]: 'Streaming',
  [Status.INATIVO]: 'Inativo',
  [Status.PRODUCAO]: 'Produção',
  [Status.POSPRODUCAO]: 'Pós-Produção',
  [Status.EMBREVE]: 'Em Breve nos Cinemas',
  [Status.STREAMINGEMBREVE]: 'Em breve em Streaming'
}

const parseStatus = (status: string | undefined): Status | undefined => {
  if (!status) return undefined

  const formattedStatus = status
    .replace(/-/g, '')
    .toUpperCase() as keyof typeof Status
  return Status[formattedStatus] || undefined
}

const formatDateToYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const useFilmeStatus = (
  status: string | undefined,
  data: IFilmeResponse
): string => {
  return useMemo(() => {
    const parsedStatus = parseStatus(status)
    if (!parsedStatus || !statusCorrecoes[parsedStatus]) return ''

    const statusCorrigido = statusCorrecoes[parsedStatus]

    const today = new Date()

    const releaseDate = new Date(data.releasedate)
    const dia = String(releaseDate.getDate()).padStart(2, '0')
    const mes = String(releaseDate.getMonth() + 1).padStart(2, '0')

    if (
      (formatDateToYYYYMMDD(today) === data.releasedate &&
        data.streaming.length === 0) ||
      data.hasSession
    ) {
      return 'Hoje nos Cinemas'
    }

    if (
      formatDateToYYYYMMDD(today) === data.releasedate &&
      data.streaming.length > 0
    ) {
      return `Hoje na ${data.streaming[0].platform}`
    }

    if (statusCorrigido === 'Lançamento' && data.streaming.length === 0) {
      return `${Number(dia) + 1}/${mes} nos cinemas`
    }

    if (data.streaming.length > 0 && statusCorrigido === 'Lançamento') {
      return `${Number(dia)}/${mes} na ${data.streaming[0].platform}`
    }

    return statusCorrigido
  }, [status, data])
}
