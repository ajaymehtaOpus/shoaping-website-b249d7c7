const request = require('supertest');
const app = require('../src/index');
const db = require('../src/db');

describe('User Authentication', () => {
  beforeAll(async () => {
    await db.query(`DELETE FROM users`); // Clear users before tests
  });

  afterAll(async () => {
    await db.end(); // Close database connection
  });

  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'testuser@example.com',
        password: 'password123',
        username: 'testuser'
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully.');
  });

  it('should login the user', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('refreshToken');
  });

  it('should refresh the token', async () => {
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      });

    const token = loginResponse.body.token;

    const response = await request(app)
      .post('/api/auth/refresh')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});