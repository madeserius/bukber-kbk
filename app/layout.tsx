import type { Metadata } from 'next'
import './globals.css'
import MusicPlayerWrapper from './components/MusicPlayerWrapper'

export const metadata: Metadata = {
  title: 'Bukber KBK - A Touch of 70\'s Vibes',
  description: 'Undangan Buka Puasa Bersama KBK dengan tema vintage 70\'s',
  openGraph: {
    title: 'Bukber KBK - A Touch of 70\'s Vibes',
    description: 'Undangan Buka Puasa Bersama KBK',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>
        {/* Hidden form for Netlify Forms detection */}
        <form name="rsvp" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
          <input type="text" name="nama" />
          <input type="text" name="kehadiran" />
          <input type="number" name="jumlah" />
          <textarea name="catatan"></textarea>
        </form>
        
        <div className="min-h-screen w-full flex items-center justify-center py-4 md:py-8">
          <div className="invitation-container max-w-[480px] w-full mx-auto bg-cream paper-texture shadow-2xl relative overflow-hidden">
            {children}
          </div>
        </div>
        {/* Music Player di luar invitation container */}
        <MusicPlayerWrapper />
      </body>
    </html>
  )
}
