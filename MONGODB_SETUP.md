# MongoDB O'rnatish va Ishga Tushirish

## Muammo
Backend ishlamayapti chunki MongoDB o'rnatilmagan yoki ishlamayapti.

## Yechim 1: MongoDB O'rnatish (Tavsiya etiladi)

### Windows uchun:

1. **MongoDB Community Server yuklab oling:**
   - https://www.mongodb.com/try/download/community
   - Windows versiyasini tanlang
   - MSI installer yuklab oling

2. **O'rnating:**
   - Installer'ni ishga tushiring
   - "Complete" setup'ni tanlang
   - "Install MongoDB as a Service" ni belgilang
   - "Install MongoDB Compass" ni belgilang (GUI)

3. **Tekshirish:**
   ```bash
   mongod --version
   ```

4. **Ishga tushirish:**
   - Service sifatida avtomatik ishga tushadi
   - Yoki qo'lda: `net start MongoDB`

### MongoDB Compass (GUI):
- MongoDB Compass'ni oching
- Connection string: `mongodb://localhost:27017`
- Connect bosing

## Yechim 2: MongoDB Atlas (Cloud - Bepul)

Agar local MongoDB o'rnatishni xohlamasangiz:

1. **MongoDB Atlas'ga ro'yxatdan o'ting:**
   - https://www.mongodb.com/cloud/atlas/register
   - Bepul M0 cluster yarating

2. **Connection String oling:**
   - Cluster'da "Connect" bosing
   - "Connect your application" tanlang
   - Connection string'ni nusxalang

3. **.env faylini yangilang:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/carRental
   ```

## Yechim 3: Docker (Tez va Oson)

Agar Docker o'rnatilgan bo'lsa:

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## Server'ni Ishga Tushirish

MongoDB ishga tushgandan keyin:

```bash
# Terminal 1: Backend
cd server
npm install
node index.js

# Terminal 2: Frontend
npm run dev
```

## Tekshirish

### MongoDB ishlayaptimi?
```bash
# Windows
net start MongoDB

# Yoki
mongosh
```

### Backend ishlayaptimi?
```bash
curl http://localhost:5000/api/cars
```

## Xatoliklarni Tuzatish

### "ECONNREFUSED" xatosi
- MongoDB ishlamayapti
- MongoDB service'ni ishga tushiring: `net start MongoDB`

### "Authentication failed"
- .env faylida MONGODB_URI to'g'ri ekanligini tekshiring
- MongoDB Atlas uchun IP whitelist'ga qo'shing

### Port band
- 27017 port band bo'lsa, boshqa port ishlatng:
  ```
  mongod --port 27018
  ```

## Hozirgi Holat

Sizda MongoDB o'rnatilmagan. Quyidagi variantlardan birini tanlang:

1. ✅ **MongoDB Community Server o'rnating** (Tavsiya)
2. ✅ **MongoDB Atlas ishlatng** (Cloud, bepul)
3. ✅ **Docker ishlatng** (Agar Docker bor bo'lsa)

## Keyingi Qadamlar

1. MongoDB'ni o'rnating yoki Atlas'ga ro'yxatdan o'ting
2. Server'ni ishga tushiring: `node server/index.js`
3. Frontend'ni ishga tushiring: `npm run dev`
4. Admin panelga kiring va avtomobillarni qaytaring

## Yordam

Agar muammo davom etsa:
- MongoDB loglarini tekshiring
- Server loglarini tekshiring
- .env faylini tekshiring
