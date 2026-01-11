'use client'

import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'

export default function WelcomeMessage() {
  return (
    <section className="section-spacing relative">
      {/* Vintage paper background with border */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-brown/5 border-2 border-gold rounded-xl p-8 relative"
      >
        {/* Ornamental corners */}
        <div className="absolute top-1 left-1 w-6 h-6 border-t border-l border-gold"></div>
        <div className="absolute top-1 right-1 w-6 h-6 border-t border-r border-gold"></div>
        <div className="absolute bottom-1 left-1 w-6 h-6 border-b border-l border-gold"></div>
        <div className="absolute bottom-1 right-1 w-6 h-6 border-b border-r border-gold"></div>

        {/* Quill pen icon */}
        <div className="flex justify-center mb-6">
          <Icon icon="mdi:feather" className="text-gold text-4xl opacity-60" />
        </div>

        {/* Message text */}
        <div className="space-y-4 text-brown text-center font-serif leading-relaxed">
          <p className="text-base">
            Dalam rangka mempererat silaturahmi di bulan Ramadhan, dan alhamdulillah
            dari tahun ke tahun masih selalu dipertemukan dengan teman-teman semua✨
          </p>

          <p className="text-base">
            Untuk tahun ini kami mengundang teman-teman untuk hadir dalam acara{' '}
            <span className="font-bold text-gold">Buka Puasa Bersama.</span>
          </p>
        </div>

        {/* Decorative divider */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold"></div>
          <Icon icon="solar:star-bold" className="text-gold text-sm" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold"></div>
        </div>
      </motion.div>
    </section>
  )
}
