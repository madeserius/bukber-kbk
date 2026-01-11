'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useState, useEffect, Suspense } from 'react'

function WelcomeContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const guestName = searchParams.get('to') || 'Tamu Undangan'
  const [mounted, setMounted] = useState(false)

  // Event date: February 28, 2026, 16:30 WIB
  const eventDate = new Date('2026-02-28T16:30:00+07:00')

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    setMounted(true)

    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = eventDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleOpenInvitation = () => {
    // Store guest name for RSVP form
    sessionStorage.setItem('guestName', guestName)

    // Mark invitation as opened (show music controls)
    sessionStorage.setItem('invitationOpened', 'true')
    window.dispatchEvent(new Event('invitationOpened'))

    // Trigger music play after user interaction
    window.dispatchEvent(new Event('playMusic'))

    // Small delay to ensure music starts playing
    setTimeout(() => {
      router.push('/invitation')
    }, 100)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 1.5, duration: 0.5, ease: 'backOut' }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  }

  if (!mounted) return null

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="welcome-content min-h-screen flex flex-col justify-center items-center relative px-6 py-12"
    >
      {/* Ornamental corners */}
      <div className="ornamental-corner top-left" />
      <div className="ornamental-corner top-right" />
      <div className="ornamental-corner bottom-left" />
      <div className="ornamental-corner bottom-right" />

      {/* Top Section */}
      <motion.div variants={itemVariants} className="text-center mb-8">
        <p className="text-brown text-sm tracking-widest uppercase mb-4">
          Iftar Invitation
        </p>

        {/* Decorative divider with moon & stars */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold" />
          <Icon icon="mdi:moon-waxing-crescent" className="text-gold text-xl" />
          <Icon icon="solar:star-bold" className="text-gold text-sm" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold" />
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div variants={itemVariants} className="text-center mb-8">
        <p className="text-brown text-base mb-3 font-serif italic">
          Kepada Yth.
        </p>

        <h1 className="text-gold font-serif font-bold text-4xl md:text-5xl mb-4 leading-tight">
          {guestName}
        </h1>

        <div className="h-0.5 w-32 mx-auto bg-gradient-to-r from-transparent via-gold to-transparent mb-6" />
      </motion.div>

      {/* Message */}
      <motion.div variants={itemVariants} className="text-center mb-12 max-w-sm">
        <p className="text-brown text-sm leading-relaxed italic font-serif mb-2">
          Tanpa mengurangi rasa hormat,
        </p>
        <p className="text-brown text-sm leading-relaxed italic font-serif mb-2">
          kami mengundang Anda untuk hadir dalam acara
        </p>
        <p className="text-gold font-serif font-semibold text-xl mt-4">
          Buka Puasa Bersama
        </p>
      </motion.div>

      {/* Countdown Timer */}
      <motion.div variants={itemVariants} className="mb-12">
        <div className="flex items-center gap-2 mb-4 justify-center">
          <Icon icon="mdi:timer-sand" className="text-brown text-2xl" />
          <p className="text-brown text-xs tracking-wider uppercase">Hitung Mundur</p>
        </div>

        <div className="flex gap-4 justify-center">
          {/* Days */}
          <div className="text-center">
            <div className="bg-brown/10 border-2 border-gold rounded-lg px-4 py-3 min-w-[70px]">
              <p className="text-gold font-bold text-2xl font-serif">
                {String(timeLeft.days).padStart(2, '0')}
              </p>
            </div>
            <p className="text-brown text-xs mt-2 uppercase tracking-wide">Hari</p>
          </div>

          {/* Hours */}
          <div className="text-center">
            <div className="bg-brown/10 border-2 border-gold rounded-lg px-4 py-3 min-w-[70px]">
              <p className="text-gold font-bold text-2xl font-serif">
                {String(timeLeft.hours).padStart(2, '0')}
              </p>
            </div>
            <p className="text-brown text-xs mt-2 uppercase tracking-wide">Jam</p>
          </div>

          {/* Minutes */}
          <div className="text-center">
            <div className="bg-brown/10 border-2 border-gold rounded-lg px-4 py-3 min-w-[70px]">
              <p className="text-gold font-bold text-2xl font-serif">
                {String(timeLeft.minutes).padStart(2, '0')}
              </p>
            </div>
            <p className="text-brown text-xs mt-2 uppercase tracking-wide">Menit</p>
          </div>

          {/* Seconds */}
          <div className="text-center">
            <div className="bg-brown/10 border-2 border-gold rounded-lg px-4 py-3 min-w-[70px]">
              <p className="text-gold font-bold text-2xl font-serif">
                {String(timeLeft.seconds).padStart(2, '0')}
              </p>
            </div>
            <p className="text-brown text-xs mt-2 uppercase tracking-wide">Detik</p>
          </div>
        </div>
      </motion.div>

      {/* Dancing figures decoration */}
      <motion.div
        variants={itemVariants}
        className="mb-8 opacity-20"
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Icon icon="mdi:muslim" className="text-brown text-6xl" />
      </motion.div>

      {/* CTA Button */}
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={handleOpenInvitation}
        className="vintage-button text-white font-semibold px-8 py-4 rounded-full flex items-center gap-3 text-base shadow-lg"
      >
        <Icon icon="mdi:email-open-outline" className="text-2xl" />
        <span>Buka Undangan</span>
      </motion.button>

      {/* Quill pen decoration */}
      <motion.div
        variants={itemVariants}
        className="mt-12 opacity-30"
      >
        <Icon icon="mdi:feather" className="text-brown text-3xl" />
      </motion.div>
    </motion.div>
  )
}

export default function WelcomePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-brown">Loading...</div>
      </div>
    }>
      <WelcomeContent />
    </Suspense>
  )
}
