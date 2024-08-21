/* eslint-disable prettier/prettier */
import { GoogleTagManager } from '@next/third-parties/google'
import type { Metadata } from 'next'
import '@/styles/sass/globals.scss'
import { Montserrat } from 'next/font/google'
import Script from 'next/script'

import { Footer, Location } from '@/components/molecules'
import { LocationProvider } from '@/components/molecules/Location/LocationContext'
import { Header } from '@/components/organisms'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Home | Galeria Distribuidora',
  description: "Descubra os filmes mais recentes distribuídos pela Galeria Distribuidora Brasil. Confira os trailers, sinopses e datas de lançamento.",
  robots: 'index, follow',
  openGraph: {
    title: 'Home | Galeria Distribuidora',
    description: "Descubra os filmes mais recentes distribuídos pela Galeria Distribuidora Brasil. Confira os trailers, sinopses e datas de lançamento.",
    images: [{
      url: '/img/share.png',
      width: 800,
      height: 600
    }],
    type: 'website'
  },
  alternates: {
    canonical: 'http://galeriadistribuidora.com.br'
  },
  category: 'Filmes',

}
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={montserrat.className}>
        <Header>
          <Script dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-N2FX74VX');

          `}} />
        </Header>
        <LocationProvider>
          {children}
        </LocationProvider>
        <Location />
        <Footer />
      </body>
      <Script src='https://www.youtube.com/iframe_api'></Script>
      <GoogleTagManager gtmId="GTM-N2FX74VX" />
      {/* <GoogleAnalytics gaId="G-DRBHT7HM35" /> */}
    </html>
  )
}
