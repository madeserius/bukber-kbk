'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
import { usePathname } from 'next/navigation'




export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)


  const pathname = usePathname()

  console.log('Current pathname:', pathname);
  
  
  

  

  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showControl, setShowControl] = useState(false) // Hidden by default

  useEffect(() => {
    // Check if user has clicked "Buka Undangan"
    const invitationOpened = sessionStorage.getItem('invitationOpened')
    if (invitationOpened === 'true') {
      setShowControl(true) // Show controls after invitation opened
    }

    // Listen for invitation opened event
    const handleInvitationOpened = () => {
      setShowControl(true)
      sessionStorage.setItem('invitationOpened', 'true')
    }

    window.addEventListener('invitationOpened', handleInvitationOpened)

    return () => {
      window.removeEventListener('invitationOpened', handleInvitationOpened)
    }
  }, [])

  useEffect(() => {
    // Try to auto-play when component mounts
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          audioRef.current.volume = 0.5 // Set volume to 50%
          await audioRef.current.play()
          setIsPlaying(true)
        } catch (error) {
          // Auto-play blocked by browser, user needs to interact
          console.log('Auto-play blocked, waiting for user interaction')
          setIsPlaying(false)
        }
      }
    }

    // Listen for custom event to play music after user interaction
    const handlePlayMusic = async () => {
      if (audioRef.current) {
        try {
          audioRef.current.volume = 0.5
          await audioRef.current.play()
          setIsPlaying(true)
        } catch (error) {
          console.log('Play error:', error)
        }
      }
    }

    // Add event listener for "playMusic" event
    window.addEventListener('playMusic', handlePlayMusic)

    // Delay to ensure component is mounted
    const timeout = setTimeout(playAudio, 500)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener('playMusic', handlePlayMusic)
    }
  }, [])

  const togglePlay = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        try {
          await audioRef.current.play()
          setIsPlaying(true)
        } catch (error) {
          console.log('Play error:', error)
        }
      }
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src="/song/Budi Doremi - Ramadhan Penuh Cinta (Offical Music Video).mp3" type="audio/mpeg" />
      </audio>

      {/* Floating music control */}
      {pathname === '/invitation' && (
        <AnimatePresence>
        {showControl && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="fixed bottom-4 left-4 z-50"
          >
            <div className="flex flex-col gap-1.5">
             
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlay}
                className="vintage-button text-white p-2.5 rounded-full shadow-lg relative overflow-hidden"
                aria-label={isPlaying ? 'Pause music' : 'Play music'}
              >
                
                {isPlaying && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-white"
                    animate={{
                      scale: [1, 1.3],
                      opacity: [0.5, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeOut'
                    }}
                  />
                )}

                <Icon
                  icon={isPlaying ? 'mdi:pause' : 'mdi:play'}
                  className="text-lg relative z-10"
                />
              </motion.button>

        
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMute}
                className="vintage-button text-white p-2 rounded-full shadow-lg"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                <Icon
                  icon={isMuted ? 'mdi:volume-off' : 'mdi:volume-high'}
                  className="text-base"
                />
              </motion.button>
            </div>

           
            {isPlaying && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="absolute left-full ml-3 top-0 bg-brown/90 text-white px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap"
              >
                <p className="text-xs font-serif">
                  🎵 Budi Doremi - Ramadhan Penuh Cinta
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      )}
    </>
  )
}
