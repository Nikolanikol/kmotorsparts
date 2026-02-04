import type { VercelRequest, VercelResponse } from '@vercel/node';

interface FormData {
  name: string;
  phone: string;
  email?: string;
  carModel?: string;
  vinNumber?: string;
  message?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, email, carModel, vinNumber, message } = req.body as FormData;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Имя и телефон обязательны' });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('Missing env vars. BOT_TOKEN exists:', !!botToken, 'CHAT_ID exists:', !!chatId);
      return res.status(500).json({ error: 'Ошибка конфигурации сервера: переменные окружения не настроены' });
    }

    // Формируем сообщение без Markdown чтобы избежать проблем с экранированием
    const text = `📬 Новая заявка с сайта!

👤 Имя: ${name}
📞 Телефон: ${phone}${email ? `\n📧 Email: ${email}` : ''}${carModel ? `\n🚗 Модель авто: ${carModel}` : ''}${vinNumber ? `\n🔢 VIN номер: ${vinNumber}` : ''}${message ? `\n💬 Сообщение: ${message}` : ''}`;

    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
    });

    const data = await telegramResponse.json();

    if (!data.ok) {
      console.error('Telegram API error:', JSON.stringify(data));
      return res.status(500).json({
        error: 'Ошибка отправки в Telegram',
        details: data.description || 'Unknown error'
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      error: 'Ошибка сервера',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
