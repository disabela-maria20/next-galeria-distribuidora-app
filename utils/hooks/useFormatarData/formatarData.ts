export const MESES: string[] = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
]

export const SEMANA: string[] = [
  'dom',
  'seg',
  'ter',
  'qua',
  'qui',
  'sex',
  'sab',
  'dom'
]

export const useFormatarData = () => {
  const dataSessao = (data: string) => {
    const partes = data.split('-')
    const ano = partes[0]
    const mes = partes[1]
    const dia = partes[2]

    return {
      ano: ano,
      mes: mes,
      dia: dia
    }
  }

  const formatarData = (data: string): string => {
    if (data == '0000-00-00') return ''

    const partesData = data?.split('-')
    const dia = partesData[2]
    const mes = MESES[parseInt(partesData[1], 10) - 1]
    const ano = partesData[0]

    return `${dia} de ${mes} de ${ano}`
  }

  const formatDia = (data: string): string => {
    const dia = dataSessao(data)
    return dia.dia
  }

  const formatMes = (text: string): string => {
    const mes = dataSessao(text)
    return MESES[Number(mes.mes) - 1]
  }

  const formatAno = (text: string) => {
    const data = new Date(text)
    const ano = data.getFullYear()

    return ano
  }

  const formatDiaDaSemana = (text: string) => {
    const data = new Date(text)
    const mes = data.getDay() + 1
    return SEMANA[mes]
  }

  function formatMesmaSemana(dataString: string): boolean {
    const data = new Date(dataString)
    const hoje = new Date()

    const semanaAtual = new Date(
      hoje.getFullYear(),
      hoje.getMonth(),
      hoje.getDate()
    )
    const semanaData = new Date(
      data.getFullYear(),
      data.getMonth(),
      data.getDate()
    )

    const numeroSemanaAtual = Math.ceil(
      (+semanaAtual - +new Date(semanaAtual.getFullYear(), 0, 1)) / 86400000 / 7
    )
    const numeroSemanaData = Math.ceil(
      (+semanaData - +new Date(semanaData.getFullYear(), 0, 1)) / 86400000 / 7
    )

    return numeroSemanaData === numeroSemanaAtual
  }

  function formatfaltaUmaSemanaParaDataMarcada(dataString: string): boolean {
    const dataMarcada: Date = new Date(dataString)
    const dataAtual: Date = new Date()

    // Zera as horas, minutos, segundos e milissegundos para comparar apenas as datas
    dataMarcada.setHours(0, 0, 0, 0)
    dataAtual.setHours(0, 0, 0, 0)

    // Calcula a diferença em milissegundos entre as datas
    const diffEmMilissegundos: number =
      dataMarcada.getTime() - dataAtual.getTime()

    // Converte milissegundos para dias
    const diffEmDias: number = Math.floor(
      diffEmMilissegundos / (1000 * 60 * 60 * 24)
    )

    return diffEmDias >= 0 && diffEmDias <= 7
  }

  function formatPassouUmaSemanaDesdeData(dataString: string): boolean {
    const data = new Date(dataString)
    const hoje = new Date()

    const umaSemanaDepois = new Date(data)
    umaSemanaDepois.setDate(umaSemanaDepois.getDate() + 7)

    return hoje >= umaSemanaDepois
  }

  function formatDataEstreia(dataString: string) {
    const dataAtual = new Date()
    const partesData = dataString.split('-')

    if (partesData.length !== 3) {
      return false
    }

    const ano = parseInt(partesData[0], 10)
    const mes = parseInt(partesData[1], 10) - 1
    const dia = parseInt(partesData[2], 10)

    const dataEstreia = new Date(ano, mes, dia)

    return (
      dataAtual.getDate() === dataEstreia.getDate() &&
      dataAtual.getMonth() === dataEstreia.getMonth() &&
      dataAtual.getFullYear() === dataEstreia.getFullYear()
    )
  }
  return {
    formatarData,
    formatDia,
    formatMes,
    formatAno,
    formatDiaDaSemana,
    formatMesmaSemana,
    formatfaltaUmaSemanaParaDataMarcada,
    formatPassouUmaSemanaDesdeData,
    formatDataEstreia
  }
}
