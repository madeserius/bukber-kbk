'use client'

import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useState, useEffect } from 'react'

export default function RSVPForm() {
  const [guestName, setGuestName] = useState('')
  const [formData, setFormData] = useState({
    nama: '',
    kehadiran: '',
    jumlah: null, // Changed from 1 to empty string
    catatan: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    // Get guest name from sessionStorage
    const storedName = sessionStorage.getItem('guestName') || ''
    setGuestName(storedName)
    setFormData(prev => ({ ...prev, nama: storedName }))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Smart endpoint detection: use Next.js API in dev, Netlify Function in production
      const endpoint = process.env.NODE_ENV === 'development'
        ? '/api/rsvp'
        : '/.netlify/functions/rsvp'

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nama: formData.nama,
          kehadiran: formData.kehadiran,
          jumlah: formData.kehadiran === 'hadir' ? formData.jumlah : 0,
          catatan: formData.catatan
        })
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        // Reset form after success (except nama)
        setTimeout(() => {
          setFormData(prev => ({
            nama: prev.nama, // Keep the name
            kehadiran: '',
            jumlah: null, // Changed from empty string to null
            catatan: ''
          }))
          setSubmitStatus('idle')
        }, 3000)
      } else {
        console.error('API Error:', result.error)
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting RSVP:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'jumlah' ? parseInt(value) || null : value
    }))
  }

  return (
    <section className="section-spacing relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Icon icon="mdi:email-edit-outline" className="text-gold text-3xl" />
            <h2 className="text-brown font-serif font-bold text-2xl">
              Konfirmasi Kehadiran
            </h2>
          </div>
          <div className="h-0.5 w-32 mx-auto bg-gradient-to-r from-transparent via-gold to-transparent mb-4"></div>
          <p className="text-brown text-sm">
            Mohon konfirmasi kehadiran Anda
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nama */}
          <div>
            <label className="flex items-center gap-2 text-brown font-semibold mb-2 text-sm">
              <Icon icon="mdi:account" className="text-gold" />
              Nama
            </label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-brown/30 rounded-lg focus:border-gold focus:outline-none bg-white text-brown transition-colors"
              placeholder="Masukkan nama Anda"
            />
          </div>

          {/* Kehadiran */}
          <div>
            <label className="flex items-center gap-2 text-brown font-semibold mb-3 text-sm">
              <Icon icon="mdi:calendar-check" className="text-gold" />
              Kehadiran
            </label>
            <div className="flex gap-4">
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  name="kehadiran"
                  value="hadir"
                  checked={formData.kehadiran === 'hadir'}
                  onChange={handleChange}
                  required
                  className="sr-only"
                />
                <div className={`
                  border-2 rounded-lg px-4 py-3 text-center transition-all
                  ${formData.kehadiran === 'hadir'
                    ? 'border-gold bg-gold/20 text-brown font-bold'
                    : 'border-brown/30 bg-white text-brown hover:border-gold/50'
                  }
                `}>
                  <Icon icon="mdi:check-circle" className="text-2xl mx-auto mb-1" />
                  <span className="text-sm">Hadir</span>
                </div>
              </label>

              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  name="kehadiran"
                  value="tidak-hadir"
                  checked={formData.kehadiran === 'tidak-hadir'}
                  onChange={handleChange}
                  required
                  className="sr-only"
                />
                <div className={`
                  border-2 rounded-lg px-4 py-3 text-center transition-all
                  ${formData.kehadiran === 'tidak-hadir'
                    ? 'border-gold bg-gold/20 text-brown font-bold'
                    : 'border-brown/30 bg-white text-brown hover:border-gold/50'
                  }
                `}>
                  <Icon icon="mdi:close-circle" className="text-2xl mx-auto mb-1" />
                  <span className="text-sm">Tidak Hadir</span>
                </div>
              </label>
            </div>
          </div>

          {/* Jumlah Orang - only show if attending */}
          {formData.kehadiran === 'hadir' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <label className="flex items-center gap-2 text-brown font-semibold mb-2 text-sm">
                <Icon icon="mdi:account-multiple" className="text-gold" />
                Jumlah Orang
              </label>
              <input
                type="string"
                name="jumlah"
                value={formData.jumlah || ''}
                onChange={handleChange}
                min="1"
                max="10"
              required
                className="w-full px-4 py-3 border-2 border-brown/30 rounded-lg focus:border-gold focus:outline-none bg-white text-brown transition-colors"
              />
            </motion.div>
          )}

          {/* Catatan */}
          <div>
            <label className="flex items-center gap-2 text-brown font-semibold mb-2 text-sm">
              <Icon icon="mdi:message-text" className="text-gold" />
              Catatan Khusus
              <span className="text-xs font-normal text-brown/60">(opsional)</span>
            </label>
            <textarea
              name="catatan"
              value={formData.catatan}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border-2 border-brown/30 rounded-lg focus:border-gold focus:outline-none bg-white text-brown transition-colors resize-none"
              placeholder="Alergi makanan, kebutuhan khusus, dll."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || submitStatus === 'success'}
            className={`
              w-full vintage-button text-white font-semibold py-4 rounded-lg
              flex items-center justify-center gap-3 transition-all
              ${isSubmitting || submitStatus === 'success' ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {isSubmitting ? (
              <>
                <Icon icon="mdi:loading" className="text-xl animate-spin" />
                <span>Mengirim...</span>
              </>
            ) : submitStatus === 'success' ? (
              <>
                <Icon icon="mdi:check-circle" className="text-xl" />
                <span>Terkirim!</span>
              </>
            ) : (
              <>
                <Icon icon="lucide:send" className="text-xl" />
                <span>Kirim Konfirmasi</span>
              </>
            )}
          </button>

          {/* Error message */}
          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-100 border-2 border-red-300 text-red-700 px-4 py-3 rounded-lg text-center text-sm"
            >
              <Icon icon="mdi:alert-circle" className="inline text-xl mr-2" />
              Terjadi kesalahan. Silakan coba lagi.
            </motion.div>
          )}
        </form>
      </motion.div>
    </section>
  )
}
