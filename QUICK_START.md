# ⚡ Tezkor Boshlash

Loyihani 3 daqiqada ishga tushiring!

## 1️⃣ Dependencies o'rnatish

```bash
npm install
```

## 2️⃣ Environment Variables

### Backend (.env)

`backend/.env` faylini yarating:
```env
PORT=5000
MONGODB_URI=mongodb+srv://Nizomjon:lr7KznYbG7UJrfrU@cluster1.mun3jsp.mongodb.net/carRental
TELEGRAM_BOT_TOKEN=8497545620:AAF8nnCD23faZOlE_LVOsxw2rX1DKPxxiBA
TELEGRAM_CHAT_ID=7240818738
NODE_ENV=development
```

### Frontend (.env)

`frontend/.env` faylini yarating:
```env
VITE_API_URL=http://localhost:5000/api
```

## 3️⃣ Ishga tushirish

Bitta komanda bilan:
```bash
npm run dev
```

✅ Backend: http://localhost:5000
✅ Frontend: http://localhost:8080

## 🎉 Tayyor!

- Brauzerda http://localhost:8080 ni oching
- Admin panel: Logoni 3 marta bosing, parol: `87654321`

## 📝 Eslatma

Batafsil ma'lumot uchun `SETUP_GUIDE.md` ni o'qing.


## 🏗️ Production Build (Ixtiyoriy)

Frontend uchun production build yaratish:

```bash
npm run build
```

Bu komanda `frontend/dist` papkasida tayyor fayllar yaratadi.
