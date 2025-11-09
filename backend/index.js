import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// CORS sozlamalari - frontend URL dan ruxsat berish
const FRONTEND_URL = process.env.FRONTEND_URL || '*'; // Default: barcha domain'lardan
const allowedOrigins = FRONTEND_URL === '*' 
  ? '*' 
  : FRONTEND_URL.split(',').map(url => url.trim());

app.use(cors({
  origin: (origin, callback) => {
    // Agar FRONTEND_URL '*' bo'lsa yoki origin yo'q bo'lsa (Postman, va h.k.), ruxsat berish
    if (FRONTEND_URL === '*' || !origin) {
      return callback(null, true);
    }
    
    // Agar allowedOrigins array bo'lsa, tekshirish
    if (Array.isArray(allowedOrigins) && allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // Agar allowedOrigins '*' bo'lsa, ruxsat berish
    if (allowedOrigins === '*') {
      return callback(null, true);
    }
    
    callback(new Error('CORS policy: Not allowed by origin'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Preflight request'larni handle qilish
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/carRental';

// MongoDB connection state
let isMongoConnected = false;

mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB ga ulandi');
  isMongoConnected = true;
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB xatoligi:', err);
  isMongoConnected = false;
  // Server ni to'xtatmaslik, faqat xabarni ko'rsatish
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB uzildi');
  isMongoConnected = false;
});

// Graceful shutdown
process.on('SIGINT', async () => {
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.close();
    console.log('MongoDB uzildi');
  }
  process.exit(0);
});

// MongoDB ulanishini tekshirish funksiyasi
const checkMongoConnection = (req, res, next) => {
  if (!isMongoConnected && mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: 'Database ulanmagan. Iltimos, keyinroq urinib ko\'ring.',
      error: 'MongoDB connection not established'
    });
  }
  next();
};

// Connect to MongoDB
// Agar ulanmasa ham server ishga tushishi kerak
if (MONGODB_URI && MONGODB_URI !== 'mongodb://localhost:27017/carRental') {
  console.log('🔄 MongoDB ga ulanish boshlandi...');
  mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 10000, // 10 soniya timeout
    socketTimeoutMS: 45000,
    connectTimeoutMS: 10000,
  }).then(() => {
    console.log('✅ MongoDB ga muvaffaqiyatli ulandi');
    isMongoConnected = true;
  }).catch(err => {
    console.error('❌ MongoDB ga ulanishda xatolik:', err.message);
    console.error('❌ Xatolik tafsilotlari:', {
      name: err.name,
      code: err.code,
      message: err.message
    });
    console.log('⚠️ Server MongoDB ulanmasdan ishlayapti. API endpointlar ishlamaydi.');
    isMongoConnected = false;
    // Server ni to'xtatmaslik
  });
} else {
  console.log('⚠️ MONGODB_URI sozlanmagan yoki default qiymat. Server MongoDB ulanmasdan ishlayapti.');
  console.log('⚠️ Environment variable ni tekshiring: MONGODB_URI');
}

// Telegram Bot Configuration
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Function to send Telegram notification
const sendTelegramNotification = async (message) => {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.log('⚠️ Telegram bot credentials not configured');
    return;
  }

  try {
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    await axios.post(telegramUrl, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML'
    });
    console.log('✅ Telegram xabari yuborildi');
  } catch (error) {
    console.error('❌ Telegram xabarini yuborishda xatolik:', error.message);
  }
};

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

// Routes

// Health check endpoint (MongoDB ulanmasa ham ishlaydi)
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server ishlayapti',
    mongoConnected: isMongoConnected || mongoose.connection.readyState === 1,
    timestamp: new Date().toISOString()
  });
});

