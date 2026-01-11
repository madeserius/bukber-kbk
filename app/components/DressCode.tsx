'use client'

import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'

export default function DressCode() {
  return (
    <section className="section-spacing relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        {/* Title with icon */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <Icon icon="mdi:hanger" className="text-gold text-3xl" />
          <h2 className="text-brown font-serif font-bold text-2xl">
            Dress Code
          </h2>
          <Icon icon="mdi:hanger" className="text-gold text-3xl" />
        </div>

        {/* Vintage scroll background */}
        <div className="bg-gradient-to-b from-gold/20 to-brown/10 border-4 border-double border-gold rounded-2xl p-8 relative">
          {/* Corner decorations */}
          <div className="absolute top-3 left-3 w-6 h-6">
            <div className="w-full h-0.5 bg-gold"></div>
            <div className="w-0.5 h-full bg-gold"></div>
          </div>
          <div className="absolute top-3 right-3 w-6 h-6">
            <div className="w-full h-0.5 bg-gold ml-auto"></div>
            <div className="w-0.5 h-full bg-gold ml-auto"></div>
          </div>
          <div className="absolute bottom-3 left-3 w-6 h-6">
            <div className="w-0.5 h-full bg-gold mt-auto"></div>
            <div className="w-full h-0.5 bg-gold mt-auto"></div>
          </div>
          <div className="absolute bottom-3 right-3 w-6 h-6">
            <div className="w-0.5 h-full bg-gold ml-auto mt-auto"></div>
            <div className="w-full h-0.5 bg-gold ml-auto mt-auto"></div>
          </div>

          <h3 className="text-gold font-serif font-bold text-3xl mb-4 italic">
            Timeless 70's Vibes
          </h3>

          <p className="text-brown text-base leading-relaxed">
            Mari ramaikan acara dengan tampilan vintage era 70-an!
            Lihat referensi style di bawah untuk inspirasi.
          </p>
        </div>

        {/* Dancing decoration */}
        <motion.div
          className="mt-6 opacity-20"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon icon="mdi:sunglasses" className="text-brown text-4xl mx-auto" />
        </motion.div>
      </motion.div>
    </section>
  )
}
