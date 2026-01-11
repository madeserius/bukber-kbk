'use client'

import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'

export default function MeetingPointMap() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  // Replace with actual coordinates
  const location = {
    name: "Adit's House",
    address: "Jl. Tlk. Angsan Permai No.340, RT.005/RW.012, Bekasi Jaya, Kec. Bekasi Tim., Kota Bks, Jawa Barat 17112",
    lat: -6.2284377,
    lng: 107.0218633
  }

  const handleDirections = () => {
    const directionsUrl = `https://www.google.com/maps/dir//${location.lat},${location.lng}`
    window.open(directionsUrl, '_blank')
  }

  const openInMaps = () => {
    const mapsUrl = `https://www.google.com/maps/place/${location.lat},${location.lng}`
    window.open(mapsUrl, '_blank')
  }

  const openInGoogleMaps = () => {
    const googleMapsUrl = `https://www.google.com/maps?q=${location.lat},${location.lng}`
    window.open(googleMapsUrl, '_blank')
  }

  // Static map image URL using OpenStreetMap static API
  const staticMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${location.lng-0.01},${location.lat-0.01},${location.lng+0.01},${location.lat+0.01}&layer=mapnik&marker=${location.lat},${location.lng}`

  return (
    <section className="section-spacing text-center relative">
      {/* Ornamental corners */}
      <div className="ornamental-corner top-left" />
      <div className="ornamental-corner top-right" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="max-w-4xl mx-auto"
      >
        {/* Section Title */}
        <motion.div variants={fadeInUp} className="mb-8">
          <p className="text-brown text-xs tracking-[0.3em] uppercase mb-4">
            Meeting Point
          </p>
          <h2 className="text-gold font-serif font-bold text-3xl md:text-4xl mb-4">
            Lokasi Acara
          </h2>
          <p className="text-brown text-lg max-w-2xl mx-auto">
            Bergabunglah dengan kami di lokasi yang telah ditentukan. 
            Pastikan untuk sampai tepat waktu!
          </p>
        </motion.div>

        {/* Location Details */}
        <motion.div 
          variants={fadeInUp}
          className="bg-cream/90 backdrop-blur-sm border-2 border-gold/30 rounded-2xl p-6 mb-6 shadow-lg"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon icon="mdi:map-marker" className="text-gold text-3xl" />
            <div className="text-left">
              <h3 className="text-brown font-serif font-bold text-xl">
                {location.name}
              </h3>
              <p className="text-brown/80 text-sm">
                {location.address}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Map Container with OpenStreetMap Embed */}
        <motion.div 
          variants={fadeInUp}
          className="border-4 border-double border-gold rounded-2xl overflow-hidden shadow-xl mb-6 relative"
        >
          {/* Corner decorations */}
          <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-gold z-10"></div>
          <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-gold z-10"></div>
          <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-gold z-10"></div>
          <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-gold z-10"></div>

          <div className="aspect-video w-full">
            <iframe
              src={staticMapUrl}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              title={`Map showing location of ${location.name}`}
              className="sepia-[0.2] contrast-[1.05] brightness-[0.98]"
            />
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          variants={fadeInUp}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={handleDirections}
            className="vintage-button text-cream font-semibold py-3 px-6 rounded-lg flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <Icon icon="mdi:directions" className="text-lg" />
            Petunjuk Arah
          </button>
          
          <button
            onClick={openInGoogleMaps}
            className="bg-transparent border-2 border-gold text-gold font-semibold py-3 px-6 rounded-lg flex items-center gap-2 hover:bg-gold hover:text-cream transition-all hover:scale-105"
          >
            <Icon icon="mdi:google-maps" className="text-lg" />
            Buka di Maps
          </button>
        </motion.div>

        {/* Manual Location Info as backup */}
        <motion.div 
          variants={fadeInUp}
          className="mt-6 p-4 bg-gold/10 rounded-lg border border-gold/30"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Icon icon="mdi:map-outline" className="text-gold text-lg" />
            <p className="text-brown font-semibold">Koordinat Lokasi</p>
          </div>
          <p className="text-brown/80 text-sm">
            Latitude: {location.lat} | Longitude: {location.lng}
          </p>
          <p className="text-brown/70 text-xs mt-1">
            Salin koordinat ini ke aplikasi peta favorit Anda
          </p>
        </motion.div>

        {/* Additional Info */}
        {/* <motion.div 
          variants={fadeInUp}
          className="mt-4 p-4 bg-brown/10 rounded-lg border border-brown/20"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Icon icon="mdi:information-outline" className="text-brown text-lg" />
            <p className="text-brown font-semibold">Info Tambahan</p>
          </div>
          <p className="text-brown/80 text-sm">
            Parkir tersedia di area sekitar. Mohon datang 15 menit sebelum acara dimulai.
          </p>
        </motion.div> */}
      </motion.div>

      {/* Bottom ornamental corners */}
      <div className="ornamental-corner bottom-left" />
      <div className="ornamental-corner bottom-right" />
    </section>
  )
}