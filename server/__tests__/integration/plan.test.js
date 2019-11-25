import request from 'supertest';
import app from '../../src/app';
import factory from '../factories';
import Plan from '../../src/app/models/Plan';

describe('Planos', () => {
  it('permite criar um plano com usuário autenticado', async () => {
    const user = await factory.create('User');
    const plan = await factory.attrs('Plan');

    const response = await request(app)
      .post('/plans')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send(plan);

    expect(response.body).toHaveProperty('id');
  });

  it('não permite criar um plano com campos vazios com usuário autenticado', async () => {
    const user = await factory.create('User');
    const plan = await factory.attrs('Plan', { title: '' });

    const response = await request(app)
      .post('/plans')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send(plan);

    expect(response.status).toBe(400);
  });

  it('permite atualizar um plano com usuário autenticado', async () => {
    const user = await factory.create('User');
    const plan = await factory.create('Plan');
    const titleAlt = 'GoldAlterado';

    const response = await request(app)
      .put(`/plans/${plan.id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        title: titleAlt,
        duration: plan.email,
        price: plan.age,
      });

    expect(response.body.title).toBe(titleAlt);
  });

  it('não permite atualizar um plano não existente com usuário autenticado', async () => {
    const user = await factory.create('User');
    const plan = await factory.create('Plan');
    const titleAlt = 'GoldAlterado';

    const response = await request(app)
      .put(`/plans/0`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        title: titleAlt,
        duration: plan.email,
        price: plan.age,
      });

    expect(response.status).toBe(401);
  });

  it('não é possível atualizar um campo com valor não preenchido', async () => {
    const user = await factory.create('User');
    const plan = await factory.create('Plan');
    const titleAlt = '';

    const response = await request(app)
      .put(`/plans/${plan.id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        title: titleAlt,
        duration: plan.email,
        price: plan.age,
      });

    expect(response.status).toBe(400);
  });

  it('listar um plano com usuário autenticado', async () => {
    const user = await factory.create('User');
    const plan = await factory.create('Plan');

    const response = await request(app)
      .get(`/plans/${plan.id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send();

    expect(response.body).toHaveProperty('id');
  });

  it('listar vários planos com usuário autenticado', async () => {
    const user = await factory.create('User');
    const countPlans = 4;
    let i;

    for (i = 0; i < countPlans; i += 1) {
      factory.create('Plan');
    }

    await request(app)
      .get(`/plans/0`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send();
    const count = await Plan.count();

    expect(count).toBeGreaterThan(countPlans);
  });

  it('permite excluir um plano existente com usuário autenticado', async () => {
    const user = await factory.create('User');
    const plan = await factory.create('Plan');

    const totalPlan = await Plan.count();

    await request(app)
      .delete(`/plans/${plan.id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    const menorPlan = await Plan.count();

    expect(totalPlan - 1).toBe(menorPlan);
  });

  it('não permite excluir um plano inexistente com usuário autenticado', async () => {
    const user = await factory.create('User');
    await factory.create('Plan');

    const totalPlan = await Plan.count();

    const response = await request(app)
      .delete(`/plans/999`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    const menorPlan = await Plan.count();

    expect(response.status).toBe(401);
    expect(totalPlan).toBe(menorPlan);
  });
});