// Get all cars
app.get('/api/cars', checkMongoConnection, async (req, res) => {
  try {
    const { category, brand, minPrice, maxPrice, available, minPassengers, search } = req.query;
    
    console.log("Received query parameters:", req.query); // Debug log
    
    let filter = {};
    
    // Apply category filter
    if (category) filter.category = category;
    
    // Apply brand filter
    if (brand) filter.brand = brand;
    
    // Apply price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    
    // Apply availability filter
    if (available !== undefined && available !== null && available !== '') {
      filter.available = available === 'true';
    }
    // Agar available parametri berilmagan bo'lsa, barcha mashinalarni ko'rsatish (admin uchun)
    
    // Apply passenger count filter
    if (minPassengers) {
      const passengerCount = Number(minPassengers);
      filter.passengers = { $gte: passengerCount };
      console.log(`Filtering cars with at least ${passengerCount} passengers`);
    }
    
    // Apply search filter
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { model: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    console.log("Applied filter:", filter); // Debug log

    const cars = await Car.find(filter).sort({ createdAt: -1 });
    console.log("Found cars:", cars.length); // Debug log
    
    res.json({
      success: true,
      count: cars.length,
      data: cars
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Mashinalarni olishda xatolik',
      error: error.message
    });
  }
});

// Get single car
app.get('/api/cars/:id', checkMongoConnection, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Mashina topilmadi'
      });
    }
    res.json({
      success: true,
      data: car
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Mashina ma\'lumotini olishda xatolik',
      error: error.message
    });
  }
});

// Create new car
app.post('/api/cars', checkMongoConnection, async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).json({
      success: true,
      message: 'Mashina muvaffaqiyatli qo\'shildi',
      data: car
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Mashina qo\'shishda xatolik',
      error: error.message
    });
  }
});

// Update car
app.put('/api/cars/:id', checkMongoConnection, async (req, res) => {
  try {
    console.log('Car update request received for ID:', req.params.id);
    console.log('Request body:', req.body);
    
    // First, get the current car data
    const currentCar = await Car.findById(req.params.id);
    if (!currentCar) {
      console.log('Car not found with ID:', req.params.id);
      return res.status(404).json({
        success: false,
        message: 'Mashina topilmadi'
      });
    }
    
    console.log('Current car data:', {
      id: currentCar._id,
      name: currentCar.name,
      available: currentCar.available
    });

    // Update the car
    const car = await Car.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!car) {
      console.log('Failed to update car with ID:', req.params.id);
      return res.status(404).json({
        success: false,
        message: 'Mashina topilmadi'
      });
    }
    
    console.log('Updated car data:', {
      id: car._id,
      name: car.name,
      available: car.available
    });

    // Check if the car availability changed from true to false (rented)
    if (currentCar.available === true && car.available === false) {
      console.log('Car has been rented, sending Telegram notification...');
      // Send Telegram notification
      const message = `
<b>🚗 Yangi ijaraga olingan mashina</b>
<b>Nomi:</b> ${car.name}
<b>Brend:</b> ${car.brand}
<b>Model:</b> ${car.model}
<b>Yili:</b> ${car.year}
<b>Narxi:</b> $${car.price}/kun
<b>Telegramda xabar yuborilgan vaqt:</b> ${new Date().toLocaleString('uz-UZ')}
      `;
      
      await sendTelegramNotification(message);
    } else {
      console.log('Car availability status:', {
        previous: currentCar.available,
        current: car.available,
        notificationSent: false
      });
    }
    
    res.json({
      success: true,
      message: 'Mashina muvaffaqiyatli yangilandi',
      data: car
    });
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(400).json({
      success: false,
      message: 'Mashina yangilashda xatolik',
      error: error.message
    });
  }
});

// Delete car
app.delete('/api/cars/:id', checkMongoConnection, async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Mashina topilmadi'
      });
    }
    res.json({
      success: true,
      message: 'Mashina muvaffaqiyatli o\'chirildi'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Mashina o\'chirishda xatolik',
      error: error.message
    });
  }
});

