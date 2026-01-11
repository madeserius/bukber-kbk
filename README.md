# Bukber KBK - A Touch of 70's Vibes 🌙

Undangan Buka Puasa Bersama digital dengan tema vintage 70's, dibangun menggunakan Next.js 14+.

![Preview](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)
![Preview](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Preview](https://img.shields.io/badge/Framer-Motion-FF0055?style=for-the-badge&logo=framer)

## 📋 Fitur

- ✨ **Welcome Page** dengan personalisasi nama tamu
- ⏰ **Countdown Timer** real-time menuju acara
- 🎵 **Background Music** auto-play dengan control (play/pause/mute)
- 🎨 **Tema Vintage 70's** dengan warna cream, brown, dan gold
- 📱 **Mobile-First Design** (max-width: 480px di semua device)
- 🎭 **Smooth Animations** menggunakan Framer Motion
- 📝 **RSVP Form** dengan validasi
- 🖼️ **Style References** untuk dress code
- 🎯 **Informasi Lengkap** tentang acara, aktivitas, dan budget

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ atau npm/yarn/pnpm
- Browser modern

### Installation

1. **Clone atau download project ini**
   ```bash
   cd bukber_kbk
   ```

2. **Install dependencies**
   ```bash
   npm install
   # atau
   yarn install
   # atau
   pnpm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # atau
   yarn dev
   # atau
   pnpm dev
   ```

4. **Buka browser**
   ```
   http://localhost:3000
   ```

## 🎯 URL Structure & Personalization

### Welcome Page dengan Nama Tamu

Project ini mendukung personalisasi nama tamu melalui URL query parameter:

```
http://localhost:3000/welcome?to=Nama+Tamu
```

### Contoh URL:

```bash
# Single name
http://localhost:3000/welcome?to=Budi

# Multiple words
http://localhost:3000/welcome?to=Sarah+dan+Keluarga

# Formal name
http://localhost:3000/welcome?to=Bapak+John+Doe

# Default (jika tidak ada parameter)
http://localhost:3000/welcome
# Akan menampilkan: "Tamu Undangan"
```

### Cara Generate URL untuk Tamu:

**Template:**
```
https://yourdomain.com/welcome?to={NAMA_TAMU}
```

**Contoh Multiple Guests:**
```
https://yourdomain.com/welcome?to=Ahmad
https://yourdomain.com/welcome?to=Siti+dan+Keluarga
https://yourdomain.com/welcome?to=Pak+Budi
https://yourdomain.com/welcome?to=Team+Marketing
```

**Tips:**
- Gunakan `+` atau `%20` untuk spasi
- Nama akan otomatis tersimpan dan di-pre-fill di RSVP form
- URL case-sensitive (huruf besar/kecil akan ditampilkan sesuai input)

## 📁 Project Structure

```
bukber_kbk/
├── app/
│   ├── api/
│   │   └── rsvp/
│   │       └── route.ts          # API endpoint untuk RSVP
│   ├── components/
│   │   ├── Hero.tsx               # Hero section
│   │   ├── WelcomeMessage.tsx     # Welcome message
│   │   ├── DressCode.tsx          # Dress code section
│   │   ├── Budget.tsx             # Budget & sponsors
│   │   ├── Activities.tsx         # List aktivitas
│   │   ├── StyleReference.tsx     # Style references
│   │   ├── RSVPForm.tsx           # RSVP form
│   │   ├── ClosingMessage.tsx     # Closing message
│   │   └── BackToTop.tsx          # Back to top button
│   ├── welcome/
│   │   └── page.tsx               # Welcome page
│   ├── invitation/
│   │   └── page.tsx               # Main invitation page
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home (redirect)
│   └── globals.css                # Global styles
├── public/                        # Static assets
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🎨 Customization

### 1. Edit Event Details

**File:** `app/components/Hero.tsx`

```tsx
// Ubah tanggal, waktu, dan lokasi
<p className="text-brown font-serif font-bold text-2xl">
  FEBRUARY 28, 2026  // <- Edit tanggal
</p>
<p className="text-brown text-xl font-semibold">
  16.30 WIB  // <- Edit waktu
</p>
<p className="text-brown text-xl font-semibold">
  Adit's House  // <- Edit lokasi
</p>
```

### 2. Edit Countdown Timer Target

**File:** `app/welcome/page.tsx`

```tsx
// Line ~16 - ubah tanggal event
const eventDate = new Date('2026-02-28T16:30:00+07:00')
// Format: YYYY-MM-DDTHH:MM:SS+TIMEZONE
```

### 3. Edit Budget

**File:** `app/components/Budget.tsx`

```tsx
<p className="text-brown font-bold text-3xl font-serif">
  Rp 65.000  // <- Edit budget
</p>
```

### 4. Edit Activities

**File:** `app/components/Activities.tsx`

```tsx
const activities = [
  {
    icon: 'mdi:food',
    title: 'Buka Puasa Bersama',  // <- Edit judul
    description: 'Menikmati hidangan...'  // <- Edit deskripsi
  },
  // Tambah/edit aktivitas lainnya
]
```

### 5. Edit Color Theme

**File:** `tailwind.config.ts`

```tsx
colors: {
  cream: '#F5E6D3',      // <- Background color
  brown: '#8B7355',      // <- Primary text color
  gold: '#D4AF37',       // <- Accent color
  burntOrange: '#CC5500', // <- Secondary accent
},
```

### 5a. Change Background Image

**File:** `public/bg.jpeg`

Background image untuk invitation card (di dalam container):

**Current Background:**
- `bg.jpeg` - Background image di dalam invitation card dengan cream overlay

**Untuk mengganti background:**
1. Simpan image baru dengan nama `bg.jpeg` di folder `public/`
2. Atau edit path di `app/globals.css`:

```css
.invitation-container {
  background-image: url('/your-custom-bg.jpeg');
}
```

**Adjust Overlay Transparency:**

Edit file: `app/globals.css` (line ~171)

```css
/* Ubah opacity untuk mengatur tingkat transparansi */
background: rgba(245, 230, 211, 0.85); /* 0.85 = 85% opacity */

/* Nilai opacity:
   0.95 = lebih terang, text lebih jelas
   0.85 = balance (default)
   0.70 = lebih gelap, background lebih terlihat
*/
```

**Spesifikasi:**
- **Format:** JPEG, JPG, atau PNG
- **Size:** 480px width minimum (sesuai container mobile)
- **File size:** < 500KB (compress untuk loading cepat)
- **Style:** High contrast atau pattern recommended

**Tips:**
- Background image di dalam invitation card
- Cream overlay (85% opacity) membuat text tetap terbaca
- Sesuaikan opacity overlay jika text kurang jelas
- Background akan scroll bersama content

### 6. Add Sponsor Images

**Folder:** `public/`

Tambahkan logo/image sponsors di folder `public/`:

**Required Images:**
- `gokana.png` - Logo Gokana
- `makanan.png` - Icon/foto makanan
- `minuman.png` - Icon/foto minuman
- `doorprize.png` - Icon/foto doorprize

**Spesifikasi:**
- Format: PNG (recommended) atau JPG
- Size: 500x500px (square, aspect ratio 1:1)
- File size: < 500KB per image
- Background: Transparent PNG atau white background

**Cara menambahkan:**
1. Simpan image files di folder `public/`
2. Nama file harus exact match (case-sensitive)
3. Image akan otomatis muncul di section "Support By"

**Edit sponsors:**

**File:** `app/components/Budget.tsx`

```tsx
const sponsors = [
  { name: 'Gokana', image: '/gokana.png', icon: 'mdi:food' },
  { name: 'Takjil', image: '/gorengan.jpeg', icon: 'mdi:star' },
  // Tambah sponsors lainnya
]
```

**Note:** Jika image tidak ditemukan, akan otomatis menampilkan fallback icon.

### 7. Add Style Reference Images

Tambahkan foto referensi style 70's di folder `public/`:

**Women's Style (4 images):**
- `women-1.jpg` - Bell bottoms & floral top
- `women-2.jpg` - Maxi dress with headband
- `women-3.jpg` - Platform shoes & wide leg pants
- `women-4.jpg` - Vintage blouse & high waist skirt

**Men's Style (4 images):**
- `men-1.jpg` - Flared pants & patterned shirt
- `men-2.jpg` - Turtleneck & wide collar jacket
- `men-3.jpg` - Denim on denim look
- `men-4.jpg` - Leisure suit & aviator sunglasses

**Spesifikasi:**
- Format: JPG atau PNG
- Size: Landscape atau square (recommended min 600x600px)
- File size: < 500KB per image

**Edit descriptions:**

**File:** `app/components/StyleReference.tsx`

```tsx
const womenStyles = [
  { id: 1, description: 'Your custom description', image: '/women-1.jpg' },
  // Edit description sesuai foto Anda
]

const menStyles = [
  { id: 1, description: 'Your custom description', image: '/men-1.jpg' },
  // Edit description sesuai foto Anda
]
```

**Note:** Jika image tidak ditemukan, akan otomatis menampilkan fallback gradient + icon.

### 8. Change Background Music

**Folder:** `public/song/`

Ganti file musik di folder `public/song/`:

**Current Music:**
- `Tompi - Ramadhan Datang (Official Music Video).mp3`

**Untuk mengganti musik:**
1. Simpan file musik baru di folder `public/song/`
2. Edit path di `app/components/MusicPlayer.tsx`:

```tsx
<audio ref={audioRef} loop preload="auto">
  <source src="/song/nama-file-baru.mp3" type="audio/mpeg" />
</audio>
```

**Supported formats:**
- MP3 (recommended)
- WAV
- OGG

**Tips:**
- File size: < 5MB untuk loading cepat
- Volume default: 50% (bisa diubah di `audioRef.current.volume`)
- Music auto-loop ketika selesai

**Customize music controls:**

**File:** `app/components/MusicPlayer.tsx`

```tsx
// Line ~14 - ubah volume default
audioRef.current.volume = 0.5 // 0.0 - 1.0 (0% - 100%)

// Disable auto-play (play manual saja)
// Comment line 17-22 di useEffect
```

**Music controls:**
- Floating button kiri bawah (di luar invitation card): Play/Pause (ukuran kecil)
- Button kedua: Mute/Unmute (lebih kecil)
- Tooltip: Nama lagu (tampil saat playing, muncul di kanan button)
- Position: Fixed di viewport kiri bawah, tidak scroll dengan content
- Size: Compact untuk tidak mengganggu content
- Visibility: **Button hanya muncul setelah user klik "Buka Undangan"**
- Auto-play: Musik otomatis play setelah user klik "Buka Undangan" (user interaction)

## 📱 RSVP Data Handling

Saat ini, RSVP data akan ter-log di console. Untuk production:

**File:** `app/api/rsvp/route.ts`

### Option 1: Save to Database (Recommended)

```typescript
// Install Prisma atau database client pilihan Anda
// Example dengan Prisma:

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  const body = await request.json()

  // Save to database
  const rsvp = await prisma.rsvp.create({
    data: {
      nama: body.nama,
      kehadiran: body.kehadiran,
      jumlah: body.jumlah,
      catatan: body.catatan,
    },
  })

  return NextResponse.json({ success: true, data: rsvp })
}
```

### Option 2: Save to Google Sheets

```typescript
// Gunakan Google Sheets API
// Install: npm install googleapis

