import request from 'supertest';

import bcrypt from 'bcryptjs';
import app from '../../src/app';
import factory from '../factories';

describe('User', () => {
  it('permite cadastrar usuário', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body).toHaveProperty('id');
  });

  it('deve encryptar a senha do usuário quando for novo usuário', async () => {
    const user = await factory.create('User', {
      password: '123123',
    });

    const compareHash = await bcrypt.compare('123123', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('não permite cadastrar email duplicado', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(401);
  });

  it('todos os campos são obrigatórios', async () => {
    const response1 = await request(app)
      .post('/users')
      .send({ name: '', email: 'abc@gmail.com', password: '123123' });

    expect(response1.status).toBe(400);

    const response2 = await request(app)
      .post('/users')
      .send({ name: 'abc', email: '', password: '123123' });

    expect(response2.status).toBe(400);

    const response3 = await request(app)
      .post('/users')
      .send({ name: 'abc', email: 'abc@gmail.com', password: '' });

    expect(response3.status).toBe(400);
  });
});
