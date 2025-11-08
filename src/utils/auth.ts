/**
 * Admin autentifikatsiya funksiyalari
 */

const ADMIN_SESSION_KEY = 'luxrent_admin_session';
const SESSION_DURATION = 3600000; // 1 soat (milliseconds)

export interface AdminSession {
  authenticated: boolean;
  timestamp: number;
}

/**
 * Admin sessiyasini saqlash
 */
export const setAdminSession = (): void => {
  const session: AdminSession = {
    authenticated: true,
    timestamp: Date.now(),
  };
  localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
};

/**
 * Admin sessiyasini tekshirish
 */
export const isAdminAuthenticated = (): boolean => {
  try {
    const sessionData = localStorage.getItem(ADMIN_SESSION_KEY);
    if (!sessionData) return false;

    const session: AdminSession = JSON.parse(sessionData);
    const now = Date.now();
    
    // Sessiya muddati tugaganmi?
    if (now - session.timestamp > SESSION_DURATION) {
      clearAdminSession();
      return false;
    }

    return session.authenticated;
  } catch (error) {
    return false;
  }
};

/**
 * Admin sessiyasini tozalash
 */
export const clearAdminSession = (): void => {
  localStorage.removeItem(ADMIN_SESSION_KEY);
};

/**
 * Admin parolini tekshirish
 */
export const verifyAdminPassword = (password: string): boolean => {
  return password === '87654321';
};
