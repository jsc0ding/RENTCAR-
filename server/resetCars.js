// Barcha avtomobillarni mavjud holatga qaytarish scripti
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

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

async function resetAllCars() {
  try {
    console.log('🔄 MongoDB ga ulanmoqda...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB ga ulandi');

    // Barcha bron qilingan avtomobillarni topish
    const rentedCars = await Car.find({ available: false });
    console.log(`📊 Bron qilingan avtomobillar: ${rentedCars.length} ta`);

    if (rentedCars.length === 0) {
      console.log('✅ Barcha avtomobillar allaqachon mavjud!');
      await mongoose.connection.close();
      process.exit(0);
    }

    // Barcha avtomobillarni mavjud holatga qaytarish
    const result = await Car.updateMany(
      { available: false },
      { $set: { available: true } }
    );

    console.log(`✅ ${result.modifiedCount} ta avtomobil qaytarildi!`);
    console.log('\n📋 Qaytarilgan avtomobillar:');
    rentedCars.forEach((car, index) => {
      console.log(`${index + 1}. ${car.name} (${car.brand} ${car.model})`);
    });

    await mongoose.connection.close();
    console.log('\n✅ Jarayon tugadi!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Xatolik:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

resetAllCars();
