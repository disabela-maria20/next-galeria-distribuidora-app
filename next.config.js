/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */

const path = require('path')
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles', 'sass')],
    prependData: `@import 'abstracts/_index.scss';`
  },
  env: {
    API_TOKEM: process.env.API_TOKEN,
    API_URL: process.env.API_URL
  },
  compiler: {
    styledComponents: true,
    removeConsole: false
  },
  output: 'export',
  async redirects() {
    return [
      {
        source: '/guerra-civil',
        destination: '/guerracivil',
        permanent: false
      }
    ]
  }
  // distDir: 'build',
  // trailingSlash: true
}

module.exports = nextConfig
