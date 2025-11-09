# 🚀 Render.com Deploy Qo'llanmasi

## 📋 Render.com Sozlamalari

### 1. Build Command

```bash
npm run build
```

Bu komanda:
1. Frontend dependencies ni o'rnatadi (`npm install --prefix frontend`)
2. Frontend ni build qiladi (`npm run build --prefix frontend`)

### 2. Start Command

```bash
npm start
```

Bu komanda:
1. Backend dependencies ni o'rnatadi (`npm install --prefix backend`)
2. Backend serverni ishga tushiradi (`npm start --prefix backend`)
3. Frontend static files ni serve qiladi

### 3. Environment Variables

Render.com dashboard da quyidagi environment variables ni qo'shing:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://Nizomjon:lr7KznYbG7UJrfrU@cluster1.mun3jsp.mongodb.net/carRental?retryWrites=true&w=majority
TELEGRAM_BOT_TOKEN=8497545620:AAF8nnCD23faZOlE_LVOsxw2rX1DKPxxiBA
TELEGRAM_CHAT_ID=7240818738
```

## 🔧 Render.com Sozlash Qadamlari

### 1. Render.com ga Kiring

https://render.com → Sign In

### 2. Yangi Web Service Yarating

1. Dashboard → **New +** → **Web Service**
2. **Connect a repository** → GitHub repository ni tanlang
3. Repository: `jsc0ding/RENTCAR-`

### 3. Sozlamalar

```yaml
Name: car-rental
Environment: Node
Region: Frankfurt (yoki yaqin)
Branch: main
Root Directory: (bo'sh qoldiring)

Build Command: npm run build
Start Command: npm start

Instance Type: Free
```

### 4. Environment Variables Qo'shish

**Environment** bo'limida **Add Environment Variable** tugmasini bosing:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `MONGODB_URI` | `mongodb+srv://Nizomjon:lr7KznYbG7UJrfrU@cluster1.mun3jsp.mongodb.net/carRental` |
| `TELEGRAM_BOT_TOKEN` | `8497545620:AAF8nnCD23faZOlE_LVOsxw2rX1DKPxxiBA` |
| `TELEGRAM_CHAT_ID` | `7240818738` |

### 5. Deploy

**Create Web Service** tugmasini bosing.

Render avtomatik ravishda:
1. Repository ni clone qiladi
2. Dependencies ni o'rnatadi
3. Frontend ni build qiladi
4. Backend serverni ishga tushiradi

## 📊 Deploy Jarayoni

```
1. Cloning repository...
2. Installing dependencies...
3. Building frontend...
4. Starting backend...
5. ✅ Deploy successful!
```

## 🌐 Natija

Deploy muvaffaqiyatli bo'lgandan keyin:

- **URL:** `https://car-rental-xxxx.onrender.com`
- **Frontend:** `https://car-rental-xxxx.onrender.com`
- **API:** `https://car-rental-xxxx.onrender.com/api`

## 🐛 Muammolarni Hal Qilish

### Build Failed

Agar build xatolik bersa:

1. **Logs ni tekshiring:** Render dashboard → Logs
2. **Dependencies:** `npm install` to'g'ri ishlayotganini tekshiring
3. **Build command:** `npm run build` to'g'ri ekanligini tekshiring

### Server Crashed

Agar server crash bo'lsa:

1. **Environment variables:** Barcha variables to'g'ri ekanligini tekshiring
2. **MongoDB:** Connection string to'g'ri ekanligini tekshiring
3. **Port:** PORT environment variable `5000` ga o'rnatilganligini tekshiring

### Frontend Yuklanmayapti

Agar frontend yuklanmasa:

1. **Build:** Frontend build qilinganligini tekshiring (`frontend/dist` mavjud)
2. **Static files:** Backend static files ni serve qilayotganini tekshiring
3. **Logs:** Backend logs da xatolarni tekshiring

## 📝 Muhim Eslatmalar

1. **Free Plan:** Render.com free plan 15 daqiqa ishlamaslik bilan serveringizni to'xtatadi
2. **Cold Start:** Birinchi request 30-60 soniya olishi mumkin
3. **MongoDB Atlas:** IP whitelist da `0.0.0.0/0` qo'shilganligini tekshiring
4. **Auto Deploy:** GitHub ga push qilganingizda avtomatik deploy bo'ladi

## ✅ Deploy Checklist

- [ ] GitHub repository tayyor
- [ ] `package.json` scripts to'g'ri
- [ ] Frontend build qilinadi
- [ ] Backend dependencies o'rnatiladi
- [ ] Environment variables sozlangan
- [ ] MongoDB Atlas IP whitelist sozlangan
- [ ] Render.com da web service yaratilgan
- [ ] Deploy muvaffaqiyatli
- [ ] Frontend yuklanmoqda
- [ ] API ishlayapti
- [ ] Telegram bot xabar yubormoqda

## 🎉 Tayyor!

Loyiha Render.com da ishlamoqda! 🚀

**Foydali Linklar:**
- [Render.com Docs](https://render.com/docs)
- [Troubleshooting](https://render.com/docs/troubleshooting-deploys)
- [Node.js on Render](https://render.com/docs/deploy-node-express-app)
