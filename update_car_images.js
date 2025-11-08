// Script to update all cars to use the BMW image from the public folder
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from server directory
dotenv.config({ path: path.resolve(__dirname, 'server', '.env') });

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/carRental';

// Car Schema
const carSchema = new mongoose.Schema({
  name: String,
  brand: String,
  model: String,
  year: Number,
  price: Number,
  category: String,
  passengers: Number,
  transmission: String,
  fuel: String,
  engine: String,
  color: String,
  mileage: Number,
  features: [String],
  image: String,
  available: Boolean,
  rating: Number,
  location: String
}, { timestamps: true });

const Car = mongoose.model('Car', carSchema);

async function updateCarImages() {
  try {
    console.log('MongoDB ga ulanish...');
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB ga ulandi');
    
    // Update all cars to use the BMW image
    const imageUrl = '/bmw.webp'; // Relative path to the public folder
    
    const result = await Car.updateMany(
      {}, // Update all cars
      { $set: { image: imageUrl } }
    );
    
    console.log(`✅ ${result.modifiedCount} ta mashina rasmi yangilandi`);
    console.log('Barcha mashinalarga BMW rasm qo\'yildi');
    
    // Close connection
    await mongoose.connection.close();
    console.log('MongoDB uzildi');
  } catch (error) {
    console.error('❌ Xatolik:', error);
    process.exit(1);
  }
}

console.log('Script boshlanmoqda...');
updateCarImages();