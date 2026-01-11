'use client'

import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'

export default function Activities() {
  const activities = [
    {
      icon: 'mdi:food',
      title: 'Buka Puasa Bersama',
      description: 'Menikmati hidangan iftar bersama-sama'
    },
    {
      icon: 'mdi:gift',
      title: 'Tukar Kado',
      description: 'Max: Rp 30.000 dengan dibungkus koran (*tidak boleh sejenis makanan/minuman) ',
      highlight: true
    },
    {
      icon: 'mdi:controller-classic',
      title: 'Fun Games',
      description: 'Permainan seru untuk semua'
    },
    {
      icon: 'mdi:trophy',
      title: 'Best Costume',
      description: 'Untuk teman-teman yang menarik perhatian'
    },
  ]

  return (
    <section className="section-spacing relative">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-brown font-serif font-bold text-2xl mb-2">
            Aktivitas
          </h2>
          <div className="h-0.5 w-24 mx-auto bg-gradient-to-r from-transparent via-gold to-transparent"></div>
        </div>

        {/* Activities list */}
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`
                bg-brown/5 border-2 rounded-xl p-5 flex items-start gap-4
                ${activity.highlight ? 'border-gold bg-gold/10' : 'border-brown/30'}
              `}
            >
              {/* Icon */}
              <div className={`
                flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center
                ${activity.highlight ? 'bg-gold/30' : 'bg-brown/20'}
              `}>
                <Icon
                  icon={activity.icon}
                  className={`text-2xl ${activity.highlight ? 'text-gold' : 'text-brown'}`}
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className={`
                  font-serif font-bold text-lg mb-1
                  ${activity.highlight ? 'text-gold' : 'text-brown'}
                `}>
                  {activity.title}
                </h3>
                <p className="text-brown text-sm leading-relaxed">
                  {activity.description}
                </p>
              </div>

              {/* Bullet decoration */}
              <div className={`
                flex-shrink-0 w-2 h-2 rounded-full mt-2
                ${activity.highlight ? 'bg-gold' : 'bg-brown/40'}
              `}></div>
            </motion.div>
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="mt-8 flex justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <Icon icon="solar:star-bold" className="text-gold text-2xl opacity-40" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
