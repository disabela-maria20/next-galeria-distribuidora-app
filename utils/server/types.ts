export interface IFilmeProps {
  movie: IFilmeResponse
  sessions: Sessions
}
export interface IFilmeResponse extends IFilmeProps {
  id: number
  title: string
  slug: string
  originalTitle: string
  countryOrigin: string
  contentRating: string
  banner_logo: string
  duration: number
  synopsis: string
  shortSynopsis: string
  cast: string
  director: string
  genre_id: number
  genre: string
  age: string
  ageExplain: string
  releasedate: string
  premiereDate: string
  partnerCode: string
  status: string
  cover: string
  bannerMobile: string
  bannerDesktop: string
  color: string
  trailer: string
  socialCampaign: string
  videos: IFilmeResponseUrl[]
  images: IFilmeResponseUrl[]
  streaming: string[]
  created_at: string
  hasSession: boolean
  idVibezzMovie: string
}

export interface IFilmeResponseUrl {
  url: string
}

export interface IFilmesEstadosResponse {
  estados: IFilmesEstado[]
}
export interface IFilmesEstado {
  CIDADE: string
  ESTADO: string
}
export interface SessionsArrayResponse {
  sessions: SessionsResponse[]
}
export interface SessionsResponse {
  date: string
  sessions: Sessions
}
export interface Sessions {
  distance: number
  sessionHour: string
  theaterName: string
  link?: string
  technology: string
  isImax: boolean
  postalCode: string
  address: string
  lat: string
  lng: string
  addressComplement?: string
  number?: string
  hours: SessionHours[]
  hour: string
  state: string
  city: string
  stateName: string
}

export interface SessionHours {
  hour: string
  links: string
}

interface EstadosBrasileiros {
  [sigla: string]: string
}

export interface LocationData {
  latitude: number
  longitude: number
}

export const ESTADOS: EstadosBrasileiros = {
  AC: 'Acre',
  AL: 'Alagoas',
  AP: 'Amapá',
  AM: 'Amazonas',
  BA: 'Bahia',
  CE: 'Ceará',
  DF: 'Distrito Federal',
  ES: 'Espírito Santo',
  GO: 'Goiás',
  MA: 'Maranhão',
  MT: 'Mato Grosso',
  MS: 'Mato Grosso do Sul',
  MG: 'Minas Gerais',
  PA: 'Pará',
  PB: 'Paraíba',
  PR: 'Paraná',
  PE: 'Pernambuco',
  PI: 'Piauí',
  RJ: 'Rio de Janeiro',
  RN: 'Rio Grande do Norte',
  RS: 'Rio Grande do Sul',
  RO: 'Rondônia',
  RR: 'Roraima',
  SC: 'Santa Catarina',
  SP: 'São Paulo',
  SE: 'Sergipe',
  TO: 'Tocantins'
}

export interface Location {
  state: string
  cities: string[]
}
