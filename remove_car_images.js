// Script to remove image links from all cars in the database
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

async function removeCarImages() {
  try {
    console.log('Mashinalardan rasmlar o\'chirilmoqda...\n');
    
    // Get all cars
    const response = await axios.get(`${API_BASE_URL}/cars`);
    
    if (response.data.success) {
      const cars = response.data.data;
      console.log(`Topilgan mashinalar: ${cars.length} ta\n`);
      
      let removedCount = 0;
      
      // Update each car to remove the image field
      for (const car of cars) {
        try {
          // Update car by removing the image field
          const updateResponse = await axios.put(`${API_BASE_URL}/cars/${car._id}`, {
            image: null
          });
          
          if (updateResponse.data.success) {
            console.log(`✓ Removed image from: ${car.name}`);
            removedCount++;
          } else {
            console.log(`✗ Failed to remove image from: ${car.name}`);
          }
        } catch (error) {
          console.log(`✗ Error updating ${car.name}:`, error.message);
        }
      }
      
      console.log(`\nJami o'chirilgan rasmlar: ${removedCount} ta`);
      console.log('✅ Barcha mashina rasmlari muvaffaqiyatli o\'chirildi!');
    } else {
      console.log('❌ Mashinalarni olishda xatolik:', response.data.message);
    }
  } catch (error) {
    console.log('❌ Xatolik:', error.message);
  }
}

// Run the script
console.log('Script boshlanmoqda...\n');
removeCarImages();