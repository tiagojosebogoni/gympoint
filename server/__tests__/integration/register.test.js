import request from 'supertest';
import { addMonths } from 'date-fns';
import app from '../../src/app';
import factory from '../factories';

describe('Matrículas', () => {
  it('permite inserir matrícula ', async () => {
    const user = await factory.create('User');
    const plan = await factory.create('Plan');
    const student = await factory.create('Student');

    const response = await request(app)
      .post(`/register/students/${student.id}/plans/${plan.id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({ date: '2019-11-27T01:18:35' });

    expect(response.body).toHaveProperty('id');
  });

  it('não permite matrícula sem passar o plano', async () => {
    const user = await factory.create('User');
    // const plan = await factory.create('Plan');
    const student = await factory.create('Student');

    const response = await request(app)
      .post(`/register/students/${student.id}/plans/0`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({ date: '2019-11-27T01:18:35' });

    expect(response.status).toBe(401);
  });

  it('não permite matrícula sem o aluno', async () => {
    const user = await factory.create('User');
    const plan = await factory.create('Plan');

    const response = await request(app)
      .post(`/register/students/${9856}/plans/${plan.id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({ date: '2019-11-27T01:18:35' });

    expect(response.status).toBe(401);
  });

  it.only('permite update matrícula ', async () => {
    const user = await factory.create('User');
    const plan = await factory.create('Plan');
    const planUpdate = await factory.create('Plan');
    const student = await factory.create('Student');

    const start_date = new Date('2019-01-01');
    const end_date = addMonths(start_date, plan.duration);

    const register = await factory.create('Register', {
      student_id: student.id,
      plan_id: plan.id,
      price: plan.duration * plan.price,
      start_date,
      end_date,
    });

    console.log(
      `antes:${JSON.stringify(register)} -${plan.duration} - ${plan.price}`
    );
    const response = await request(app)
      .put(
        `/register/${register.id}/students/${student.id}/plans/${planUpdate.id}`
      )
      .set('Authorization', `Bearer ${user.generateToken()}`);

    const { price } = response.body;
    const aPrice = planUpdate.duration * planUpdate.price;
    console.log(
      `depois: ${JSON.stringify(response.body)} -${planUpdate.duration} - ${
        planUpdate.price
      }`
    );
    expect(price).toBe(aPrice);

    expect(true).toBe(true);
  });
});
