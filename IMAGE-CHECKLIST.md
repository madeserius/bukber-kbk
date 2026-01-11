# 📸 Image Checklist untuk Bukber KBK

Checklist gambar yang perlu disiapkan untuk website undangan.

## ✅ Checklist

### 1. Sponsor Images (4 images)

Simpan di folder: `public/`

- [ ] **gokana.png** - Logo Gokana
- [ ] **gorengan.jpeg** - Foto takjil/gorengan
- [ ] **esteh.jpeg** - Foto minuman/es teh
- [ ] **kado.jpeg** - Foto gift/doorprize

### 2. Women's Style References (4 images)

Simpan di folder: `public/`

- [ ] **women-1.jpg** - 70's style #1
- [ ] **women-2.jpg** - 70's style #2
- [ ] **women-3.jpg** - 70's style #3
- [ ] **women-4.jpg** - 70's style #4

### 3. Men's Style References (4 images)

Simpan di folder: `public/`

- [ ] **men-1.jpg** - 70's style #1
- [ ] **men-2.jpg** - 70's style #2
- [ ] **men-3.jpg** - 70's style #3
- [ ] **men-4.jpg** - 70's style #4

### 4. Background Music

Simpan di folder: `public/song/`

- [ ] **Tompi - Ramadhan Datang (Official Music Video).mp3** - Background music

### 5. Background Image

Simpan di folder: `public/`

- [ ] **bg.jpeg** - Background image di dalam invitation card

### 6. Optional Images

- [ ] **og-image.jpg** - Open Graph preview (1200x630px recommended)

---

## 📏 Spesifikasi Image:

### Sponsor Images:
- **Size:** 500x500px (square, aspect ratio 1:1)
- **Format:** PNG (recommended) atau JPG
- **File size:** < 500KB
- **Background:** Transparent PNG (best) atau white/clean background

### Style Reference Images:
- **Size:** Min 600x600px (square atau landscape)
- **Format:** JPG atau PNG
- **File size:** < 500KB per image
- **Quality:** Clear, good lighting, menampilkan outfit dengan jelas

### OG Image:
- **Size:** 1200x630px
- **Format:** JPG atau PNG
- **File size:** < 1MB
- **Content:** Preview card untuk social media (WhatsApp, Facebook, Twitter)

### Background Image:
- **Size:** 480px width minimum (sesuai mobile container)
- **Format:** JPEG, JPG, atau PNG
- **File size:** < 500KB (compress untuk loading cepat)
- **Style:** High contrast atau pattern recommended
- **Tips:** Di dalam invitation card dengan cream overlay (85% opacity), sesuaikan opacity di CSS jika text kurang jelas

### Background Music:
- **Format:** MP3 (recommended), WAV, atau OGG
- **File size:** < 5MB untuk loading cepat
- **Duration:** 3-5 menit (akan auto-loop)
- **Quality:** 128-192 kbps (balance antara quality & file size)
- **Volume:** Akan diset ke 50% secara default

---

## 🚀 Quick Setup:

1. **Prepare images** sesuai checklist di atas
2. **Rename files** sesuai naming convention
3. **Copy ke folder** `public/`
4. **Refresh browser** - images akan otomatis muncul!

---

## ⚠️ Important Notes:

- **File names case-sensitive** (huruf besar/kecil harus exact match)
- **Jangan gunakan spasi** dalam file name (gunakan dash `-`)
- **Test di browser** setelah upload untuk memastikan images load dengan baik
- **Jika image tidak muncul**, check:
  - File name spelling (exact match)
  - File ada di folder `public/` bukan subfolder
  - Refresh hard (Cmd+Shift+R atau Ctrl+Shift+R)

---

## 🎨 Tips Mencari/Membuat Images:

### Untuk Style References:
- Cari di Pinterest: "70s fashion", "disco fashion", "retro 70s outfits"
- Gunakan foto teman/keluarga dengan style 70's
- Screenshot dari film/series era 70's
- AI-generated (Midjourney, DALL-E) dengan prompt "1970s fashion"

### Untuk Sponsor Images:
- Logo resmi dari sponsor
- Foto produk dengan background bersih
- Edit dengan Canva/Photoshop untuk remove background

---

## 📝 Setelah Upload Images:

Jika ingin custom descriptions:

**Edit:** `app/components/StyleReference.tsx`

```typescript
const womenStyles = [
  { id: 1, description: 'Your description here', image: '/women-1.jpg' },
  // Update description sesuai foto
]
```

**Edit:** `app/components/Budget.tsx`

```typescript
const sponsors = [
  { name: 'Custom Name', image: '/your-image.png', icon: 'mdi:icon-name' },
  // Update name dan icon jika perlu
]
```

---

**Status:** [ ] Images Complete
**Last Updated:** 2026-01-11
