# 🏗️ Build Qo'llanmasi

Frontend uchun production build yaratish qo'llanmasi.

## 📋 Talablar

- Node.js (v18+)
- npm
- Dependencies o'rnatilgan bo'lishi kerak

## 🚀 Build Yaratish

### 1. Dependencies o'rnatish (agar o'rnatilmagan bo'lsa)

```bash
npm install
```

### 2. Build yaratish

```bash
npm run build
```

Yoki to'g'ridan-to'g'ri frontend papkasida:

```bash
cd frontend
npm run build
```

## 📦 Build Natijasi

Build muvaffaqiyatli bo'lgandan keyin `frontend/dist` papkasi yaratiladi:

```
frontend/dist/
├── assets/
│   ├── index-[hash].js      # JavaScript bundle
│   ├── index-[hash].css     # CSS bundle
│   └── hero-car-[hash].jpg  # Optimized images
├── index.html               # Entry HTML
├── favicon.svg              # Favicon
├── bmw.webp                 # Static images
└── robots.txt               # SEO file
```

## 📊 Build Statistikasi

Odatda build quyidagi hajmda bo'ladi:
- **JavaScript:** ~496 KB (gzip: ~153 KB)
- **CSS:** ~80 KB (gzip: ~14 KB)
- **HTML:** ~1.3 KB (gzip: ~0.6 KB)
- **Images:** ~149 KB

## 🔍 Build ni Preview Qilish

Build qilingan fayllarni local serverda ko'rish:

```bash
cd frontend
npm run preview
```

Bu komanda `http://localhost:4173` da preview server ishga tushiradi.

## 🌐 Production Deploy

Build qilingan `frontend/dist` papkasini quyidagi platformalarga deploy qilish mumkin:

### Vercel

```bash
cd frontend
npm install -g vercel
vercel --prod
```

### Netlify

```bash
cd frontend
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Static Hosting

`frontend/dist` papkasidagi barcha fayllarni quyidagi platformalarga yuklash mumkin:
- GitHub Pages
- Netlify Drop
- Vercel
- Firebase Hosting
- AWS S3 + CloudFront
- Cloudflare Pages

## ⚙️ Build Sozlamalari

### Environment Variables

Production build uchun `.env.production` fayl yarating:

```env
VITE_API_URL=https://your-api-domain.com/api
```

### Vite Config

Build sozlamalarini `frontend/vite.config.ts` da o'zgartirish mumkin:

```typescript
export default defineConfig({
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    chunkSizeWarningLimit: 1000,
  }
})
```

## 🐛 Muammolarni Hal Qilish

### Build xatoligi

Agar build xatolik bersa:

1. Node modules ni tozalang:
```bash
cd frontend
rm -rf node_modules
npm install
```

2. Cache ni tozalang:
```bash
cd frontend
rm -rf dist
rm -rf .vite
npm run build
```

### Memory xatoligi

Agar memory xatoligi bo'lsa:

```bash
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

## ✅ Build Tekshirish

Build to'g'ri ekanligini tekshirish:

1. **Preview qiling:**
```bash
cd frontend
npm run preview
```

2. **Brauzerda oching:** http://localhost:4173

3. **Tekshiring:**
   - Barcha sahifalar ochilishi
   - API ga ulanishi
   - Images yuklanishi
   - Responsive dizayn ishlashi

## 📝 Eslatma

- Build faqat frontend uchun
- Backend uchun build kerak emas (Node.js to'g'ridan-to'g'ri ishlatiladi)
- Production da backend alohida deploy qilinadi
- Frontend `.env` faylida production API URL ni ko'rsating

## 🎉 Tayyor!

Build muvaffaqiyatli yaratildi va deploy qilishga tayyor!
