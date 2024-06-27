import axios from 'axios'
// Configuração global do token para todas as solicitações Axios
axios.defaults.baseURL = process.env.API_URL
axios.defaults.headers.common['token'] = process.env.API_TOKEM

export async function getCatalogoFilme(slug: string) {
  try {
    const res = await axios.get(`/movie/get/${slug}`)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

export async function getHome() {
  try {
    const res = await axios.get(`/movie/list-all`)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

export async function getHomeBanner() {
  const res = await axios.get(`banner-home`)
  return res.data
}

export async function getSession(slug: string, city: string) {
  const res = await axios.get(`session/get/${slug}?city=${city}`)
  return res.data
}

export async function getLocation(slug: string) {
  const res = await axios.get(`session/location/${slug}`)
  return res.data
}

export async function postNewsletter(
  name: string,
  email: string,
  phone: string,
  url: string
) {
  return axios.post(
    `/save/optin?name=${name}&email=${email}&phone=${phone}&url=${url}`,
    {
      name: name,
      email: email,
      phone: phone,
      url: url
    }
  )
}
export async function postContact(
  name: string,
  email: string,
  phone: string,
  message: string
) {
  return axios.post(
    `/save/optin?name=${name}&email=${email}&phone=${phone}&message=${message}`,
    {
      name: name,
      email: email,
      phone: phone,
      message: message
    }
  )
}
