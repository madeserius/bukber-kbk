# 🎨 Background Image Setup Guide

Panduan lengkap untuk setup dan customize background image di invitation card.

## 📍 Location

Background image diterapkan **di dalam invitation card** (bukan di luar), dengan cream overlay agar text tetap terbaca.

## 📁 File Location

```
public/
└── bg.jpeg  ← Simpan background image di sini
```

## 🎯 Current Setup

**File:** `app/globals.css` (line ~155-180)

```css
/* Background image di dalam invitation card */
.invitation-container {
  position: relative;
  background-image: url('/bg.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* Cream overlay untuk readability */
.invitation-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(245, 230, 211, 0.85); /* 85% opacity */
  pointer-events: none;
  z-index: 0;
}

/* Content di atas overlay */
.invitation-container > * {
  position: relative;
  z-index: 1;
}
```

## 📏 Image Specifications

### Recommended:
- **Size:** 480px width minimum (mobile container width)
- **Format:** JPEG, JPG, atau PNG
- **File size:** < 500KB (compress untuk loading cepat)
- **Aspect ratio:** Portrait atau square (mengikuti container height)
- **Style:** High contrast, pattern, atau texture

### Tips:
- Gunakan aesthetic vintage/70's
- High contrast lebih baik (karena ada overlay)
- Hindari text/detail kecil pada image (akan tercover overlay)
- Test di mobile dan desktop

## 🎨 Adjust Overlay Transparency

Overlay menggunakan cream color dengan transparency untuk membuat text terbaca.

**Edit:** `app/globals.css` (line ~171)

```css
background: rgba(245, 230, 211, OPACITY);
```

### Opacity Values:

| Opacity | Effect | Use Case |
|---------|--------|----------|
| `0.95` | Sangat terang | Background subtle, text sangat jelas |
| `0.90` | Terang | Balance dengan background terlihat sedikit |
| `0.85` | **Default** | Balance optimal |
| `0.80` | Sedang | Background lebih terlihat |
| `0.70` | Gelap | Background dominan terlihat |
| `0.60` | Sangat gelap | Background sangat terlihat, text harus bold |

### Example Adjustments:

**Untuk text lebih jelas (background lebih subtle):**
```css
background: rgba(245, 230, 211, 0.95);
```

**Untuk background lebih terlihat:**
```css
background: rgba(245, 230, 211, 0.70);
```

**Custom color overlay:**
```css
/* Gold overlay */
background: rgba(212, 175, 55, 0.85);

/* Brown overlay */
background: rgba(139, 115, 85, 0.90);

/* White overlay */
background: rgba(255, 255, 255, 0.85);
```

## 🔄 Change Background Image

### Method 1: Replace File

1. Simpan image baru sebagai `bg.jpeg` di folder `public/`
2. Refresh browser (Cmd+R atau Ctrl+R)
3. Hard refresh jika tidak update (Cmd+Shift+R atau Ctrl+Shift+R)

### Method 2: Change Path

**Edit:** `app/globals.css` (line ~157)

```css
.invitation-container {
  background-image: url('/your-custom-background.jpg');
}
```

### Method 3: Multiple Images for Pages

```css
/* Welcome page background */
.welcome-content {
  background-image: url('/bg-welcome.jpeg');
}

/* Invitation page background */
.invitation-container {
  background-image: url('/bg-invitation.jpeg');
}
```

## 🎭 Alternative Overlay Styles

### Gradient Overlay (Top to Bottom)

```css
.invitation-container::before {
  background: linear-gradient(
    to bottom,
    rgba(245, 230, 211, 0.95),
    rgba(245, 230, 211, 0.75)
  );
}
```

### Gradient Overlay (Center Focus)

```css
.invitation-container::before {
  background: radial-gradient(
    circle at center,
    rgba(245, 230, 211, 0.70),
    rgba(245, 230, 211, 0.95)
  );
}
```

### Blur Effect (Modern Look)

```css
.invitation-container {
  background-image: url('/bg.jpeg');
  background-size: cover;
  background-position: center;
}

.invitation-container::before {
  background: rgba(245, 230, 211, 0.50);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}
```

## 🚫 Remove Background Image

Jika ingin kembali ke plain background:

**Edit:** `app/globals.css`

```css
.invitation-container {
  position: relative;
  /* Comment atau hapus background-image */
  /* background-image: url('/bg.jpeg'); */
  background-color: #F5E6D3; /* Solid cream color */
}

/* Comment atau hapus overlay */
/*
.invitation-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(245, 230, 211, 0.85);
  pointer-events: none;
  z-index: 0;
}
*/
```

## 🧪 Testing Checklist

- [ ] Background image terlihat di dalam invitation card
- [ ] Text tetap terbaca dengan jelas (semua warna: brown, gold, dll)
- [ ] Border ornaments terlihat
- [ ] Icons visible
- [ ] Test di mobile (< 480px width)
- [ ] Test di tablet dan desktop
- [ ] Test scroll behavior
- [ ] Image loading cepat (< 2 detik)

## 💡 Troubleshooting

### Background tidak muncul:
1. Check file path: `public/bg.jpeg` (exact name, case-sensitive)
2. Hard refresh browser (Cmd+Shift+R)
3. Clear browser cache
4. Check console for errors (F12 → Console)

### Text tidak terbaca:
1. Increase overlay opacity (0.85 → 0.95)
2. Change overlay color ke lebih terang
3. Make text bolder atau larger
4. Gunakan text shadow

### Background terlalu terang/gelap:
1. Adjust overlay opacity
2. Edit image brightness/contrast di photo editor
3. Use gradient overlay untuk better balance

### Performance slow:
1. Compress image (< 500KB)
2. Convert ke JPEG (lebih kecil dari PNG)
3. Resize image (tidak perlu > 1000px width)
4. Use image optimization tools (TinyPNG, Squoosh)

## 📚 Resources

- **Image Compression:** https://tinypng.com
- **Image Editing:** https://squoosh.app
- **Vintage Textures:** Search "vintage paper texture" atau "70s pattern"
- **Color Picker:** Use browser DevTools eyedropper

---

**Last Updated:** 2026-01-11
