import { LocationData } from '@/utils/server/types'

export async function apiLocation({ latitude, longitude }: LocationData) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
    )
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    return data
  } catch (err) {
    console.error(err)
    throw err
  }
}
