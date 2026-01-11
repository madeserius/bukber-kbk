'use client'

import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import Image from 'next/image'

export default function Budget() {
  const sponsors = [
    { name: 'Gokana', image: '/gokana.png', icon: 'mdi:food' },
    { name: 'Takjil', image: '/gorengan.jpeg', icon: 'mdi:food-variant' },
    { name: 'Minuman', image: '/esteh.jpeg', icon: 'mdi:cup' },
    { name: 'Gift', image: '/kado.jpeg', icon: 'mdi:gift' },
  ]

  return (
    <section className="section-spacing relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Budget */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon icon="mdi:cash-multiple" className="text-gold text-3xl" />
            <h2 className="text-brown font-serif font-bold text-2xl">Budget</h2>
          </div>

          <div className="bg-gold/20 border-2 border-gold rounded-xl py-4 px-8 inline-block">
            <p className="text-brown font-bold text-3xl font-serif">
              Rp 65.000
            </p>
          </div>
        </div>

        {/* Support By */}
        <div className="text-center">
          <p className="text-brown text-sm tracking-wider uppercase mb-6">
            Support by
          </p>

          {/* Polaroid-style sponsor grid */}
          <div className="grid grid-cols-2 gap-4">
            {sponsors.map((sponsor, index) => (
              <motion.div
                key={sponsor.name}
                initial={{ opacity: 0, rotate: -5 }}
                whileInView={{ opacity: 1, rotate: index % 2 === 0 ? 2 : -2 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, rotate: 0 }}
                className="bg-white p-4 shadow-lg cursor-pointer"
              >
                {/* Polaroid image area */}
                <div className="bg-brown/10 aspect-square rounded-lg flex items-center justify-center mb-3 overflow-hidden relative">
                  {sponsor.image ? (
                    <Image
                      src={sponsor.image}
                      alt={sponsor.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 480px) 50vw, 200px"
                    />
                  ) : (
                    <Icon icon={sponsor.icon} className="text-gold text-5xl" />
                  )}
                </div>

                {/* Polaroid caption */}
                <p className="text-brown font-serif text-sm text-center">
                  {sponsor.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
