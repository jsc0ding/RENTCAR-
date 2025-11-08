# Filtrlarni Test Qilish Qo'llanmasi

## Yo'lovchilar Filtri

### Test Qadamlari:

1. **Avtomobillar sahifasiga o'ting** (`/cars`)

2. **Yo'lovchilar filtrini tanlang:**
   - "Barcha" - Barcha mashinalarni ko'rsatadi
   - "Kamida 2 kishi" - 2 yoki undan ko'p yo'lovchili mashinalar
   - "Kamida 4 kishi" - 4 yoki undan ko'p yo'lovchili mashinalar
   - "Kamida 5 kishi" - 5 yoki undan ko'p yo'lovchili mashinalar
   - "Kamida 7 kishi" - 7 yoki undan ko'p yo'lovchili mashinalar

3. **Natijani tekshiring:**
   - Mashinalar soni o'zgarishi kerak
   - Faqat tanlangan yo'lovchilar soniga mos mashinalar ko'rinishi kerak

### Debug Loglar

Browser Console'da (F12) quyidagi loglarni ko'rishingiz mumkin:

```
Yo'lovchilar filtri: 5 → 5
Filter parameters: { minPassengers: 5 }
API response: { success: true, data: [...] }
Topilgan mashinalar: 3
```

### Misol Test:

**Test 1: 2 yo'lovchi**
- Filter: "Kamida 2 kishi"
- Natija: 2, 4, 5, 7 yo'lovchili mashinalar ko'rinadi

**Test 2: 5 yo'lovchi**
- Filter: "Kamida 5 kishi"
- Natija: Faqat 5 va 7 yo'lovchili mashinalar ko'rinadi

**Test 3: 7 yo'lovchi**
- Filter: "Kamida 7 kishi"
- Natija: Faqat 7 yo'lovchili mashinalar ko'rinadi

## Boshqa Filtrlar

### Kategoriya Filtri
- Dropdown'dan kategoriya tanlang
- Faqat tanlangan kategoriyaga mos mashinalar ko'rinadi

### Brend Filtri
- Dropdown'dan brend tanlang
- Faqat tanlangan brendga mos mashinalar ko'rinadi

### Narx Filtri
- Slider'ni suring
- Tanlangan narx oralig'idagi mashinalar ko'rinadi

### Qidiruv
- Mashina nomi, brend, model yoki kategoriya bo'yicha qidiring
- Natijalar real-time yangilanadi

## Bir Nechta Filtrni Birga Ishlatish

Misol:
1. Kategoriya: "Luxury SUV"
2. Brend: "BMW"
3. Yo'lovchilar: "Kamida 5 kishi"
4. Narx: $100 - $300

Natija: Faqat barcha shartlarga mos mashinalar ko'rinadi

## Filtrlarni Tozalash

"Filtrlarni tozalash" tugmasini bosing - barcha filtrlar default holatga qaytadi.

## Muammolarni Hal Qilish

### Hech qanday mashina ko'rinmayapti
- Filtrlar juda qattiq bo'lishi mumkin
- "Filtrlarni tozalash" tugmasini bosing
- Filtrlarni birma-bir o'zgartiring

### Noto'g'ri mashinalar ko'rinmoqda
- Browser Console'ni oching (F12)
- Filter parameters va API response'ni tekshiring
- Server loglarini tekshiring

### Server Loglari

Server konsolida quyidagi loglarni ko'rishingiz mumkin:

```
Received query parameters: { minPassengers: '5' }
Filtering cars with at least 5 passengers
Applied filter: { available: true, passengers: { '$gte': 5 } }
Found cars: 3
```