import { google } from 'googleapis'

export async function POST(request: NextRequest) {
  const body = await request.json()

  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS!),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const sheets = google.sheets({ version: 'v4', auth })

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SHEET_ID,
    range: 'Sheet1!A:D',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[body.nama, body.kehadiran, body.jumlah, body.catatan]],
    },
  })

  return NextResponse.json({ success: true })
}
```

### Option 3: Send to Email

```typescript
// Gunakan nodemailer atau service email
// Install: npm install nodemailer

import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  const body = await request.json()

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: 'your-email@example.com',
    subject: `RSVP dari ${body.nama}`,
    text: `
      Nama: ${body.nama}
      Kehadiran: ${body.kehadiran}
      Jumlah: ${body.jumlah}
      Catatan: ${body.catatan}
    `,
  })

  return NextResponse.json({ success: true })
}
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push code ke GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO
   git push -u origin main
   ```

2. **Deploy ke Vercel**
   - Buka [vercel.com](https://vercel.com)
   - Import repository GitHub
   - Configure project (auto-detected as Next.js)
   - Deploy!

3. **Custom Domain (Optional)**
   - Di Vercel dashboard, tambah custom domain
   - Update DNS records di domain provider

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build project
npm run build

# Deploy
netlify deploy --prod
```

## 🔧 Environment Variables

