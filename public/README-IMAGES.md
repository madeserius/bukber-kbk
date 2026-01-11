# Image Files Guide

Simpan image files di folder `public/` dengan nama berikut:

## 1. Sponsor Images:

**Budget Section:**
1. **gokana.png** - Logo atau foto Gokana
2. **gorengan.jpeg** / **makanan.png** - Icon/foto untuk kategori makanan/takjil
3. **esteh.jpeg** / **minuman.png** - Icon/foto untuk kategori minuman
4. **kado.jpeg** / **doorprize.png** - Icon/foto untuk gift/doorprize

## 2. Background Image:

**Invitation Card Background:**
- **bg.jpeg** - Background image di dalam invitation card (dengan cream overlay)

## 3. Style Reference Images:

**Women's Style (4 images):**
- **women-1.jpg** - Bell bottoms & floral top
- **women-2.jpg** - Maxi dress with headband
- **women-3.jpg** - Platform shoes & wide leg pants
- **women-4.jpg** - Vintage blouse & high waist skirt

**Men's Style (4 images):**
- **men-1.jpg** - Flared pants & patterned shirt
- **men-2.jpg** - Turtleneck & wide collar jacket
- **men-3.jpg** - Denim on denim look
- **men-4.jpg** - Leisure suit & aviator sunglasses

## Spesifikasi Recommended:

- **Format:** PNG atau JPG
- **Size:** 500x500px (square/aspect ratio 1:1)
- **File size:** < 500KB per image (untuk loading cepat)
- **Background:** Transparent PNG (recommended) atau white background

## Cara Menambahkan:

1. Simpan file image di folder `/public/`
2. Rename sesuai nama di atas (case-sensitive)
3. Image akan otomatis muncul di section "Support By"

## Complete Structure:

```
public/
├── # Background (Inside Invitation Card)
├── bg.jpeg             ← Background image di dalam invitation card
│
├── # Sponsor Images
├── gokana.png          ← Logo Gokana
├── gorengan.jpeg       ← Foto takjil/gorengan
├── esteh.jpeg          ← Foto minuman/es teh
├── kado.jpeg           ← Foto gift/kado
│
├── # Style References
├── custom/
│   ├── women/
│   │   ├── women-1.jpeg   ← 70's style women #1
│   │   ├── women-2.jpeg   ← 70's style women #2
│   │   ├── women-3.jpeg   ← 70's style women #3
│   │   └── women-4.jpeg   ← 70's style women #4
│   └── men/
│       ├── men-1.jpeg     ← 70's style men #1
│       ├── men-2.jpeg     ← 70's style men #2
│       ├── men-3.jpeg     ← 70's style men #3
│       └── men-4.jpeg     ← 70's style men #4
│
├── # Background Music
├── song/
│   └── Tompi - Ramadhan Datang (Official Music Video).mp3
│
└── og-image.jpg        ← Open Graph image (social media preview)
```

## Fallback:

Jika image tidak ditemukan, akan otomatis menampilkan icon default.

## Edit Image Lists:

### Sponsors (Budget.tsx):

File: `/app/components/Budget.tsx`

```typescript
const sponsors = [
  { name: 'Gokana', image: '/gokana.png', icon: 'mdi:food' },
  { name: 'Sponsor Baru', image: '/sponsor-baru.png', icon: 'mdi:star' },
  // Tambah sponsors lainnya...
]
```

### Style References (StyleReference.tsx):

File: `/app/components/StyleReference.tsx`

```typescript
// Women's styles
const womenStyles = [
  { id: 1, description: 'Custom description', image: '/women-1.jpg' },
  { id: 2, description: 'Custom description', image: '/women-2.jpg' },
  // Edit description sesuai foto Anda
]

// Men's styles
const menStyles = [
  { id: 1, description: 'Custom description', image: '/men-1.jpg' },
  { id: 2, description: 'Custom description', image: '/men-2.jpg' },
  // Edit description sesuai foto Anda
]
```

**Tips:**
- Ganti `description` dengan deskripsi yang sesuai dengan foto Anda
- Tambah/kurangi jumlah items sesuai kebutuhan
- Pastikan `id` unique untuk setiap item
