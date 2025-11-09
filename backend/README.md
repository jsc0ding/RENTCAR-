# Car Rental Backend API

Express + MongoDB + Mongoose bilan qurilgan avtomobil ijarasi backend API.

## Texnologiyalar

- Node.js
- Express.js
- MongoDB
- Mongoose
- Telegram Bot API
- CORS
- dotenv

## O'rnatish

```bash
npm install
```

## Ishga tushirish

Development rejimida (nodemon bilan):
```bash
npm run dev
```

Production rejimida:
```bash
npm start
```

## Environment Variables

`.env` faylini yarating va quyidagi o'zgaruvchilarni qo'shing:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id
NODE_ENV=development
```

## API Endpoints

### Cars

- `GET /api/cars` - Barcha avtomobillarni olish
- `GET /api/cars/:id` - Bitta avtomobilni olish
- `POST /api/cars` - Yangi avtomobil qo'shish
- `PUT /api/cars/:id` - Avtomobilni yangilash
- `DELETE /api/cars/:id` - Avtomobilni o'chirish
- `POST /api/cars/reset-all` - Barcha avtomobillarni qaytarish

### Filters

- `GET /api/filters` - Kategoriya, brend va joylashuvlarni olish

### Statistics

- `GET /api/stats` - Statistika ma'lumotlarini olish

### Contact

- `POST /api/contact` - Aloqa formasi xabarini yuborish

## Query Parameters

`GET /api/cars` uchun:
- `category` - Kategoriya bo'yicha filter
- `brand` - Brend bo'yicha filter
- `minPrice` - Minimal narx
- `maxPrice` - Maksimal narx
- `available` - Mavjudlik (true/false)
- `minPassengers` - Minimal yo'lovchilar soni
- `search` - Qidiruv so'zi

## Telegram Bot

Backend Telegram bot orqali quyidagi xabarlarni yuboradi:
- Yangi bron qilingan avtomobil haqida
- Aloqa formasi orqali yuborilgan xabarlar

## Database Schema

### Car Model

```javascript
{
  name: String,
  brand: String,
  model: String,
  year: Number,
  price: Number,
  category: String,
  passengers: Number,
  transmission: String,
  fuel: String,
  engine: String,
  color: String,
  mileage: Number,
  features: [String],
  image: String,
  available: Boolean,
  rating: Number,
  location: String,
  timestamps: true
}
```