Jika menggunakan database atau external services, buat file `.env.local`:

```env
# Database (contoh dengan Supabase)
DATABASE_URL="postgresql://..."

# Google Sheets
GOOGLE_CREDENTIALS='{"type": "service_account",...}'
SHEET_ID="your-sheet-id"

# Email
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"

# Optional: Base URL
NEXT_PUBLIC_BASE_URL="https://yourdomain.com"
```

## 📊 Generate Multiple Invitation Links

Buat script untuk generate links untuk banyak tamu:

**File:** `scripts/generate-links.js`

```javascript
const guests = [
  'Ahmad Rizki',
  'Siti Nurhaliza',
  'Budi dan Keluarga',
  'Team Marketing',
  // ... tambah nama lainnya
]

const baseUrl = 'https://yourdomain.com/welcome?to='

guests.forEach(guest => {
  const encodedName = encodeURIComponent(guest)
  const link = `${baseUrl}${encodedName}`
  console.log(`${guest}: ${link}`)
})
```

**Run:**
```bash
node scripts/generate-links.js > invitation-links.txt
```

## 🎯 Testing

### Test Different Guest Names

```bash
# Test dengan berbagai nama
http://localhost:3000/welcome?to=Test+User
http://localhost:3000/welcome?to=Bapak+John+Doe
http://localhost:3000/welcome?to=Team+IT
```

### Test RSVP API

```bash
# Test POST request
curl -X POST http://localhost:3000/api/rsvp \
  -H "Content-Type: application/json" \
  -d '{
    "nama": "Test User",
    "kehadiran": "hadir",
    "jumlah": 2,
    "catatan": "Alergi kacang"
  }'
```

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
# macOS/Linux:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Dependencies Error

```bash
# Clear cache dan reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Error

```bash
# Check for type errors
npm run lint

# Clear Next.js cache
rm -rf .next
npm run build
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize for your own events!

## 📧 Support

Jika ada pertanyaan atau issue, silakan buat issue di GitHub repository.

---

**Made with ❤️ for KBK Bukber 2026**

*A Touch of 70's Vibes* ✨
