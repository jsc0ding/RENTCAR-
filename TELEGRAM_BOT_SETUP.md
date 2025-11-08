# Telegram Bot Sozlash Qo'llanmasi

## 1. Telegram Bot Yaratish

### BotFather orqali bot yaratish:

1. Telegram'da **@BotFather** ni qidiring va ochng
2. `/newbot` buyrug'ini yuboring
3. Bot uchun nom kiriting (masalan: `LuxRent Notifications`)
4. Bot uchun username kiriting (masalan: `luxrent_notifications_bot`)
5. BotFather sizga **Bot Token** beradi. Uni saqlang!

**Misol Token:** `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`

## 2. Chat ID Olish

### O'z Telegram ID'ingizni bilish:

1. Telegram'da **@userinfobot** ni qidiring va ochng
2. `/start` buyrug'ini yuboring
3. Bot sizga **Chat ID** ni ko'rsatadi

**Misol Chat ID:** `123456789`

## 3. .env Faylini Sozlash

Loyiha ildiz papkasida `.env` fayl yarating:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/carRental

# Server
PORT=5000

# Telegram Bot
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=123456789
```

**Muhim:** `.env` faylini `.gitignore` ga qo'shing!

## 4. Server'ni Qayta Ishga Tushirish

```bash
# Server'ni to'xtatish (Ctrl+C)
# Keyin qayta ishga tushirish:
npm run dev
```

Agar hammasi to'g'ri sozlangan bo'lsa, konsolda ko'rasiz:
```
✅ Telegram bot sozlangan
```

## 5. Test Qilish

### Mashina ijaraga olish testi:
1. Saytda biror mashinani ijaraga oling
2. Telegram'da xabar kelishi kerak:
```
🚗 Yangi ijaraga olingan mashina
Nomi: BMW X7
Brend: BMW
Model: X7
...
```

### Aloqa formasi testi:
1. "Aloqa" sahifasiga o'ting
2. Formani to'ldiring va yuboring
3. Telegram'da xabar kelishi kerak:
```
📧 Yangi Xabar!
👤 Ism: ...
📱 Telefon: ...
...
```

## Xatoliklarni Tuzatish

### "Telegram bot ishlamayapti" xabari
- `.env` faylida `TELEGRAM_BOT_TOKEN` va `TELEGRAM_CHAT_ID` to'g'ri kiritilganini tekshiring
- Server'ni qayta ishga tushiring

### Xabarlar kelmayapti
- Bot Token to'g'ri ekanligini tekshiring
- Chat ID to'g'ri ekanligini tekshiring
- Bot'ni Telegram'da `/start` buyrug'i bilan ishga tushiring

### "Chat not found" xatosi
- Chat ID noto'g'ri kiritilgan
- @userinfobot dan qayta Chat ID oling

## Qo'shimcha Sozlamalar

### Bir nechta admin'ga xabar yuborish:
`.env` faylida vergul bilan ajratib yozing:
```env
TELEGRAM_CHAT_ID=123456789,987654321,555555555
```

### Xabar formatini o'zgartirish:
`server/index.js` faylida `sendTelegramNotification` funksiyasini tahrirlang.

## Xavfsizlik

⚠️ **Muhim:**
- Bot Token'ni hech kimga ko'rsatmang
- `.env` faylini GitHub'ga yuklamang
- `.gitignore` da `.env` borligini tekshiring
