/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from 'react'

import { apiLocation } from './apiLocation'
import { requestLocationPermission } from './LocationFromPosition'

import { LocationData } from '@/utils/server/types'

interface LocationContextType {
  location: LocationData
  loading: boolean
  error: Error | null
  refreshLocation: () => void
  locationArea: any
}

const LocationContext = createContext<LocationContextType>({
  location: {
    latitude: 0,
    longitude: 0
  },
  loading: false,
  error: null,
  refreshLocation: () => {},
  locationArea: {}
})

export const useLocationContext = () => useContext(LocationContext)

export const LocationProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [location, setLocation] = useState<LocationData>({
    latitude: 0,
    longitude: 0
  })
  const [locationArea, setlocationArea] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)

  const refreshLocation = async () => {
    setLoading(true)
    try {
      const loc = await requestLocationPermission()
      setLocation(loc)

      const res = await apiLocation(loc)
      setlocationArea(res)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshLocation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <LocationContext.Provider
      value={{
        location,
        loading,
        error,
        refreshLocation,
        locationArea
      }}
    >
      {children}
    </LocationContext.Provider>
  )
}
