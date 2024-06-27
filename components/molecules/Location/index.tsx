'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'

import Style from './Location.module.scss'

import { apiLocation } from './apiLocation'
import { requestLocationPermission } from './LocationFromPosition'

import Cookies from 'js-cookie'

interface LocationData {
  latitude: number
  longitude: number
}

const Location = () => {
  const [showModal, setShowModal] = useState<boolean>(false)

  useEffect(() => {
    const lastModalViewed = Cookies.get('lastModalViewed')
    const now = new Date().getTime()
    const SEVEN_DAYS_IN_MS = 7 * 24 * 60 * 20 * 1000

    if (lastModalViewed) {
      const lastViewedTimestamp = new Date(lastModalViewed).getTime()
      if (now - lastViewedTimestamp >= SEVEN_DAYS_IN_MS) {
        setShowModal(true)
      }
    } else {
      setShowModal(true)
    }
  }, [])

  const cacheTimer = async (res: LocationData) => {
    Cookies.set('geolocation', JSON.stringify(res), { expires: 7 })
    Cookies.set('lastModalViewed', new Date().toString(), { expires: 7 })
  }

  const handleGetLocation = async (isState: boolean) => {
    if (isState) {
      setShowModal(false)
      const localtion: LocationData = await requestLocationPermission()

      if (localtion) {
        cacheTimer(localtion)
        const geo = await apiLocation(localtion)
        Cookies.set('localtion', geo, { expires: 7 })
        Cookies.set('city', geo.address.city, { expires: 7 })
      }
    }
    setShowModal(false)
  }

  return (
    <>
      {showModal && (
        <div className={Style.locationBg}>
          <section className={Style.localtionCokies}>
            <div className="container" onClick={() => setShowModal(false)}>
              <div
                className={Style.locationModal}
                onClick={(e) => e.stopPropagation()}
              >
                <p>
                  Este site utiliza cookies para melhorar a sua experiência de
                  navegação. Ao continuar, você concorda com o uso de cookies,
                  conforme detalhado em nossa
                  <Link href="/politica-de-privacidade">
                    Política de Privacidade
                  </Link>
                  e concede autorização para o uso de geolocalização de acordo
                  com nossos termos. Para mais informações ou para ajustar suas
                  configurações, por favor, consulte nossa política de
                  privacidade.
                </p>
                <div className={Style.modalButton}>
                  <button onClick={() => handleGetLocation(true)}>Sim</button>
                  <button onClick={() => handleGetLocation(false)}>Não</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  )
}

export default Location
