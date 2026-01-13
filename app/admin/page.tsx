'use client'

import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'

interface RSVP {
  id: string
  nama: string
  kehadiran: string
  jumlah: number
  catatan: string
  createdAt: string
}

interface RSVPStats {
  total: number
  hadir: number
  tidakHadir: number
  totalOrang: number
}

export default function AdminPage() {
  const [rsvps, setRsvps] = useState<RSVP[]>([])
  const [stats, setStats] = useState<RSVPStats>({ total: 0, hadir: 0, tidakHadir: 0, totalOrang: 0 })
  const [loading, setLoading] = useState(true)
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Simple password protection
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'admin123') { // Ganti dengan password yang aman
      setIsAuthenticated(true)
      fetchRSVPs()
    } else {
      alert('Password salah!')
    }
  }

  const fetchRSVPs = async () => {
    try {
      setLoading(true)
      const response = await fetch('/.netlify/functions/rsvp')
      const result = await response.json()
      
      if (result.success) {
        setRsvps(result.data)
        setStats(result.stats)
      }
    } catch (error) {
      console.error('Error fetching RSVPs:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
          <h1 className="text-2xl font-bold text-brown mb-6 text-center">Admin Login</h1>
          <div className="mb-4">
            <label className="block text-brown font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-gold"
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-gold text-white py-2 rounded-lg hover:bg-gold/80 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-brown">Admin Dashboard - RSVP</h1>
          <button 
            onClick={fetchRSVPs}
            className="flex items-center gap-2 bg-gold text-white px-4 py-2 rounded-lg hover:bg-gold/80 transition-colors"
          >
            <Icon icon="mdi:refresh" />
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Icon icon="mdi:account-group" className="text-3xl text-gold mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-brown">{stats.total}</h3>
            <p className="text-brown/60">Total RSVP</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Icon icon="mdi:check-circle" className="text-3xl text-green-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-brown">{stats.hadir}</h3>
            <p className="text-brown/60">Hadir</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Icon icon="mdi:close-circle" className="text-3xl text-red-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-brown">{stats.tidakHadir}</h3>
            <p className="text-brown/60">Tidak Hadir</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Icon icon="mdi:account-multiple" className="text-3xl text-blue-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-brown">{stats.totalOrang}</h3>
            <p className="text-brown/60">Total Orang</p>
          </div>
        </div>

        {/* RSVP List */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 bg-gold text-white">
            <h2 className="text-xl font-bold">Daftar RSVP</h2>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <Icon icon="mdi:loading" className="text-4xl text-gold animate-spin mx-auto mb-4" />
              <p>Loading data...</p>
            </div>
          ) : rsvps.length === 0 ? (
            <div className="p-8 text-center text-brown/60">
              <Icon icon="mdi:email-outline" className="text-4xl mx-auto mb-4" />
              <p>Belum ada RSVP yang masuk</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-brown/10">
                  <tr>
                    <th className="px-6 py-3 text-left text-brown font-semibold">Nama</th>
                    <th className="px-6 py-3 text-center text-brown font-semibold">Status</th>
                    <th className="px-6 py-3 text-center text-brown font-semibold">Jumlah</th>
                    <th className="px-6 py-3 text-left text-brown font-semibold">Catatan</th>
                    <th className="px-6 py-3 text-center text-brown font-semibold">Waktu</th>
                  </tr>
                </thead>
                <tbody>
                  {rsvps.map((rsvp, index) => (
                    <tr key={rsvp.id} className={index % 2 === 0 ? 'bg-cream/50' : 'bg-white'}>
                      <td className="px-6 py-4 font-medium text-brown">{rsvp.nama}</td>
                      <td className="px-6 py-4 text-center">
                        {rsvp.kehadiran === 'hadir' ? (
                          <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                            <Icon icon="mdi:check-circle" />
                            Hadir
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                            <Icon icon="mdi:close-circle" />
                            Tidak Hadir
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-brown">
                        {rsvp.kehadiran === 'hadir' ? rsvp.jumlah : '-'}
                      </td>
                      <td className="px-6 py-4 text-brown">
                        {rsvp.catatan || <span className="text-brown/40 italic">-</span>}
                      </td>
                      <td className="px-6 py-4 text-center text-brown text-sm">
                        {formatDate(rsvp.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}