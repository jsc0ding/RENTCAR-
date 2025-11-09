# 🚀 Deployment Qo'llanmasi

Backend orqali Frontend ni serve qilish va deploy qilish qo'llanmasi.

## 📋 Arxitektura

```
Backend Server (Port 5000)
├── API Endpoints (/api/*)
└── Static Files (frontend/dist/*)
```

Backend bir vaqtda:
1. API endpoints ni serve qiladi (`/api/*`)
2. Frontend static files ni serve qiladi (boshqa barcha yo'llar)

## 🏗️ Local Production Test

### 1. Build va Ishga Tushirish

```bash
npm start
```

Bu komanda avtomatik ravishda:
1. Frontend ni build qiladi (`npm run build`)
2. Backend serverni ishga tushiradi (`npm start --prefix backend`)

### 2. Test Qilish

Brauzerda oching: `http://localhost:5000`

- ✅ Frontend sahifalar: `http://localhost:5000`
- ✅ API: `http://localhost:5000/api/cars`
- ✅ Admin panel: Logo 3x + parol: `87654321`

## 🌐 Production Deploy

### Render.com

#### 1. GitHub Repository

Loyihani GitHub ga push qiling:

```bash
git add .
git commit -m "Production ready"
git push origin main
```

#### 2. Render.com Sozlash

1. [Render.com](https://render.com) ga kiring
2. **New +** → **Web Service**
3. GitHub repository ni ulang
4. Sozlamalar:

```yaml
Name: car-rental
Environment: Node
Region: Frankfurt (yoki yaqin)
Branch: main
Root Directory: backend
Build Command: cd .. && npm run build && cd backend && npm install
Start Command: npm start
```

#### 3. Environment Variables

Render.com da quyidagi environment variables ni qo'shing:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id
```

#### 4. Deploy

**Create Web Service** tugmasini bosing. Render avtomatik deploy qiladi.

### Vercel (Alternative)

Vercel faqat frontend uchun yaxshi. Backend uchun Render yoki Railway ishlatish tavsiya etiladi.

### Railway.app

1. [Railway.app](https://railway.app) ga kiring
2. **New Project** → **Deploy from GitHub repo**
3. Repository ni tanlang
4. Sozlamalar:

```yaml
Build Command: npm run build
Start Command: cd backend && npm start
```

5. Environment variables qo'shing

### Heroku

```bash
# Heroku CLI o'rnatish
npm install -g heroku

# Login
heroku login

# App yaratish
heroku create car-rental-app

# Environment variables
heroku config:set MONGODB_URI=your_uri
heroku config:set TELEGRAM_BOT_TOKEN=your_token
heroku config:set TELEGRAM_CHAT_ID=your_chat_id
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

## 🔧 Production Sozlamalari

### Backend (index.js)

Backend allaqachon production uchun sozlangan:

```javascript
// Static fayllarni serve qilish
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// React routing uchun
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ message: 'API not found' });
  }
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});
```

### Frontend (src/lib/api.ts)

API URL avtomatik sozlanadi:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');
```

- **Development:** `http://localhost:5000/api`
- **Production:** `/api` (relative URL)

## 📊 Deploy Tekshirish

Deploy qilingandan keyin:

1. **Frontend:** `https://your-app.onrender.com`
2. **API:** `https://your-app.onrender.com/api/cars`
3. **Health Check:** `https://your-app.onrender.com/api/stats`

## 🐛 Muammolarni Hal Qilish

### Build xatoligi

```bash
# Local da test qiling
npm run build
npm start
```

### API ulanmayapti

Frontend `.env` faylida API URL ni tekshiring:
- Development: `VITE_API_URL=http://localhost:5000/api`
- Production: O'chirish yoki `/api` qo'yish

### Static files yuklanmayapti

Backend `index.js` da path to'g'ri ekanligini tekshiring:

```javascript
const frontendDistPath = path.join(__dirname, '../frontend/dist');
```

### MongoDB ulanmayapti

1. MongoDB Atlas da IP whitelist tekshiring (0.0.0.0/0 qo'shing)
2. Connection string to'g'ri ekanligini tekshiring
3. Environment variables to'g'ri sozlanganligini tekshiring

## 📝 Deploy Checklist

- [ ] Frontend build qilindi (`npm run build`)
- [ ] Local da test qilindi (`npm start`)
- [ ] Environment variables sozlandi
- [ ] MongoDB Atlas IP whitelist sozlandi
- [ ] GitHub ga push qilindi
- [ ] Deploy platformasi sozlandi
- [ ] Deploy muvaffaqiyatli bo'ldi
- [ ] Production da test qilindi
- [ ] API ishlayapti
- [ ] Frontend yuklanmoqda
- [ ] Admin panel ishlayapti
- [ ] Telegram bot xabar yubormoqda

## 🎉 Tayyor!

Loyiha production da ishlamoqda! 🚀

**Foydali Linklar:**
- [Render.com Docs](https://render.com/docs)
- [Railway.app Docs](https://docs.railway.app)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
