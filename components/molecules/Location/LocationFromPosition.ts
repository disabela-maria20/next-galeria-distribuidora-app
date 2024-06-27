import { LocationData } from '@/utils/server/types'

export async function requestLocationPermission(): Promise<LocationData> {
  try {
    const permissionStatus = await navigator.permissions.query({
      name: 'geolocation'
    })

    if (
      permissionStatus.state === 'granted' ||
      permissionStatus.state === 'prompt'
    ) {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject)
        }
      )
      return getLocationFromPosition(position)
    } else {
      return {
        latitude: 0,
        longitude: 0
      }
    }
  } catch (error) {
    console.error('Error requesting permission:', error)
    return {
      latitude: 0,
      longitude: 0
    }
  }
}

function getLocationFromPosition(position: GeolocationPosition): LocationData {
  const { coords } = position
  return {
    latitude: coords.latitude,
    longitude: coords.longitude
  }
}
