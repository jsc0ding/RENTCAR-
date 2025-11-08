# Tezkor Yechim - Backend Ishlamayapti

## Muammo
❌ Backend ishlamayapti chunki MongoDB o'rnatilmagan

## Eng Tez Yechim: MongoDB Atlas (5 daqiqa)

### 1. MongoDB Atlas'ga kiring
https://www.mongodb.com/cloud/atlas/register

### 2. Bepul Cluster yarating
- "Create a Free Cluster" bosing
- M0 (Free) tanlang
- Region: tanlang (masalan: AWS / Frankfurt)
- Cluster Name: carRental
- "Create Cluster" bosing

### 3. Database User yarating
- Security → Database Access
- "Add New Database User"
- Username: admin
- Password: admin123 (yoki boshqa)
- "Add User" bosing

### 4. IP Whitelist
- Security → Network Access
- "Add IP Address"
- "Allow Access from Anywhere" (0.0.0.0/0)
- "Confirm" bosing

### 5. Connection String oling
- Clusters → Connect
- "Connect your application"
- Driver: Node.js
- Version: 4.1 or later
- Connection string'ni nusxalang

### 6. .env faylini yangilang
Loyiha papkasida `.env` fayl yarating:

```env
MONGODB_URI=mongodb+srv://admin:admin123@cluster0.xxxxx.mongodb.net/carRental?retryWrites=true&w=majority
PORT=5000
TELEGRAM_BOT_TOKEN=your_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

**Muhim:** `xxxxx` ni o'z cluster manzilingiz bilan almashtiring!

### 7. Server'ni ishga tushiring

```bash
# Terminal 1: Backend
cd server
npm install
node index.js

# Terminal 2: Frontend (yangi terminal)
npm run dev
```

### 8. Tekshirish

Browser'da oching:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000/api/cars

## Agar Ishlasa

✅ Backend ishga tushdi!
✅ MongoDB Atlas'ga ulandi!
✅ Endi avtomobillarni qaytarishingiz mumkin!

## Admin Panel

1. Logo'ni 3 marta bosing
2. Parol: 87654321
3. "Bandlovlar" tab'ini oching
4. "Barchasini qaytarish" bosing

## Agar Ishlamasa

### Xato: "ECONNREFUSED"
- MongoDB Atlas IP whitelist'ni tekshiring
- Connection string to'g'ri ekanligini tekshiring

### Xato: "Authentication failed"
- Username va password to'g'ri ekanligini tekshiring
- Database user yaratilganligini tekshiring

### Xato: "Port 5000 already in use"
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

## Boshqa Variant: Local MongoDB

Agar local MongoDB o'rnatmoqchi bo'lsangiz:
- `MONGODB_SETUP.md` faylini o'qing
- MongoDB Community Server yuklab oling
- O'rnating va ishga tushiring

## Yordam Kerakmi?

1. Server loglarini tekshiring
2. Browser Console'ni tekshiring (F12)
3. .env faylini tekshiring
4. MongoDB Atlas Dashboard'ni tekshiring
