# 🚀 Backend Alohida Deploy Qilish

Backend ni alohida Render.com ga deploy qilish qo'llanmasi.

## 📋 Render.com Sozlamalari (Backend)

### 1. Yangi Web Service Yarating

1. **Render.com ga kiring:** https://render.com
2. **Dashboard** → **New +** → **Web Service**
3. **GitHub repository:** `jsc0ding/RENTCAR-`

### 2. Backend Sozlamalari

```yaml
Name: rentcar-backend
Environment: Node
Region: Frankfurt (yoki yaqin)
Branch: main
Root Directory: backend

Build Command: npm install
Start Command: npm start

Instance Type: Free
```

### 3. Environment Variables

**Environment** bo'limida quyidagi variables ni qo'shing:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `MONGODB_URI` | `mongodb+srv://Nizomjon:lr7KznYbG7UJrfrU@cluster1.mun3jsp.mongodb.net/carRental?retryWrites=true&w=majority` |
| `TELEGRAM_BOT_TOKEN` | `8497545620:AAF8nnCD23faZOlE_LVOsxw2rX1DKPxxiBA` |
| `TELEGRAM_CHAT_ID` | `7240818738` |

### 4. Deploy

**Create Web Service** tugmasini bosing.

## 📊 Deploy Jarayoni

```
1. Cloning repository...
2. Checking out backend directory...
3. Installing dependencies (npm install)...
4. Starting server (npm start)...
5. ✅ Backend deployed!
```

## 🌐 Backend URL

Deploy muvaffaqiyatli bo'lgandan keyin:

- **Backend URL:** `https://rentcar-backend-xxxx.onrender.com`
- **API Endpoints:**
  - `https://rentcar-backend-xxxx.onrender.com/api/cars`
  - `https://rentcar-backend-xxxx.onrender.com/api/stats`
  - `https://rentcar-backend-xxxx.onrender.com/api/filters`
  - `https://rentcar-backend-xxxx.onrender.com/api/contact`

## 🔗 Frontend bilan Bog'lash

Backend deploy qilingandan keyin, frontend `.env` faylini yangilang:

```env
VITE_API_URL=https://rentcar-backend-xxxx.onrender.com/api
```

Keyin frontend ni qayta build va deploy qiling.

## 🐛 Muammolarni Hal Qilish

### 1. MongoDB Connection Error

**Xatolik:** `MongoServerError: bad auth`

**Yechim:**
- MongoDB Atlas da username va password to'g'ri ekanligini tekshiring
- Connection string to'g'ri ekanligini tekshiring
- Database user yaratilganligini tekshiring

### 2. IP Whitelist Error

**Xatolik:** `MongoServerError: IP not whitelisted`

**Yechim:**
1. MongoDB Atlas → Network Access
2. **Add IP Address** → **Allow Access from Anywhere** (`0.0.0.0/0`)
3. **Confirm**

### 3. Port Already in Use

**Xatolik:** `Error: listen EADDRINUSE: address already in use`

**Yechim:**
- Render.com avtomatik port beradi
- `PORT` environment variable to'g'ri sozlanganligini tekshiring
- Backend kodda `process.env.PORT` ishlatilganligini tekshiring

### 4. Telegram Bot Not Working

**Xatolik:** Telegram bot xabar yubormayapti

**Yechim:**
- `TELEGRAM_BOT_TOKEN` to'g'ri ekanligini tekshiring
- `TELEGRAM_CHAT_ID` to'g'ri ekanligini tekshiring
- Botga `/start` yuborganingizni tekshiring
- Logs da xatolarni tekshiring

## 📝 Backend Test Qilish

### 1. Health Check

```bash
curl https://rentcar-backend-xxxx.onrender.com/api/cars
```

### 2. Browser da Test

Brauzerda oching:
```
https://rentcar-backend-xxxx.onrender.com/api/cars
```

JSON response ko'rinishi kerak:
```json
{
  "success": true,
  "count": 45,
  "data": [...]
}
```

### 3. Postman da Test

1. **GET** `https://rentcar-backend-xxxx.onrender.com/api/cars`
2. **GET** `https://rentcar-backend-xxxx.onrender.com/api/stats`
3. **POST** `https://rentcar-backend-xxxx.onrender.com/api/contact`

## 🔧 Backend Kodi

Backend `index.js` faylida quyidagilar bo'lishi kerak:

```javascript
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server http://localhost:${PORT} da ishlamoqda`);
  console.log(`🔗 API: http://localhost:${PORT}/api`);
});
```

## 📊 Logs Ko'rish

Render.com dashboard da:
1. **Backend service** ni tanlang
2. **Logs** tab ni oching
3. Real-time logs ko'ring

## ✅ Deploy Checklist

- [ ] GitHub repository tayyor
- [ ] Backend papkasi mavjud
- [ ] `backend/package.json` to'g'ri
- [ ] `backend/index.js` to'g'ri
- [ ] MongoDB Atlas IP whitelist sozlangan
- [ ] Render.com da web service yaratilgan
- [ ] Root Directory: `backend` sozlangan
- [ ] Environment variables qo'shilgan
- [ ] Deploy muvaffaqiyatli
- [ ] API endpoints ishlayapti
- [ ] MongoDB ga ulanmoqda
- [ ] Telegram bot ishlayapti

## 🎯 CORS Sozlamalari

Agar frontend alohida domain da bo'lsa, backend da CORS sozlang:

```javascript
import cors from 'cors';

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:8080',
    'https://your-frontend.onrender.com'
  ],
  credentials: true
}));
```

## 🚀 Auto Deploy

GitHub ga push qilganingizda avtomatik deploy bo'ladi:

```bash
git add .
git commit -m "Backend yangilandi"
git push origin main
```

Render.com avtomatik ravishda yangi commit ni deploy qiladi.

## 📝 Muhim Eslatmalar

1. **Free Plan:** 15 daqiqa ishlamaslik bilan server to'xtaydi
2. **Cold Start:** Birinchi request 30-60 soniya olishi mumkin
3. **MongoDB Atlas:** IP whitelist `0.0.0.0/0` bo'lishi kerak
4. **Environment Variables:** Production da to'g'ri sozlangan bo'lishi kerak

## 🎉 Tayyor!

Backend alohida deploy qilindi va ishlayapti! 🚀

**Keyingi Qadam:** Frontend ni deploy qiling va backend URL ni ulang.
