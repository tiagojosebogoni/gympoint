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

    expect(response.status).toBe(200);
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

  it('permite update matrícula com usuário logado', async () => {
    const user = await factory.create('User');
    const plan = await factory.create('Plan', { duration: 2, price: 50 });
    const planUpdate = await factory.create('Plan', {
      duration: 4,
      price: 100,
    });
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

    const response = await request(app)
      .put(`/register/${register.id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({ start_date: '2019-11-27T01:18:35', plan_id: planUpdate.id });

    const { price } = response.body;
    const aPrice = planUpdate.duration * planUpdate.price;

    expect(price).toBe(aPrice);
  });

  it('permite excluir matrícula com usuário logado', async () => {
    const user = await factory.create('User');
    const plan = await factory.create('Plan');

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

    const response = await request(app)
      .delete(`/register/${register.id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it('não permite excluir matrícula sem passar o id', async () => {
    const user = await factory.create('User');
    const plan = await factory.create('Plan');

    const student = await factory.create('Student');

    const start_date = new Date('2019-01-01');
    const end_date = addMonths(start_date, plan.duration);

    await factory.create('Register', {
      student_id: student.id,
      plan_id: plan.id,
      price: plan.duration * plan.price,
      start_date,
      end_date,
    });

    const response = await request(app)
      .delete(`/register/0`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(401);
  });
});
