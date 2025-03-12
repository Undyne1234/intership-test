// @ts-nocheck
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  const { email, likes, reposts, views } = await request.json();

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return json({ error: 'Invalid email address. Example of valid email example@email.com' }, { status: 400 });
  }

  // Numeric validation
  const numericFields = { likes, reposts, views };
  for (const [key, value] of Object.entries(numericFields)) {
    if (value < 1 || value > 10) {
      return json({ error: `${key} must be between 1 and 10` }, { status: 400 });
    }
  }

  return json({ message: 'Validation successful' }, { status: 200 });
}