import axios from 'axios';

// Environment variable dan API URL olish
// Production da relative URL, Development da localhost
// Render.com da backend va frontend bir xil serverda, shuning uchun relative URL ishlatiladi
const getApiBaseUrl = () => {
  // 1. Agar VITE_API_URL sozlangan bo'lsa, uni ishlatish (eng ustuvor)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // 2. Development mode ni tekshirish
  // Vite da import.meta.env.DEV va import.meta.env.PROD mavjud
  // import.meta.env.MODE === 'development' yoki 'production'
  const isDevelopment = import.meta.env.DEV || import.meta.env.MODE === 'development';
  const isProduction = import.meta.env.PROD || import.meta.env.MODE === 'production';
  
  // 3. Runtime da window.location dan tekshirish (production uchun)
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    // Localhost yoki 127.0.0.1 bo'lsa, development
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '') {
      return 'http://localhost:5000/api';
    }
    // Boshqa hollarda (production, Render.com, va h.k.) relative URL
    return '/api';
  }
  
  // 4. SSR yoki build vaqtida: environment dan aniqlash
  if (isProduction) {
    return '/api';
  }
  
  if (isDevelopment) {
    return 'http://localhost:5000/api';
  }
  
  // 5. Default: relative URL (production uchun)
  return '/api';
};

const API_BASE_URL = getApiBaseUrl();

// Debug: API URL ni console da ko'rsatish
console.log('🔗 API Configuration:', {
  baseURL: API_BASE_URL,
  env: {
    MODE: import.meta.env.MODE,
    DEV: import.meta.env.DEV,
    PROD: import.meta.env.PROD,
    VITE_API_URL: import.meta.env.VITE_API_URL,
  },
  location: typeof window !== 'undefined' ? window.location.origin : 'N/A'
});

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 soniya timeout
});

// Request interceptor - har bir request dan oldin
api.interceptors.request.use(
  (config) => {
    // Development da request URL ni log qilish
    if (import.meta.env.DEV) {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - har bir response dan keyin
api.interceptors.response.use(
  (response) => {
    // Development da response ni log qilish
    if (import.meta.env.DEV) {
      console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, response.status);
    }
    return response;
  },
  (error) => {
    // Xatolikni log qilish
    console.error('❌ API Error:', {
      message: error.message,
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
    });
    
    // Xatolik xabarini yaxshiroq qilish
    if (error.code === 'ECONNREFUSED' || error.message === 'Network Error') {
      error.message = 'Server bilan aloqa o\'rnatib bo\'lmadi. Iltimos, internet aloqasini tekshiring.';
    } else if (error.response?.status === 503) {
      error.message = error.response?.data?.message || 'Server vaqtinchalik ishlamayapti. Iltimos, keyinroq urinib ko\'ring.';
    } else if (error.response?.status === 404) {
      error.message = 'So\'ralgan ma\'lumot topilmadi.';
    } else if (error.response?.data?.message) {
      error.message = error.response.data.message;
    }
    
    return Promise.reject(error);
  }
);

export interface Car {
  _id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  category: string;
  passengers: number;
  transmission: string;
  fuel: string;
  engine: string;
  color: string;
  mileage: number;
  features: string[];
  image: string;
  available: boolean;
  rating: number;
  location: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  count?: number;
  message?: string;
  error?: string;
}

export interface Stats {
  totalCars: number;
  availableCars: number;
  rentedCars: number;
  categories: number;
  brands: number;
  avgPrice: number;
  categoryBreakdown: Array<{ _id: string; count: number }>;
  brandBreakdown: Array<{ _id: string; count: number }>;
}

export interface Filters {
  categories: string[];
  brands: string[];
  locations: string[];
}

// Cars API
export const carsApi = {
  // Get all cars
  getAll: async (params?: {
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    available?: boolean;
    minPassengers?: number;
    search?: string;
  }): Promise<ApiResponse<Car[]>> => {
    const response = await api.get('/cars', { params });
    return response.data;
  },

  // Get single car
  getById: async (id: string): Promise<ApiResponse<Car>> => {
    const response = await api.get(`/cars/${id}`);
    return response.data;
  },

  // Create new car
  create: async (carData: Omit<Car, '_id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Car>> => {
    const response = await api.post('/cars', carData);
    return response.data;
  },

  // Update car
  update: async (id: string, carData: Partial<Car>): Promise<ApiResponse<Car>> => {
    const response = await api.put(`/cars/${id}`, carData);
    return response.data;
  },

  // Delete car
  delete: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/cars/${id}`);
    return response.data;
  },
};

// Stats API
export const statsApi = {
  get: async (): Promise<ApiResponse<Stats>> => {
    const response = await api.get('/stats');
    return response.data;
  },
};

// Filters API
export const filtersApi = {
  get: async (): Promise<ApiResponse<Filters>> => {
    const response = await api.get('/filters');
    return response.data;
  },
};

// Contact API
export interface ContactData {
  name: string;
  phone: string;
  subject: string;
  message: string;
}

export const contactApi = {
  send: async (contactData: ContactData): Promise<ApiResponse<void>> => {
    const response = await api.post('/contact', contactData);
    return response.data;
  },
};

// Debug: API URL ni console da ko'rsatish (development uchun)
if (import.meta.env.DEV) {
  console.log('🔗 API Base URL:', API_BASE_URL);
}

export default api;
