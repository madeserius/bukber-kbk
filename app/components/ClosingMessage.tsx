'use client'

import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'

export default function ClosingMessage() {
  return (
    <section className="section-spacing relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        {/* Ornamental corners */}
        <div className="ornamental-corner top-left" />
        <div className="ornamental-corner top-right" />
        <div className="ornamental-corner bottom-left" />
        <div className="ornamental-corner bottom-right" />

        {/* Quill pen icon */}
        <motion.div
          className="mb-6"
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon icon="mdi:feather" className="text-gold text-5xl mx-auto opacity-70" />
        </motion.div>

        {/* Message */}
        <div className="max-w-md mx-auto space-y-4">
          <p className="text-brown font-serif text-lg leading-relaxed italic">
            Besar harapan untuk semua hadir dalam buka bersama tahun ini.
          </p>

          <p className="text-gold font-serif font-bold text-xl">
            Terima Kasih
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 py-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold"></div>
            <Icon icon="solar:star-bold" className="text-gold text-lg" />
            <Icon icon="mdi:moon-waxing-crescent" className="text-gold text-xl" />
            <Icon icon="solar:star-bold" className="text-gold text-lg" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold"></div>
          </div>

          {/* Dancing figures */}
          <motion.div
            className="pt-4 opacity-30"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Icon icon="mdi:muslim" className="text-brown text-6xl mx-auto" />
          </motion.div>

          {/* Footer text */}
          <div className="pt-8 text-brown/60 text-xs">
            <p>KBK Bukber 2026</p>
            <p className="italic">A Touch of 70's Vibes</p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
