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
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, email, carModel, vinNumber, message } = req.body as FormData;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Имя и телефон обязательны' });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID');
    return res.status(500).json({ error: 'Ошибка конфигурации сервера' });
  }

  const text = `📬 *Новая заявка с сайта!*

👤 *Имя:* ${escapeMarkdown(name)}
📞 *Телефон:* ${escapeMarkdown(phone)}${email ? `\n📧 *Email:* ${escapeMarkdown(email)}` : ''}${carModel ? `\n🚗 *Модель авто:* ${escapeMarkdown(carModel)}` : ''}${vinNumber ? `\n🔢 *VIN номер:* ${escapeMarkdown(vinNumber)}` : ''}${message ? `\n💬 *Сообщение:* ${escapeMarkdown(message)}` : ''}`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
      }),
    });

    const data = await response.json();

    if (!data.ok) {
      console.error('Telegram API error:', data);
      return res.status(500).json({ error: 'Ошибка отправки в Telegram' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    return res.status(500).json({ error: 'Ошибка отправки сообщения' });
  }
}

function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, '\\$&');
}
