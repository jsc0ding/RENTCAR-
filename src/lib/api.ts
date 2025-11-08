import axios from 'axios';

// Production'da relative URL, Development'da localhost
const API_BASE_URL = import.meta.env.PROD 
  ? '/api'  // Production
  : 'http://localhost:5000/api';  // Development

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

export default api;