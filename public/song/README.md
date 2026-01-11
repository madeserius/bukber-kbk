# 🎵 Background Music

Folder ini untuk menyimpan file musik background untuk undangan.

## Current Music File:

**Tompi - Ramadhan Datang (Official Music Video).mp3**

## Setup:

1. Simpan file musik dengan nama: `Tompi - Ramadhan Datang (Official Music Video).mp3`
2. Atau musik custom Anda dengan nama file yang sesuai
3. Update path di `app/components/MusicPlayer.tsx` jika nama file berbeda

## Spesifikasi:

- **Format:** MP3 (recommended), WAV, atau OGG
- **File size:** < 5MB
- **Duration:** 3-5 menit (auto-loop)
- **Quality:** 128-192 kbps

## Features:

- ✅ Auto-play setelah user klik "Buka Undangan" (user interaction)
- ✅ Loop musik otomatis
- ✅ Volume default 50%
- ✅ Control buttons (Play/Pause/Mute) - ukuran compact
- ✅ Floating button di kiri bawah (di luar invitation card)
- ✅ Fixed position - tidak scroll dengan content
- ✅ Music persist antar pages (Welcome → Invitation)

## How Auto-Play Works:

1. User buka welcome page (button music **HIDDEN**)
2. User klik button "Buka Undangan"
3. **Button music MUNCUL** + **Musik otomatis play** (triggered oleh user interaction)
4. Navigate ke invitation page
5. Musik tetap playing, button tetap visible

**Note:**
- Browser memblok auto-play tanpa user interaction. Solusinya adalah trigger play setelah user klik button pertama kali.
- Button music control hanya muncul setelah user klik "Buka Undangan" untuk UX yang lebih clean.

## Customize:

### Ganti Musik:

**File:** `app/components/MusicPlayer.tsx`

```tsx
<audio ref={audioRef} loop preload="auto">
  <source src="/song/your-music-file.mp3" type="audio/mpeg" />
</audio>
```

### Ubah Volume Default:

```tsx
audioRef.current.volume = 0.5 // 0.0 - 1.0 (0% - 100%)
```

### Disable Auto-Play:

Comment bagian auto-play di useEffect (line ~17-22)

## File Structure:

```
public/
└── song/
    └── Tompi - Ramadhan Datang (Official Music Video).mp3
```

## Browser Support:

✅ Chrome/Edge: MP3, WAV, OGG
✅ Firefox: MP3, WAV, OGG
✅ Safari: MP3, WAV
✅ Mobile browsers: MP3 (recommended)

**Note:** Beberapa browser memblok auto-play. Jika auto-play tidak jalan, user perlu klik Play button manual.
