# Admin Panel Kirish Qo'llanmasi

## Admin Panelga Kirish

### 1. Yashirin Kirish
Admin panel havfsizlik uchun navbar'da ko'rinmaydi. Kirish uchun:

1. **LuxRent** logosini (chap yuqori burchakdagi) **3 marta** tez bosing (2 soniya ichida)
2. Parol dialog oynasi ochiladi
3. Parolni kiriting: `87654321`
4. "Kirish" tugmasini bosing

### 2. Avtomatik Chiqish
- Admin panelga kirganingizdan keyin **sessiya avtomatik tozalanadi**
- Har safar admin panelga kirish uchun qayta parol kiritishingiz kerak
- Bu xavfsizlikni oshiradi

### 3. Admin Paneldan Chiqish
Admin panelda ishlayotganingizda bosh sahifaga qaytish uchun:

1. **LuxRent** logosini yana **3 marta** bosing
2. Avtomatik ravishda bosh sahifaga qaytarilasiz
3. Sessiya tozalanadi

## Xavfsizlik

### Parol
- **Joriy parol:** `87654321`
- Parolni o'zgartirish uchun `src/utils/auth.ts` faylida `verifyAdminPassword` funksiyasini tahrirlang

### Himoya
- Admin panel URL orqali to'g'ridan-to'g'ri kirishga urinish sessiya tekshiriladi
- Agar sessiya yo'q bo'lsa, foydalanuvchi bosh sahifaga qaytariladi
- Navbar'da admin link yashirilgan

## Texnik Ma'lumotlar

### Fayllar
- `src/components/Navbar.tsx` - Logo'ni 3 marta bosish logikasi
- `src/pages/Admin.tsx` - Admin panel himoyasi
- `src/utils/auth.ts` - Autentifikatsiya funksiyalari

### LocalStorage
Sessiya ma'lumotlari `localStorage`da `luxrent_admin_session` kaliti bilan saqlanadi:
```json
{
  "authenticated": true,
  "timestamp": 1699999999999
}
```

### Parolni O'zgartirish
`src/utils/auth.ts` faylida:
```typescript
export const verifyAdminPassword = (password: string): boolean => {
  return password === 'YANGI_PAROL'; // Bu yerda o'zgartiring
};
```

## Foydalanish Misoli

1. Saytga kiring
2. LuxRent logosini 3 marta bosing
3. Parol: `87654321`
4. Admin panelda ishlang
5. Ishingiz tugagach "Chiqish" tugmasini bosing
