# Email Setup untuk RSVP Notifications

Sistem RSVP sekarang sudah dilengkapi dengan email notifications yang akan dikirim otomatis saat ada RSVP baru.

## 🔧 Setup Email Configuration

### 1. Buat App Password Gmail

1. Masuk ke Google Account Settings
2. Pilih Security → 2-Step Verification (aktifkan jika belum)
3. Pilih "App passwords"
4. Generate password untuk "Mail" 
5. Copy 16-digit password yang dihasilkan

### 2. Update .env.local

Ganti nilai di file `.env.local`:

```bash
# Ganti dengan email Gmail Anda
EMAIL_USER=youremail@gmail.com

# Ganti dengan App Password yang sudah dibuat
EMAIL_PASSWORD=abcd efgh ijkl mnop

# Email admin yang akan menerima notifikasi RSVP
ADMIN_EMAIL=admin@yourdomain.com

# URL website untuk production
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

### 3. Restart Development Server

```bash
npm run dev
```

## 📧 Email yang Akan Dikirim

### Admin Notification Email
- **Kapan**: Setiap ada RSVP baru
- **Ke**: Email admin (ADMIN_EMAIL)
- **Berisi**:
  - Detail lengkap RSVP (nama, status, jumlah, catatan)
  - Link ke admin dashboard
  - Timestamp

### Template Email
- Design matching dengan tema website
- Responsive untuk mobile
- Include emoji dan styling yang menarik

## 🔒 Keamanan

- App Password lebih aman dari password biasa
- Email credentials tidak di-commit ke Git
- Error handling jika email gagal dikirim
- RSVP tetap tersimpan meski email gagal

## 🚀 Production Setup

Untuk deploy ke Vercel/Netlify:

1. Set environment variables di platform hosting
2. Ganti NEXT_PUBLIC_SITE_URL dengan domain production
3. Pastikan ADMIN_EMAIL valid

## 📱 Testing Email

Coba submit RSVP test untuk memastikan email terkirim dengan baik!

---

**Note**: Jika menggunakan email provider lain (Outlook, Yahoo), ganti `service: 'gmail'` di `email-service.ts`