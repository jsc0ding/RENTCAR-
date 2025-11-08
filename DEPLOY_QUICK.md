# Render'ga Deploy - Tezkor Qo'llanma

## 1. GitHub'ga Push Qiling

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

## 2. Render.com'ga Kiring

1. https://render.com'ga kiring
2. GitHub bilan login qiling

## 3. Web Service Yarating

1. Dashboard → "New +" → "Web Service"
2. GitHub repository'ni tanlang
3. Settings:
   - **Name:** luxrent-app
   - **Region:** Frankfurt (yoki yaqin)
   - **Branch:** main
   - **Root Directory:** (bo'sh qoldiring)
   - **Environment:** Node
   - **Build Command:** `npm install && npm run build && cd server && npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free

## 4. Environment Variables Qo'shing

"Environment" bo'limida quyidagilarni qo'shing:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://Nizomjon:lr7KznYbG7UJrfrU@cluster1.mun3jsp.mongodb.net/carRental?retryWrites=true&w=majority
TELEGRAM_BOT_TOKEN=8497545620:AAF8nnCD23faZOlE_LVOsxw2rX1DKPxxiBA
TELEGRAM_CHAT_ID=7240818738
```

## 5. Deploy Qiling

"Create Web Service" tugmasini bosing!

## 6. Kutish

- Build jarayoni: 5-10 daqiqa
- Deploy tugagach URL olinadi: https://luxrent-app.onrender.com

## 7. Tekshirish

1. URL'ni oching
2. Avtomobillar ko'rinishini tekshiring
3. Ijaraga olishni sinab ko'ring
4. Admin panelga kiring (Logo 3 marta, parol: 87654321)

## Muhim!

### MongoDB Atlas IP Whitelist

1. MongoDB Atlas'ga kiring
2. Network Access → Add IP Address
3. "Allow Access from Anywhere" (0.0.0.0/0)
4. Confirm

### Free Tier Limitations

- ⏰ 750 soat/oy (31 kun)
- 💤 15 daqiqa inactivity'dan keyin sleep mode
- 🔄 Birinchi request'da 30 soniya kutish
- 💾 512 MB RAM

### Sleep Mode'dan Qochish

Render free tier'da 15 daqiqa ishlatilmasa sleep mode'ga o'tadi. Buning oldini olish uchun:

1. **UptimeRobot** (bepul): https://uptimerobot.com
2. Har 5 daqiqada ping qilish
3. Yoki Render Starter plan ($7/oy)

## Yangilash

Har safar GitHub'ga push qilganingizda avtomatik deploy bo'ladi:

```bash
git add .
git commit -m "Update"
git push origin main
```

## Xatoliklarni Ko'rish

Render Dashboard → Logs → Real-time logs

## Muvaffaqiyat!

✅ Frontend va Backend bitta joyda
✅ HTTPS avtomatik
✅ Automatic deploys
✅ Free hosting

URL: https://luxrent-app.onrender.com (sizniki boshqacha bo'ladi)
