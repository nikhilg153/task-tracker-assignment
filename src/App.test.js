const request = require('supertest');
const app = require('../server');

describe('Task creation', () => {
  it('should add a new task', async () => {
    const taskData = { title: 'Test Task' };
    const res = await request(app).post('/tasks').send(taskData);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id');
  });

  it('should return an error if title is missing', async () => {
    const taskData = {};
    const res = await request(app).post('/tasks').send(taskData);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});