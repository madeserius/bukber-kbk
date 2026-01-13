# 📊 Setup Google Sheets untuk RSVP Form

Panduan lengkap untuk mengintegrasikan Google Sheets dengan form RSVP Anda. Data dari setiap submission akan otomatis tersimpan di Google Sheets secara **GRATIS**.

---

## 🎯 Yang Akan Kita Capai

Setelah setup selesai, setiap kali ada tamu yang submit form RSVP:
- ✅ Data otomatis tersimpan ke Google Sheets
- ✅ Terformat rapi dengan timestamp
- ✅ Bisa diakses dan dianalisis kapan saja
- ✅ 100% GRATIS tanpa biaya

---

## 📋 Prasyarat

- Akun Google (Gmail)
- Akses ke Google Cloud Console
- File project ini sudah di-clone

---

## 🚀 Step-by-Step Setup

### **STEP 1: Buat Google Sheet**

1. Buka [Google Sheets](https://sheets.google.com)
2. Klik **+ Blank** untuk membuat spreadsheet baru
3. Beri nama: **RSVP Bukber KBK** (atau nama lain sesuai keinginan)
4. Buat header di baris pertama (Row 1):

   | A | B | C | D | E | F |
   |---|---|---|---|---|---|
   | **Timestamp** | **Nama** | **Kehadiran** | **Jumlah Orang** | **Catatan** | **ID** |

5. **Simpan URL Sheet** (akan digunakan di Step 6)
   - Contoh URL: `https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0j/edit`
   - ID Sheet Anda adalah bagian setelah `/d/`: `1a2b3c4d5e6f7g8h9i0j`

---

### **STEP 2: Buat Google Cloud Project**

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Klik dropdown project di top bar → **New Project**
3. Isi detail project:
   - **Project Name**: `Bukber KBK RSVP` (atau nama lain)
   - **Organization**: Biarkan default (No organization)
4. Klik **Create**
5. Tunggu beberapa detik, pastikan project sudah terpilih di top bar

---

### **STEP 3: Enable Google Sheets API**

1. Di Google Cloud Console, buka menu ☰ (hamburger menu)
2. Pilih **APIs & Services** → **Library**
3. Di search bar, ketik: `Google Sheets API`
4. Klik **Google Sheets API** dari hasil pencarian
5. Klik tombol **ENABLE**
6. Tunggu hingga muncul notifikasi "API enabled"

---

### **STEP 4: Buat Service Account**

1. Buka menu ☰ → **APIs & Services** → **Credentials**
2. Klik **+ CREATE CREDENTIALS** di bagian atas
3. Pilih **Service Account**
4. Isi detail service account:
   - **Service account name**: `rsvp-service`
   - **Service account ID**: (auto-generated, biarkan saja)
   - **Description**: `Service account untuk RSVP form`
5. Klik **CREATE AND CONTINUE**
6. **Grant access** (Role):
   - Klik dropdown **Select a role**
   - Ketik: `Editor`
   - Pilih **Editor** dari Basic roles
   - Klik **CONTINUE**
7. **Grant users access** (opsional):
   - Lewati saja, klik **DONE**

---

### **STEP 5: Download Credentials JSON**

1. Setelah service account dibuat, Anda akan kembali ke halaman **Credentials**
2. Di bagian **Service Accounts**, cari service account yang baru dibuat (`rsvp-service`)
3. Klik pada **email service account** (format: `rsvp-service@your-project.iam.gserviceaccount.com`)
4. Pilih tab **KEYS**
5. Klik **ADD KEY** → **Create new key**
6. Pilih **JSON** sebagai key type
7. Klik **CREATE**
8. File JSON akan otomatis ter-download ke komputer Anda
9. **PENTING**: Simpan file ini dengan aman! Jangan share ke siapa pun

**Isi file JSON akan seperti ini:**
```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "rsvp-service@your-project.iam.gserviceaccount.com",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "...",
  "client_x509_cert_url": "..."
}
```

---

### **STEP 6: Share Google Sheet dengan Service Account**

1. **Copy email service account** dari file JSON yang di-download:
   - Cari field `"client_email"`
   - Contoh: `rsvp-service@your-project.iam.gserviceaccount.com`
2. Buka **Google Sheet** yang dibuat di Step 1
3. Klik tombol **Share** (pojok kanan atas)
4. Paste email service account di kolom "Add people and groups"
5. Pastikan permission: **Editor**
6. **UNCHECK** "Notify people" (jangan centang)
7. Klik **Share**

✅ Sekarang service account Anda punya akses untuk menulis ke Google Sheet!

---

### **STEP 7: Setup Environment Variables Lokal**

1. Buka file `.env.local` di root project Anda (jika belum ada, copy dari `.env.example`)
   ```bash
   cp .env.example .env.local
   ```

2. **Buka file JSON credentials** yang di-download di Step 5
3. **Copy SELURUH isi file JSON** (dari `{` sampai `}`)
4. **Jadikan satu baris** (remove semua line breaks):
   - Bisa gunakan online tool: [jsonformatter.org/json-minify](https://jsonformatter.org/json-minify)
   - Atau manual: copy → paste ke text editor → hapus semua enter/newlines

5. Edit `.env.local` dan isi variabel berikut:

```bash
# Google Sheets Configuration
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account","project_id":"your-project-id","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"rsvp-service@...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}

GOOGLE_SHEET_ID=1a2b3c4d5e6f7g8h9i0j
```

**CATATAN PENTING:**
- `GOOGLE_SHEETS_CREDENTIALS` harus **satu baris** tanpa line breaks
- `GOOGLE_SHEET_ID` adalah ID dari URL Sheet Anda (lihat Step 1)

---

### **STEP 8: Setup Environment Variables di Netlify**

Karena project ini menggunakan Netlify Functions, Anda perlu tambahkan environment variables di Netlify Dashboard:

1. Login ke [Netlify](https://app.netlify.com/)
2. Pilih site/project Anda
3. Klik **Site configuration** → **Environment variables**
4. Klik **Add a variable** → **Add a single variable**
5. Tambahkan 2 variabel berikut:

**Variable 1:**
- **Key**: `GOOGLE_SHEETS_CREDENTIALS`
- **Value**: (paste JSON credentials yang sudah dijadikan satu baris)
- **Scopes**: Centang semua (Build, Functions, Post-processing)

**Variable 2:**
- **Key**: `GOOGLE_SHEET_ID`
- **Value**: (paste Sheet ID Anda)
- **Scopes**: Centang semua

6. Klik **Save**

---

### **STEP 9: Install Dependencies**

Jalankan command berikut di terminal:

```bash
npm install
```

Ini akan menginstall package `googleapis` yang diperlukan.

---

### **STEP 10: Testing Lokal**

1. Jalankan development server:
   ```bash
   npm run dev
   ```

2. Buka browser: `http://localhost:3000`
3. Coba submit form RSVP dengan data test
4. **Check Google Sheet** → Data harusnya muncul di row baru!

**Jika ada error:**
- Check console browser (F12 → Console tab)
- Check terminal untuk log error
- Pastikan environment variables sudah benar
- Pastikan service account sudah di-share ke Google Sheet

---

### **STEP 11: Deploy ke Netlify**

1. Commit dan push perubahan:
   ```bash
   git add .
   git commit -m "Add Google Sheets integration for RSVP"
   git push
   ```

2. Netlify akan otomatis trigger build baru
3. Tunggu hingga deploy selesai
4. Test di production URL Anda

---

## ✅ Verifikasi Setup Berhasil

Cara memastikan setup berhasil:

1. **Submit form RSVP** dari website Anda
2. **Check Google Sheet** → Data baru harus muncul dalam beberapa detik
3. **Check format data**:
   - Kolom A: Timestamp (format: DD/MM/YYYY, HH:MM:SS)
   - Kolom B: Nama tamu
   - Kolom C: HADIR atau TIDAK HADIR
   - Kolom D: Jumlah orang (atau 0 jika tidak hadir)
   - Kolom E: Catatan (atau "-" jika kosong)
   - Kolom F: ID unik

---

## 🐛 Troubleshooting

### Error: "Google Sheets configuration missing"
**Solusi**: Pastikan environment variables `GOOGLE_SHEETS_CREDENTIALS` dan `GOOGLE_SHEET_ID` sudah diset dengan benar.

### Error: "The caller does not have permission"
**Solusi**:
- Pastikan service account sudah di-share ke Google Sheet (Step 6)
- Pastikan permission-nya **Editor**, bukan Viewer

### Error: "Invalid JSON in credentials"
**Solusi**:
- Pastikan JSON credentials sudah dijadikan satu baris
- Pastikan tidak ada karakter aneh atau corrupt
- Copy ulang dari file JSON asli

### Data tidak muncul di Google Sheet
**Solusi**:
- Check console browser untuk error
- Check Netlify Function logs
- Pastikan Sheet ID benar (dari URL)
- Pastikan nama sheet adalah "Sheet1" (atau update di code line 165)

### Error: "Cannot find module 'googleapis'"
**Solusi**:
- Jalankan `npm install` untuk install dependencies
- Check `package.json` apakah `googleapis` sudah ada di dependencies

---

## 📊 Format Data di Google Sheet

Data akan tersimpan dengan format berikut:

| Timestamp | Nama | Kehadiran | Jumlah Orang | Catatan | ID |
|-----------|------|-----------|--------------|---------|-----|
| 12/01/2026, 14:30:15 | John Doe | HADIR | 2 | Alergi seafood | 1736668215123 |
| 12/01/2026, 15:45:22 | Jane Smith | TIDAK HADIR | 0 | - | 1736672722456 |

---

## 💰 Biaya

✅ **100% GRATIS** dengan quota:
- **60 requests/minute per user**
- **500 requests/100 detik per project**

Untuk form RSVP dengan ratusan atau bahkan ribuan tamu, quota ini **lebih dari cukup**!

---

## 🔒 Keamanan

1. **Jangan commit file credentials JSON** ke Git
2. **Tambahkan ke .gitignore**:
   ```
   # Google credentials
   *.json
   google-credentials.json
   ```
3. **Simpan credentials dengan aman** (gunakan password manager)
4. **Jangan share credentials** ke siapa pun

---

## 📝 Customization

### Mengubah Nama Sheet

Jika sheet Anda bukan bernama "Sheet1", update di file `netlify/functions/rsvp.js` line 165:

```javascript
const range = 'NamaSheetAnda!A:F' // Ganti 'NamaSheetAnda' dengan nama sheet Anda
```

### Menambah Kolom

Untuk menambah kolom data, edit file `netlify/functions/rsvp.js` di function `saveToGoogleSheets`:

```javascript
const values = [[
  timestamp,
  rsvpData.nama,
  rsvpData.kehadiran === 'hadir' ? 'HADIR' : 'TIDAK HADIR',
  rsvpData.kehadiran === 'hadir' ? rsvpData.jumlah : 0,
  rsvpData.catatan || '-',
  rsvpData.id,
  // Tambahkan kolom baru di sini
  rsvpData.email || '-', // Contoh: kolom email
]]
```

---

## ✨ Selesai!

Setup Google Sheets integration sudah selesai! Sekarang setiap RSVP akan otomatis tersimpan ke Google Sheets Anda.

**Happy coding!** 🎉

---

## 📞 Butuh Bantuan?

Jika ada pertanyaan atau masalah, silakan:
1. Check troubleshooting section di atas
2. Review step-by-step dengan teliti
3. Check Netlify Function logs untuk error details

---

**Last Updated**: 12 Januari 2026
