import request from 'supertest';
import { subDays } from 'date-fns';
import app from '../../src/app';
import factory from '../factories';

describe('Checkin', () => {
  it('permite realizar o checkin', async () => {
    const student = await factory.create('Student');

    const response = await request(app)
      .post(`/students/${student.id}/checkins`)
      .send();

    expect(response.body).toHaveProperty('id');
  });

  it('não permite inserir matrícula com aluno não existente', async () => {
    const response = await request(app)
      .post(`/students/0/checkins`)
      .send();

    expect(response.status).toBe(401);
  });

  it('não permite realizar mais de 5 checkin em 7 dias corridos', async () => {
    const student = await factory.create('Student');

    const date = new Date();

    await factory.create('Checkin', {
      student_id: student.id,
      createdAt: subDays(date, 8),
    });

    await factory.create('Checkin', {
      student_id: student.id,
      createdAt: subDays(date, 7),
    });

    await factory.create('Checkin', {
      student_id: student.id,
      createdAt: subDays(date, 5),
    });
    await factory.create('Checkin', {
      student_id: student.id,
      createdAt: subDays(date, 4),
    });
    await factory.create('Checkin', {
      student_id: student.id,
      createdAt: subDays(date, 3),
    });
    await factory.create('Checkin', {
      student_id: student.id,
      createdAt: subDays(date, 2),
    });
    await factory.create('Checkin', {
      student_id: student.id,
      createdAt: subDays(date, 1),
    });

    const response = await request(app)
      .post(`/students/${student.id}/checkins`)
      .send();

    expect(response.status).toBe(401);
  });

  it('listar todos os checkins do aluno', async () => {
    const student = await factory.create('Student');

    const date = new Date();

    await factory.create('Checkin', {
      student_id: student.id,
      createdAt: subDays(date, 4),
    });
    await factory.create('Checkin', {
      student_id: student.id,
      createdAt: subDays(date, 3),
    });
    await factory.create('Checkin', {
      student_id: student.id,
      createdAt: subDays(date, 2),
    });
    await factory.create('Checkin', {
      student_id: student.id,
      createdAt: subDays(date, 1),
    });

    const response = await request(app)
      .get(`/students/${student.id}/checkins`)
      .send();

    const { count } = response.body;

    expect(count).toBe(4);
  });
});
