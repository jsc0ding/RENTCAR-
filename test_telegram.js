// Test script to verify Telegram notification
import dotenv from 'dotenv';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from server directory
dotenv.config({ path: path.resolve(__dirname, 'server', '.env') });

// Telegram Bot Configuration
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

console.log('TELEGRAM_BOT_TOKEN:', TELEGRAM_BOT_TOKEN ? 'Defined' : 'Not defined');
console.log('TELEGRAM_CHAT_ID:', TELEGRAM_CHAT_ID ? 'Defined' : 'Not defined');

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

async function testTelegram() {
  console.log('Testing Telegram notification...');
  
  const message = `
<b>🚗 Test xabari</b>
<b>Bu Telegram notifikatsiyasi ishlayotganini tekshirish uchun</b>
<b>Vaqt:</b> ${new Date().toLocaleString('uz-UZ')}
  `;
  
  await sendTelegramNotification(message);
}

testTelegram();