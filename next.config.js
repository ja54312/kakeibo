/** @type {import('next').NextConfig} */
//images.path ruta donde se guardaran los archivos ,para produccion cambiar la url de la ubicacion de la url
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: 'imgix',
    path: 'http://localhost:3000/',
  },
}

module.exports = nextConfig
