'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  console.log('HomePage component rendered', router);
  

  useEffect(() => {
    router.replace('/welcome')
  }, [router])

  // Show a loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brown to-gold">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-cream border-t-transparent mx-auto mb-4"></div>
        <p className="text-cream font-serif">Redirecting...</p>
      </div>
    </div>
  )
}
