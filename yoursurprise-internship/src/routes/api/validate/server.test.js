import { test, expect } from 'vitest';
import { POST } from './+server.js';

test('should return success for valid data', async () => {
  console.log('Running test: should return success for valid data');
  try {
    const request = new Request('http://localhost:5137/api/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@test.nl',
        likes: 7,
        reposts: 8,
        views: 9
      })
    });

    const response = await POST({ request });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ message: 'Validation successful' });
    console.log('Test passed: should return success for valid data');
  } catch (error) {
    console.error('Test failed: should return success for valid data', error.message);
    throw error;
  }
});

test('should return error for invalid email', async () => {
  console.log('Running test: should return error for invalid email');
  try {
    const request = new Request('http://localhost:5137/api/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'invalid-email',
        likes: 7,
        reposts: 8,
        views: 9
      })
    });

    const response = await POST({ request });
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({ error: 'Invalid email address. Example of valid email example@email.com' });
    console.log('Test passed: should return error for invalid email');
  } catch (error) {
    console.error('Test failed: should return error for invalid email', error.message);
    throw error;
  }
});

test('should return error for invalid numeric values', async () => {
  console.log('Running test: should return error for invalid numeric values');
  try {
    const request = new Request('http://localhost/api/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@test.nl',
        likes: 0,
        reposts: 11,
        views: 5
      })
    });

    const response = await POST({ request });
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toMatch(/must be between 1 and 10/);
    console.log('Test passed: should return error for invalid numeric values');
  } catch (error) {
    console.error('Test failed: should return error for invalid numeric values', error.message);
    throw error;
  }
});