// Get statistics
app.get('/api/stats', checkMongoConnection, async (req, res) => {
  try {
    const totalCars = await Car.countDocuments();
    const availableCars = await Car.countDocuments({ available: true });
    const rentedCars = await Car.countDocuments({ available: false });
    
    const categories = await Car.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    
    const brands = await Car.aggregate([
      { $group: { _id: '$brand', count: { $sum: 1 } } }
    ]);

    const avgPrice = await Car.aggregate([
      { $group: { _id: null, avgPrice: { $avg: '$price' } } }
    ]);

    res.json({
      success: true,
      data: {
        totalCars,
        availableCars,
        rentedCars,
        categories: categories.length,
        brands: brands.length,
        avgPrice: avgPrice[0]?.avgPrice || 0,
        categoryBreakdown: categories,
        brandBreakdown: brands
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Statistikani olishda xatolik',
      error: error.message
    });
  }
});

// Get categories and brands for filters
app.get('/api/filters', checkMongoConnection, async (req, res) => {
  try {
    const categories = await Car.distinct('category');
    const brands = await Car.distinct('brand');
    const locations = await Car.distinct('location');
    
    res.json({
      success: true,
      data: {
        categories,
        brands,
        locations
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Filtrlarni olishda xatolik',
      error: error.message
    });
  }
});

// Reset all cars to available (Admin only)
app.post('/api/cars/reset-all', checkMongoConnection, async (req, res) => {
  try {
    console.log('🔄 Barcha avtomobillarni qaytarish...');
    
    // Barcha bron qilingan avtomobillarni topish
    const rentedCars = await Car.find({ available: false });
    console.log(`📊 Bron qilingan avtomobillar: ${rentedCars.length} ta`);

    if (rentedCars.length === 0) {
      return res.json({
        success: true,
        message: 'Barcha avtomobillar allaqachon mavjud!',
        count: 0
      });
    }

    // Barcha avtomobillarni mavjud holatga qaytarish
    const result = await Car.updateMany(
      { available: false },
      { $set: { available: true } }
    );

    console.log(`✅ ${result.modifiedCount} ta avtomobil qaytarildi!`);
    
    res.json({
      success: true,
      message: `${result.modifiedCount} ta avtomobil muvaffaqiyatli qaytarildi!`,
      count: result.modifiedCount,
      cars: rentedCars.map(car => ({
        name: car.name,
        brand: car.brand,
        model: car.model
      }))
    });
  } catch (error) {
    console.error('❌ Avtomobillarni qaytarishda xatolik:', error);
    res.status(500).json({
      success: false,
      message: 'Avtomobillarni qaytarishda xatolik yuz berdi',
      error: error.message
    });
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, phone, subject, message } = req.body;
    
    console.log('Contact form submission received:', { name, phone, subject });
    
    // Send Telegram notification
    const telegramMessage = `
<b>📧 Yangi Xabar!</b>

<b>👤 Ism:</b> ${name}
<b>📱 Telefon:</b> ${phone}
<b>📋 Mavzu:</b> ${subject}
<b>💬 Xabar:</b>
${message}

<b>⏱️ Vaqt:</b> ${new Date().toLocaleString('uz-UZ')}
    `;
    
    await sendTelegramNotification(telegramMessage);
    
    res.json({
      success: true,
      message: 'Xabaringiz muvaffaqiyatli yuborildi!'
    });
  } catch (error) {
    console.error('Error sending contact message:', error);
    res.status(500).json({
      success: false,
      message: 'Xabar yuborishda xatolik yuz berdi',
      error: error.message
    });
  }
});

// Asosiy route - API haqida ma'lumot
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Car Rental Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      cars: '/api/cars',
      stats: '/api/stats',
      filters: '/api/filters',
      contact: '/api/contact'
    },
    documentation: 'Backend API ishlayapti. Frontend alohida deploy qilingan.'
  });
});

// API yo'llari uchun 404 handler
app.use('/api/*', (req, res) => {
  res.status(404).json({ 
    success: false,
    message: 'API endpoint topilmadi',
    path: req.path,
    availableEndpoints: [
      '/api/health',
      '/api/cars',
      '/api/cars/:id',
      '/api/stats',
      '/api/filters',
      '/api/contact'
    ]
  });
});

// Barcha boshqa yo'llar uchun 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route topilmadi',
    path: req.path,
    info: 'Bu backend API server. Frontend alohida deploy qilingan.'
  });
});

// Render.com uchun 0.0.0.0 ga listen qilish
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`🚀 Server ${HOST}:${PORT} da ishlamoqda`);
  console.log(`🔗 API: http://${HOST}:${PORT}/api`);
  console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Frontend URL: ${FRONTEND_URL}`);
  console.log(`🗄️  MongoDB: ${isMongoConnected ? '✅ Ulangan' : '❌ Ulanmagan'}`);
  
  if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
    console.log('✅ Telegram bot sozlangan');
  } else {
    console.log('⚠️  Telegram bot sozlanmagan. .env faylida TELEGRAM_BOT_TOKEN va TELEGRAM_CHAT_ID ni qo\'ying');
  }
  
  if (!isMongoConnected && mongoose.connection.readyState !== 1) {
    console.log('⚠️  MongoDB ulanmagan. API endpointlar ishlamaydi. MONGODB_URI ni tekshiring.');
  }
  
  console.log('📁 Backend faqat API serve qiladi - frontend alohida deploy qilingan');
});