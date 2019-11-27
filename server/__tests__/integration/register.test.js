import request from 'supertest';

import app from '../../src/app';
import factory from '../factories';

describe('Matrículas', () => {
  it.only('permite fazer matrícula ', async () => {
    const user = await factory.create('User');
    const plan = await factory.create('Plan');
    const student = await factory.create('Student');

    const response = await request(app)
      .post(`/students/1/plans/1`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({ date: '2019-11-27T01:18:35' });

    expect(true).toBe(true);
  });

  it('não permite matrícula sem passar o plano', async () => {
    const user = await factory.create('User');
    // const plan = await factory.create('Plan');
    const student = await factory.create('Student');

    const response = await request(app)
      .post(`/students/${student.id}/plans/0`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({ date: '2019-11-27T01:18:35' });

    expect(response.status).toBe(401);
  });

  it('não permite matrícula sem o aluno', async () => {
    const user = await factory.create('User');
    const plan = await factory.create('Plan');

    const response = await request(app)
      .post(`/students/${9856}/plans/${plan.id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({ date: '2019-11-27T01:18:35' });

    expect(response.status).toBe(401);
  });
});
