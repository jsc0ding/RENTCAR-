# Telegram Bot - Tezkor Boshlash

## 3 Qadam

### 1️⃣ Bot Yaratish
Telegram'da **@BotFather** ga:
```
/newbot
```
Bot nomi: `LuxRent Bot`
Username: `luxrent_bot` (yoki boshqa)

**Token oling** (masalan): `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`

### 2️⃣ Chat ID Olish
Telegram'da **@userinfobot** ga:
```
/start
```
**Chat ID oling** (masalan): `123456789`

### 3️⃣ .env Faylini Yaratish
Loyiha papkasida `.env` fayl yarating:

```env
MONGODB_URI=mongodb://localhost:27017/carRental
PORT=5000
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=123456789
```

## Ishga Tushirish

```bash
npm run dev
```

## Natija

✅ Mashina ijaraga olinganda → Telegram'ga xabar
✅ Aloqa formasi yuborilganda → Telegram'ga xabar

## Xabar Misollari

**Ijara xabari:**
```
🚗 Yangi ijaraga olingan mashina
Nomi: BMW X7
Brend: BMW
Narxi: 250/kun
Vaqt: 08.11.2024, 14:30
```

**Aloqa xabari:**
```
📧 Yangi Xabar!
👤 Ism: Alisher
📱 Telefon: +998901234567
📋 Mavzu: Savol
💬 Xabar: Mashina haqida ma'lumot...
```

## Muammo?

Agar xabarlar kelmasa:
1. `.env` faylini tekshiring
2. Server'ni qayta ishga tushiring
3. Bot'ni Telegram'da `/start` qiling

Batafsil: `TELEGRAM_BOT_SETUP.md`
