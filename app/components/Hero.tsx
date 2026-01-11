'use client'

import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'

export default function Hero() {
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
      >
        {/* Small title */}
        <motion.p
          variants={fadeInUp}
          className="text-brown text-xs tracking-[0.3em] uppercase mb-6"
        >
          Iftar Invitation
        </motion.p>

        {/* Ornamental frame */}
        <motion.div
          variants={fadeInUp}
          className="border-4 border-double border-gold rounded-2xl p-8 mb-8 relative"
        >
          {/* Corner decorations */}
          <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-gold"></div>
          <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-gold"></div>
          <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-gold"></div>
          <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-gold"></div>

          <h1 className="text-gold font-serif font-bold text-4xl md:text-4xl mb-2">
          A Touch Of 70's Vibes
          </h1>
          <p className="text-brown text-lg mt-6">For : KBK</p>

          {/* Vintage scroll tagline */}
          {/* <div className="bg-brown/10 border-2 border-brown rounded-lg py-3 px-6 inline-block">
            <p className="text-brown font-serif italic text-lg">
              A Touch Of 70's Vibes
            </p>
          </div> */}
        </motion.div>

        {/* Date, Time, Location */}
        <motion.div variants={fadeInUp} className="space-y-4">
          {/* Date */}
          <div className="flex items-center justify-center gap-3">
            <Icon icon="mdi:calendar-blank" className="text-gold text-2xl" />
            <p className="text-brown font-serif font-bold text-2xl">
              FEBRUARY 28, 2026
            </p>
          </div>

          {/* Time */}
          <div className="flex items-center justify-center gap-3">
            <Icon icon="mdi:clock-outline" className="text-gold text-2xl" />
            <p className="text-brown text-xl font-semibold">
              16.30 WIB
            </p>
          </div>

          {/* Location */}
          <div className="flex items-center justify-center gap-3">
            <Icon icon="mdi:map-marker" className="text-gold text-2xl" />
            <p className="text-brown text-xl font-semibold">
              Adit's House
            </p>
          </div>
        </motion.div>

        {/* Dancing figures */}
        <motion.div
          variants={fadeInUp}
          className="mt-8 opacity-30"
          animate={{ rotate: [-1, 1, -1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon icon="mdi:house" className="text-brown text-6xl mx-auto" />
        </motion.div>
      </motion.div>
    </section>
  )
}
