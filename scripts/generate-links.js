/**
 * Script untuk generate invitation links untuk multiple guests
 *
 * Usage:
 *   node scripts/generate-links.js
 *   node scripts/generate-links.js > invitation-links.txt
 */

// Edit base URL sesuai dengan domain Anda
const BASE_URL = 'http://localhost:3000/welcome?to='

// Daftar nama tamu
// Edit list ini dengan nama-nama tamu Anda
const guests = [
  'Ahmad Rizki',
  'Siti Nurhaliza',
  'Budi Santoso',
  'Sarah dan Keluarga',
  'Team Marketing',
  'Pak John Doe',
  'Ibu Jane Smith',
  'Keluarga Besar Abdullah',
  // Tambahkan nama tamu lainnya di sini
]

// Generate links
console.log('='.repeat(70))
console.log('BUKBER KBK 2026 - INVITATION LINKS')
console.log('A Touch of 70\'s Vibes')
console.log('='.repeat(70))
console.log('')

guests.forEach((guest, index) => {
  const encodedName = encodeURIComponent(guest)
  const link = `${BASE_URL}${encodedName}`

  console.log(`${index + 1}. ${guest}`)
  console.log(`   ${link}`)
  console.log('')
})

console.log('='.repeat(70))
console.log(`Total: ${guests.length} guests`)
console.log('='.repeat(70))
console.log('')
console.log('Tips:')
console.log('- Copy links di atas dan kirim ke tamu via WhatsApp/Email')
console.log('- Untuk save ke file: node scripts/generate-links.js > links.txt')
console.log('- Edit BASE_URL di file ini untuk production URL')
