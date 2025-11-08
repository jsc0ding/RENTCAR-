# Render.com'ga Deploy Qilish Qo'llanmasi

## Render'da Frontend va Backend'ni Birgalikda Deploy Qilish

### 1. Loyihani Tayyorlash

#### package.json'ga scriptlar qo'shish:

Ildiz papkadagi `package.json` faylini yangilang:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "server": "node server/index.js",
    "start": "node server/index.js"
  }
}
```

#### render.yaml yaratish:

Loyiha ildizida `render.yaml` fayl yarating:

```yaml
services:
  - type: web
    name: luxrent-app
    env: node
    buildCommand: npm install && npm run build && cd server && npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: MONGODB_URI
        sync: false
      - key: PORT
        value: 10000
      - key: TELEGRAM_BOT_TOKEN
        sync: false
      - key: TELEGRAM_CHAT_ID
        sync: false
```

### 2. Server'ni Yangilash

`server/index.js` faylida static files serve qilish:

```javascript
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api', apiRoutes);

// Serve static files from React build
app.use(express.static(path.join(__dirname, '../dist')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});
```

### 3. Environment Variables

Render Dashboard'da quyidagi environment variables'larni qo'shing:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/carRental
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

### 4. MongoDB Atlas

1. MongoDB Atlas'da IP Whitelist'ga `0.0.0.0/0` qo'shing (barcha IP'lar)
2. Database User yarating
3. Connection String'ni Render'ga qo'shing

### 5. Deploy Qilish

#### GitHub orqali:

1. Loyihani GitHub'ga push qiling
2. Render.com'ga kiring
3. "New +" → "Web Service"
4. GitHub repository'ni tanlang
5. Settings:
   - Name: luxrent-app
   - Environment: Node
   - Build Command: `npm install && npm run build && cd server && npm install`
   - Start Command: `npm start`
6. Environment Variables qo'shing
7. "Create Web Service" bosing

#### Manual Deploy:

```bash
# Build qilish
npm run build

# Server dependencies
cd server
npm install

# Deploy
# Render automatically deploys from GitHub
```

### 6. API URL'ni Yangilash

`src/lib/api.ts` faylida:

```typescript
const API_BASE_URL = import.meta.env.PROD 
  ? '/api'  // Production'da relative URL
  : 'http://localhost:5000/api';  // Development'da local
```

### 7. Tekshirish

Deploy tugagandan keyin:

1. Render'dan URL oling (masalan: https://luxrent-app.onrender.com)
2. Browser'da oching
3. Barcha funksiyalarni tekshiring:
   - Avtomobillar ko'rinishi
   - Ijaraga olish
   - Admin panel
   - Telegram xabarlari

### 8. Muammolarni Hal Qilish

#### "Cannot GET /api/cars"
- API routes to'g'ri sozlanganini tekshiring
- Server loglarga qarang

#### "CORS Error"
- CORS settings'ni tekshiring
- Origin'ni to'g'ri sozlang

#### "MongoDB Connection Failed"
- MONGODB_URI to'g'ri ekanligini tekshiring
- IP Whitelist'ni tekshiring

#### "Build Failed"
- Dependencies to'liq o'rnatilganini tekshiring
- Build command to'g'ri ekanligini tekshiring

### 9. Optimizatsiya

#### Caching:
```javascript
app.use(express.static(path.join(__dirname, '../dist'), {
  maxAge: '1d',
  etag: true
}));
```

#### Compression:
```bash
npm install compression
```

```javascript
import compression from 'compression';
app.use(compression());
```

### 10. Monitoring

Render Dashboard'da:
- Logs'ni kuzating
- Metrics'ni tekshiring
- Alerts sozlang

## Xulosa

✅ Frontend va Backend bitta service'da
✅ Automatic deploys GitHub'dan
✅ Free tier mavjud (750 soat/oy)
✅ HTTPS avtomatik
✅ Custom domain qo'shish mumkin

## Qo'shimcha

### Free Tier Limitations:
- 750 soat/oy
- 512 MB RAM
- Shared CPU
- 15 daqiqa inactivity'dan keyin sleep mode

### Upgrade:
- $7/oy - 1 GB RAM
- $25/oy - 2 GB RAM
- Custom domains
- No sleep mode
