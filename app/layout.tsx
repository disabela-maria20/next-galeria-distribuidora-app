/* eslint-disable prettier/prettier */
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
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
  twitter: {
    title: 'Home | Galeria Distribuidora',
    description: "Descubra os filmes mais recentes distribuídos pela Galeria Distribuidora Brasil. Confira os trailers, sinopses e datas de lançamento.",
    site: 'https://diamondfilms.com.br/',
    images: '/img/share.png'
  },
  alternates: {
    canonical: 'http://diamondfilms.com.br'
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
            __html: `(function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:3920910,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}} />
        </Header>
        <LocationProvider>
          {children}
        </LocationProvider>
        <Location />
        <Footer />
      </body>
      <Script src='https://www.youtube.com/iframe_api'></Script>
      <GoogleTagManager gtmId="GTM-ND454GP5" />
      <GoogleAnalytics gaId="G-DRBHT7HM35" />
    </html>
  )
}
