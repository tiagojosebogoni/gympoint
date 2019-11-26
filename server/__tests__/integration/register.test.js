import request from 'supertest';

import app from '../../src/app';
import factory from '../factories';

describe('Matrículas', () => {
  it('teste', async () => {
    const user = await factory.create('User');
    const plan = await factory.create('Plan');
    const student = await factory.create('Student');

    const response = await request(app)
      .post(`/students/${student.id}/plans/${plan.id}'`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send();

    expect(response.body).toHaveProperty('id');
  });
});
