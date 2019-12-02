import request from 'supertest';
import app from '../../src/app';
import factory from '../factories';

describe('Help_Order', () => {
  it('permite o aluno fazer uma pergunta para o academia', async () => {
    const student = await factory.create('Student');

    const response = await request(app)
      .post(`/students/${student.id}/help-orders`)
      .send({ question: 'comer mais batata doce' });

    expect(response.body).toHaveProperty('id');
  });

  it('não permite inserir uma pergunta vazia', async () => {
    const student = await factory.create('Student');

    const response = await request(app)
      .post(`/students/${student.id}/help-orders`)
      .send({ question: '' });

    expect(response.status).toBe(401);
  });

  it('não permite inserir uma pergunta sem um aluno', async () => {
    const response = await request(app)
      .post(`/students/0/help-orders`)
      .send({ question: 'valor da mensalidade' });

    expect(response.status).toBe(401);
  });

  it('listar todas as perguntas não respondidas', async () => {
    const user = await factory.create('User');
    const student = await factory.create('Student');

    await factory.create('Help_Order', {
      student_id: student.id,
      question: 'alguma coisa',
    });
    await factory.create('Help_Order', {
      student_id: student.id,
      question: 'alguma coisa',
    });
    await factory.create('Help_Order', {
      student_id: student.id,
      question: 'alguma coisa',
    });

    const response = await request(app)
      .get(`/help-orders`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send();

    const { count } = response.body;
    expect(count).toBeGreaterThan(1);
  });

  it('listar todas as perguntas de um aluno', async () => {
    const student = await factory.create('Student');

    await factory.create('Help_Order', {
      student_id: student.id,
      question: 'alguma coisa',
    });
    await factory.create('Help_Order', {
      student_id: student.id,
      question: 'alguma coisa',
    });
    await factory.create('Help_Order', {
      student_id: student.id,
      question: 'alguma coisa',
    });
    await factory.create('Help_Order', {
      student_id: student.id,
      question: 'alguma coisa',
    });

    const response = await request(app)
      .get(`/students/${student.id}/help-orders`)
      .send();

    const { count } = response.body;
    expect(count).toBe(4);
  });

  it('responder uma pergunta em aberta', async () => {
    const user = await factory.create('User');
    const student = await factory.create('Student');

    const helpOrder = await factory.create('Help_Order', {
      student_id: student.id,
      question: 'alguma coisa',
    });

    const response = await request(app)
      .get(`/help-orders/${helpOrder.id}/answer`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send();

    const check = response.body.answer_at === null;

    expect(check).toBe(false);
  });
});
