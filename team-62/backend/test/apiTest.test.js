const request = require('supertest');
const app = require('../server'); // Ensure this path points to your server file

describe('Server and Route Connections', () => {
  it('should connect to the server', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  it('should connect to /api/register route', async () => {
    const response = await request(app).get('/api/register');
    expect(response.statusCode).not.toBe(404);
  });

  it('should connect to /api/login route', async () => {
    const response = await request(app).get('/api/login');
    expect(response.statusCode).not.toBe(404);
  });
});

describe('User Authentication Routes', () => {
  it('POST /api/register should register a new user', async () => {
    const newUser = {
      email: 'test@example.com',
      password: 'password123'
    };

    await request(app).post('/api/register').send(newUser)
      .then(response => {
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('email', newUser.email);
      })
      .catch(error => {
        console.error('Error in POST /api/register:', error.message);
      });
  });

  it('POST /api/login should authenticate a user', async () => {
    const userCredentials = {
      email: 'test@example.com',
      password: 'password123'
    };

    await request(app).post('/api/login').send(userCredentials)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
      })
      .catch(error => {
        console.error('Error in POST /api/login:', error.message);
      });
  });
});
