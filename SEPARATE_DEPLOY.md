# 🚀 Backend va Frontend Alohida Deploy Qo'llanmasi

Bu qo'llanma backend va frontend ni Render.com da alohida deploy qilish uchun.

## 📋 Struktura

```
Backend Service (Web Service)
├── API Endpoints (/api/*)
└── Port: 5000 (yoki Render tomonidan berilgan)

Frontend Service (Static Site yoki Web Service)
├── Static Files (dist/*)
└── API URL: Backend URL ga sozlanadi
```

## 🔧 Backend Deploy

### 1. Render.com da Backend Service Yaratish

1. **New +** → **Web Service**
2. GitHub repository ni ulang
3. Sozlamalar:

```yaml
Name: car-rental-backend
Environment: Node
Region: Frankfurt (yoki yaqin)
Branch: main
Root Directory: backend

Build Command: npm install
Start Command: npm start

Instance Type: Free
```

### 2. Backend Environment Variables

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/carRental
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id
FRONTEND_URL=https://your-frontend.onrender.com
```

**Muhim:** `FRONTEND_URL` ni frontend URL ga o'rnating (keyinroq sozlanadi).

### 3. Backend URL ni Olish

Deploy qilingandan keyin backend URL ni oling:
- `https://car-rental-backend-xxxx.onrender.com`

## 🎨 Frontend Deploy

### Variant 1: Static Site (Tavsiya etiladi)

1. **New +** → **Static Site**
2. GitHub repository ni ulang
3. Sozlamalar:

```yaml
Name: car-rental-frontend
Branch: main
Root Directory: frontend

Build Command: npm install && npm run build
Publish Directory: dist
```

### Variant 2: Web Service

1. **New +** → **Web Service**
2. GitHub repository ni ulang
3. Sozlamalar:

```yaml
Name: car-rental-frontend
Environment: Node
Region: Frankfurt (yoki yaqin)
Branch: main
Root Directory: frontend

Build Command: npm install && npm run build
Start Command: npm run preview

Instance Type: Free
```

### 4. Frontend Environment Variables

**Static Site uchun:**
- Environment variables qo'shish mumkin emas
- Build vaqtida `VITE_API_URL` ni sozlash kerak

**Web Service uchun:**
```env
VITE_API_URL=https://car-rental-backend-xxxx.onrender.com/api
```

### 5. Frontend Build Sozlamalari

Frontend build qilishdan oldin `.env.production` fayl yarating:

```bash
cd frontend
```

`.env.production` fayl yarating:
```env
VITE_API_URL=https://car-rental-backend-xxxx.onrender.com/api
```

Yoki build vaqtida:
```bash
VITE_API_URL=https://car-rental-backend-xxxx.onrender.com/api npm run build
```

## 📝 Deploy Qadamlari

### 1. Backend Deploy

1. Render.com → **New +** → **Web Service**
2. Repository ni ulang
3. Sozlamalarni to'ldiring (yuqorida)
4. Environment variables qo'shing
5. **Create Web Service**
6. Backend URL ni oling: `https://car-rental-backend-xxxx.onrender.com`

### 2. Frontend Deploy

#### Static Site (Tavsiya etiladi):

1. Frontend `.env.production` fayl yarating:
   ```env
   VITE_API_URL=https://car-rental-backend-xxxx.onrender.com/api
   ```

2. Local da build qiling:
   ```bash
   cd frontend
   npm install
   npm run build
   ```

3. `.env.production` ni commit qiling (yoki Render build command da qo'shing)

4. Render.com → **New +** → **Static Site**
5. Repository ni ulang
6. Sozlamalarni to'ldiring
7. **Create Static Site**

#### Yoki Render Build Command da:

```bash
cd frontend && VITE_API_URL=https://car-rental-backend-xxxx.onrender.com/api npm install && npm run build
```

### 3. Backend CORS Sozlash

Backend deploy qilingandan keyin, `FRONTEND_URL` ni yangilang:

```env
FRONTEND_URL=https://car-rental-frontend-xxxx.onrender.com
```

Yoki bir nechta URL:
```env
FRONTEND_URL=https://car-rental-frontend-xxxx.onrender.com,https://your-custom-domain.com
```

## 🔄 Deploy Jarayoni

### Backend:
```
1. Git push
2. Render build (npm install)
3. Render start (npm start)
4. Backend URL: https://car-rental-backend-xxxx.onrender.com
```

### Frontend:
```
1. Git push
2. Render build (npm install && npm run build)
3. Static files serve
4. Frontend URL: https://car-rental-frontend-xxxx.onrender.com
```

## ✅ Tekshirish

### Backend:
- `https://car-rental-backend-xxxx.onrender.com/api/health`
- `https://car-rental-backend-xxxx.onrender.com/api/cars`

### Frontend:
- `https://car-rental-frontend-xxxx.onrender.com`
- Browser console da API URL ni tekshiring
- API call'lar ishlayotganini tekshiring

## 🐛 Muammolarni Hal Qilish

### Frontend API ulanmayapti

1. **Browser console ni tekshiring:**
   - `🔗 API Configuration` log'ini ko'ring
   - `baseURL` to'g'ri ekanligini tekshiring

2. **Environment variable:**
   - `VITE_API_URL` to'g'ri sozlanganligini tekshiring
   - Build vaqtida sozlanganligini tekshiring

3. **CORS xatoligi:**
   - Backend `FRONTEND_URL` to'g'ri sozlanganligini tekshiring
   - Browser console da CORS xatoliklarini tekshiring

### Backend CORS xatoligi

1. **FRONTEND_URL ni tekshiring:**
   ```env
   FRONTEND_URL=https://car-rental-frontend-xxxx.onrender.com
   ```

2. **Backend log'larni tekshiring:**
   - CORS xatoliklari ko'rsatiladi

### Build xatoligi

1. **Frontend build:**
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **Backend build:**
   ```bash
   cd backend
   npm install
   ```

## 📊 Environment Variables Jadvali

### Backend:
| Key | Value | Izoh |
|-----|-------|------|
| `NODE_ENV` | `production` | |
| `PORT` | `5000` | Render avtomatik beradi |
| `MONGODB_URI` | `mongodb+srv://...` | MongoDB Atlas URI |
| `TELEGRAM_BOT_TOKEN` | `...` | Telegram bot token |
| `TELEGRAM_CHAT_ID` | `...` | Telegram chat ID |
| `FRONTEND_URL` | `https://...` | Frontend URL (CORS uchun) |

### Frontend:
| Key | Value | Izoh |
|-----|-------|------|
| `VITE_API_URL` | `https://.../api` | Backend API URL |

## 🎉 Tayyor!

Endi backend va frontend alohida deploy qilingan va ishlayapti!

**Foydali Linklar:**
- [Render.com Docs](https://render.com/docs)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)


