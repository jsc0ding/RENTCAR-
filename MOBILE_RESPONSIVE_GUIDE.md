# Mobile Responsive Qo'llanma

## O'rnatilgan kutubxonalar

### react-responsive
Turli ekran o'lchamlari uchun maxsus komponentlar yaratish uchun ishlatiladi.

```bash
npm install react-responsive
```

## Foydalanish

### 1. useMediaQuery Hook

`src/hooks/useMediaQuery.ts` faylida yaratilgan hook yordamida ekran o'lchamini aniqlash:

```typescript
import { useMediaQuery } from '@/hooks/useMediaQuery';

function MyComponent() {
  const { isMobile, isTablet, isDesktop, isSmallMobile } = useMediaQuery();

  return (
    <div>
      {isMobile && <p>Bu telefon uchun</p>}
      {isTablet && <p>Bu planshet uchun</p>}
      {isDesktop && <p>Bu desktop uchun</p>}
    </div>
  );
}
```

### 2. Tailwind CSS Responsive Classes

Loyihada Tailwind CSS responsive classlari ishlatilgan:

- **Mobile (default)**: `text-sm`, `p-4`, `gap-2`
- **Tablet (sm:)**: `sm:text-base`, `sm:p-6`, `sm:gap-4`
- **Desktop (md:, lg:)**: `md:text-lg`, `lg:grid-cols-3`

**Misol:**
```jsx
<div className="text-sm sm:text-base md:text-lg">
  Bu matn turli ekranlarda turli o'lchamda
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
  {/* Mobile: 1 ustun, Tablet: 2 ustun, Desktop: 3 ustun */}
</div>
```

## Breakpointlar

| Ekran turi | O'lcham | Tailwind prefix |
|------------|---------|-----------------|
| Kichik telefon | < 375px | - |
| Telefon | < 640px | default |
| Planshet | 640px - 1024px | sm: |
| Desktop | > 1024px | lg:, xl: |

## Responsive Komponentlar

### CarCard
- Mobile: 1 ustun, kichik rasmlar, vertikal layout
- Tablet: 2 ustun
- Desktop: 3 ustun

### Modallar (BookingModal, AddCarModal, EditCarModal)
- Mobile: To'liq ekran (95vw)
- Desktop: Maksimal kenglik (max-w-md, max-w-2xl)

### Admin Panel
- Mobile: Vertikal stack, scroll qilinadigan table
- Desktop: Grid layout, keng table

### Sahifalar
- Hero sections: Responsive matn o'lchamlari va padding
- Grid layouts: 1 → 2 → 3/4 ustunlar
- Spacing: Kichik → o'rta → katta

## Maslahatlar

1. **Mobile-first yondashuv**: Avval mobile uchun yozing, keyin kattaroq ekranlar uchun qo'shing
2. **Touch-friendly**: Tugmalar va linklar kamida 44x44px bo'lishi kerak
3. **Readable text**: Mobile'da kamida 16px font o'lcham ishlatilsin
4. **Spacing**: Mobile'da kamroq, desktop'da ko'proq bo'sh joy
5. **Images**: Responsive rasmlar uchun `object-cover` va turli balandliklar

## Test qilish

Turli ekran o'lchamlarida test qilish uchun:

1. Browser DevTools (F12) → Responsive mode
2. Telefon, planshet va desktop'da real test
3. Chrome DevTools → Device toolbar (Ctrl+Shift+M)

## Misol komponent

`src/components/ResponsiveExample.tsx` faylida to'liq misol mavjud.
