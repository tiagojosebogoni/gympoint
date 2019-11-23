import request from 'supertest';
import app from '../../src/app';
import factory from '../factories';

describe('Session', () => {
  it('permite autenticar com credenciais válidas', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password });

    expect(response.status).toBe(200);
  });

  it('não permite autenticar com credenciais inválidas', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: '123654' });

    expect(response.status).toBe(401);
  });

  it('deve retornar um jwt token quando me autenticaar', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password });

    expect(response.body).toHaveProperty('token');
  });

  it('deve acessar rotas privadas quando autenticado', async () => {
    const user = await factory.create('User', {
      password: '123123',
    });

    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it('não deve acessar rotas privadas sem token', async () => {
    const response = await request(app).get('/dashboard');

    expect(response.status).toBe(401);
  });

  it('não deve acessar rotas privadas com token jwt inválido', async () => {
    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer afsdfsdfas`);

    expect(response.status).toBe(401);
  });

  it('não permite acessar fazer login com usuário que não existe', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .post('/sessions')
      .send({ email: 'asdfaas@gmail.com', password: user.password });

    expect(response.status).toBe(401);
  });
});
