const TelegramBot = require('node-telegram-bot-api');

// Telegram Bot Token - Bu yerga o'z bot tokeningizni qo'ying
// @BotFather dan bot yaratib token oling
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE';

// Admin chat ID - Bu yerga o'z Telegram ID'ingizni qo'ying
// @userinfobot dan o'z ID'ingizni bilib oling
const ADMIN_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID || 'YOUR_CHAT_ID_HERE';

let bot = null;

// Bot'ni ishga tushirish
const initBot = () => {
  try {
    if (TELEGRAM_BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE') {
      console.log('⚠️  Telegram bot token sozlanmagan. .env faylida TELEGRAM_BOT_TOKEN ni qo\'ying');
      return null;
    }

    bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });
    console.log('✅ Telegram bot muvaffaqiyatli ulandi');
    return bot;
  } catch (error) {
    console.error('❌ Telegram bot ulanishda xatolik:', error.message);
    return null;
  }
};

// Mashina ijaraga olinganda xabar yuborish
const sendBookingNotification = async (bookingData) => {
  if (!bot) {
    console.log('Telegram bot ishlamayapti');
    return false;
  }

  try {
    const message = `
🚗 *Yangi Ijara!*

👤 *Mijoz:* ${bookingData.fullName}
📱 *Telefon:* ${bookingData.phone}
🚙 *Mashina:* ${bookingData.carName}
💰 *Narx:* $${bookingData.price}/kun
📅 *Boshlanish:* ${bookingData.startDate}
📅 *Tugash:* ${bookingData.endDate}
📍 *Olib ketish:* ${bookingData.pickupLocation}
📝 *Izoh:* ${bookingData.notes || 'Yo\'q'}

💵 *Jami summa:* $${bookingData.totalPrice}
⏱️ *Vaqt:* ${new Date().toLocaleString('uz-UZ')}
    `;

    await bot.sendMessage(ADMIN_CHAT_ID, message, { parse_mode: 'Markdown' });
    console.log('✅ Telegram xabar yuborildi');
    return true;
  } catch (error) {
    console.error('❌ Telegram xabar yuborishda xatolik:', error.message);
    return false;
  }
};

// Aloqa formasi xabarini yuborish
const sendContactMessage = async (contactData) => {
  if (!bot) {
    console.log('Telegram bot ishlamayapti');
    return false;
  }

  try {
    const message = `
📧 *Yangi Xabar!*

👤 *Ism:* ${contactData.name}
📱 *Telefon:* ${contactData.phone}
📋 *Mavzu:* ${contactData.subject}
💬 *Xabar:*
${contactData.message}

⏱️ *Vaqt:* ${new Date().toLocaleString('uz-UZ')}
    `;

    await bot.sendMessage(ADMIN_CHAT_ID, message, { parse_mode: 'Markdown' });
    console.log('✅ Aloqa xabari Telegramga yuborildi');
    return true;
  } catch (error) {
    console.error('❌ Telegram xabar yuborishda xatolik:', error.message);
    return false;
  }
};

// Test xabar yuborish
const sendTestMessage = async () => {
  if (!bot) {
    console.log('Telegram bot ishlamayapti');
    return false;
  }

  try {
    await bot.sendMessage(ADMIN_CHAT_ID, '✅ LuxRent bot muvaffaqiyatli ulandi!');
    console.log('✅ Test xabar yuborildi');
    return true;
  } catch (error) {
    console.error('❌ Test xabar yuborishda xatolik:', error.message);
    return false;
  }
};

module.exports = {
  initBot,
  sendBookingNotification,
  sendContactMessage,
  sendTestMessage,
};
