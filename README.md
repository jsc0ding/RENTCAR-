# 🚗 Car Rental - Avtomobil Ijarasi Tizimi

To'liq funksional avtomobil ijarasi veb-ilovasi. Frontend va Backend alohida papkalarda joylashgan.

## 📁 Loyiha Strukturasi

```
car-rental/
├── backend/           # Express + MongoDB
├── frontend/          # React + Vite + TypeScript
└── package.json       # Root package.json
```

## 🚀 Tezkor Boshlash

### 1. Barcha dependencies ni o'rnatish

```bash
npm run install:all
```

### 2. Loyihani ishga tushirish

Bitta komanda bilan backend va frontend ni ishga tushirish:

```bash
npm run dev
```

Yoki alohida ishga tushirish:

**Backend:**
```bash
npm run dev:backend
```

**Frontend:**
```bash
npm run dev:frontend
```

- Backend: `http://localhost:5000`
- Frontend: `http://localhost:8080` (yoki 5173)

## 🔧 Sozlash

### Frontend (.env)

`frontend/.env` faylini yarating:

```env
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)

`backend/.env` faylini yarating:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id
NODE_ENV=development
```

## ✨ Xususiyatlar

### Frontend
- 📱 To'liq responsive dizayn (mobile, tablet, desktop)
- 🔐 Admin panel (logo 3 marta bosish + parol: 87654321)
- 🚗 Avtomobil katalogi va filtrlash
- 📅 Bron qilish tizimi (Uzbek kalendar)
- 🗺️ 14 ta viloyat bo'yicha joylashuv
- 📞 Aloqa formasi
- 🌙 Dark/Light mode
- 🎨 Zamonaviy UI (Shadcn/ui)

### Backend
- 🔌 RESTful API
- 💾 MongoDB database
- 📱 Telegram bot integratsiyasi
- 🔍 Qidiruv va filtrlash
- 📊 Statistika
- 🔄 CRUD operatsiyalari

## 📱 Telegram Bot

Backend avtomatik ravishda Telegram bot orqali xabarlar yuboradi:
- Yangi bron qilingan avtomobillar haqida
- Aloqa formasi orqali yuborilgan xabarlar

## 🛠️ Texnologiyalar

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn/ui
- React Router
- React Query
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Telegram Bot API
- CORS

## 📖 Qo'shimcha Ma'lumot

Har bir qism uchun batafsil ma'lumot:
- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)

## 🔐 Admin Panel

Admin panelga kirish:
1. Asosiy sahifada logoni 3 marta bosing
2. Parol kiriting: `87654321`
3. Admin panelda avtomobillarni boshqaring

## 📝 Scriptlar

### Development

```bash
# Barcha dependencies ni o'rnatish
npm install

# Backend va Frontend ni bir vaqtda ishga tushirish (Development)
npm run dev

# Faqat Backend (Development)
npm run dev:backend

# Faqat Frontend (Development)
npm run dev:frontend
```

### Production

```bash
# Frontend ni build qilish
npm run build

# Backend orqali frontend ni serve qilish (Production)
npm start

# Yoki alohida:
npm run build          # Frontend build
npm run start:backend  # Backend ishga tushirish
```

## 🏗️ Production Build va Deploy

### 1. Frontend Build

```bash
npm run build
```

Bu komanda `frontend/dist` papkasida tayyor fayllar yaratadi:
- `index.html` - Asosiy HTML fayl
- `assets/` - CSS va JavaScript fayllar
- Static fayllar (favicon, images, robots.txt)

### 2. Backend orqali Frontend Serve Qilish

```bash
npm start
```

Bu komanda:
1. Frontend ni build qiladi
2. Backend serverni ishga tushiradi
3. Backend `http://localhost:5000` da frontend va API ni serve qiladi

**Natija:**
- Frontend: `http://localhost:5000`
- API: `http://localhost:5000/api`

### 3. Preview (Ixtiyoriy)

Build qilingan fayllarni alohida preview qilish:

```bash
cd frontend
npm run preview
```

## 📝 Litsenziya

MIT License
