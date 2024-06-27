import { useFormatarData } from '../useFormatarData/formatarData'

import { IFilmeResponse } from '@/utils/server/types'

const useFilmeTextStatus = () => {
  const {
    formatfaltaUmaSemanaParaDataMarcada
    // formatPassouUmaSemanaDesdeData,
    // formatDataEstreia
  } = useFormatarData()

  const statusTextData = (filmeLista: IFilmeResponse) => {
    if (
      filmeLista.hasSession &&
      formatfaltaUmaSemanaParaDataMarcada(filmeLista.releasedate)
    )
      return 'Em pré-venda'
    if (filmeLista.streaming.length > 0) return 'Em streaming'
    if (filmeLista.hasSession) return 'Hoje nos cinemas'
    if (
      filmeLista.hasSession == false &&
      new Date(filmeLista.releasedate) < new Date()
    )
      return ''
    return 'Em breve nos cinemas'
  }

  return statusTextData
}

export default useFilmeTextStatus
