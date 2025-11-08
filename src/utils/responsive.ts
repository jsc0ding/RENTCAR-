/**
 * Responsive utility functions
 * Turli ekran o'lchamlari uchun yordamchi funksiyalar
 */

// Breakpoint qiymatlari (Tailwind CSS bilan mos)
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

/**
 * Ekran kengligini tekshirish
 */
export const getScreenSize = (): 'mobile' | 'tablet' | 'desktop' => {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  
  if (width < breakpoints.sm) return 'mobile';
  if (width < breakpoints.lg) return 'tablet';
  return 'desktop';
};

/**
 * Mobile ekranmi?
 */
export const isMobileScreen = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < breakpoints.sm;
};

/**
 * Tablet ekranmi?
 */
export const isTabletScreen = (): boolean => {
  if (typeof window === 'undefined') return false;
  const width = window.innerWidth;
  return width >= breakpoints.sm && width < breakpoints.lg;
};

/**
 * Desktop ekranmi?
 */
export const isDesktopScreen = (): boolean => {
  if (typeof window === 'undefined') return true;
  return window.innerWidth >= breakpoints.lg;
};

/**
 * Touch qurilmami?
 */
export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};
