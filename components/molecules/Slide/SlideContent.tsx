import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { SwiperOptions } from 'swiper/types'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/scrollbar'

interface CustomSwiperProps {
  swiperOptions: SwiperOptions
  children: React.ReactNode
  className?: string
}

const SlideContent: React.FC<CustomSwiperProps> = ({
  children,
  swiperOptions,
  className
}) => {
  return (
    <Swiper {...swiperOptions} className={className}>
      {React.Children.map(children, (child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SlideContent
