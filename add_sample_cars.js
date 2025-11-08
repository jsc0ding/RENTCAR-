// Script to add sample luxury cars with Google images to the database
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const sampleCars = [
  {
    name: "Rolls-Royce Phantom",
    brand: "Rolls-Royce",
    model: "Phantom",
    year: 2024,
    price: 600,
    category: "Ultra Luxury",
    passengers: 5,
    transmission: "Automatic",
    fuel: "Gasoline",
    engine: "6.75L V12",
    color: "Black",
    mileage: 0,
    features: "Leather Seats, Sunroof, Massaging Seats, Champagne Cooler",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=800&q=80",
    available: true,
    rating: 5.0,
    location: "Tashkent"
  },
  {
    name: "Bentley Continental GT",
    brand: "Bentley",
    model: "Continental GT",
    year: 2023,
    price: 450,
    category: "Luxury Coupe",
    passengers: 4,
    transmission: "Automatic",
    fuel: "Gasoline",
    engine: "4.0L V8",
    color: "White",
    mileage: 0,
    features: "Leather Interior, Wood Trim, Premium Sound, Navigation",
    image: "https://images.unsplash.com/photo-1549399542-7e6f8c3f6a4c?auto=format&fit=crop&w=800&q=80",
    available: true,
    rating: 4.9,
    location: "Tashkent"
  },
  {
    name: "Mercedes-Maybach S-Class",
    brand: "Mercedes-Benz",
    model: "Maybach S 680",
    year: 2024,
    price: 400,
    category: "Ultra Luxury",
    passengers: 4,
    transmission: "Automatic",
    fuel: "Hybrid",
    engine: "4.0L V8 + Electric",
    color: "Black",
    mileage: 0,
    features: "Rear Massage Seats, Executive Rear Compartment, Ambient Lighting, Burmester Sound",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
    available: true,
    rating: 4.8,
    location: "Samarkand"
  },
  {
    name: "BMW M8 Competition",
    brand: "BMW",
    model: "M8 Competition",
    year: 2023,
    price: 300,
    category: "Sports Car",
    passengers: 4,
    transmission: "Automatic",
    fuel: "Gasoline",
    engine: "4.4L V8",
    color: "Blue",
    mileage: 0,
    features: "Sport Seats, Carbon Fiber Trim, M Performance Exhaust, Head-Up Display",
    image: "https://images.unsplash.com/photo-1595341895297-3f393d3a5c9a?auto=format&fit=crop&w=800&q=80",
    available: true,
    rating: 4.7,
    location: "Tashkent"
  },
  {
    name: "Audi RS e-tron GT",
    brand: "Audi",
    model: "RS e-tron GT",
    year: 2024,
    price: 350,
    category: "Electric Luxury",
    passengers: 4,
    transmission: "Automatic",
    fuel: "Electric",
    engine: "Dual Electric Motors",
    color: "Silver",
    mileage: 0,
    features: "Virtual Cockpit, Matrix LED Headlights, Sport Seats, MMI Navigation",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80",
    available: true,
    rating: 4.8,
    location: "Bukhara"
  }
];

async function addSampleCars() {
  console.log('Adding sample luxury cars with Google images...\n');
  
  for (const car of sampleCars) {
    try {
      const response = await axios.post(`${API_BASE_URL}/cars`, car);
      if (response.data.success) {
        console.log(`✓ Added: ${car.name}`);
      } else {
        console.log(`✗ Failed to add: ${car.name}`);
      }
    } catch (error) {
      console.log(`✗ Error adding ${car.name}:`, error.message);
    }
  }
  
  console.log('\nFinished adding sample cars!');
}

// Run the script
addSampleCars();