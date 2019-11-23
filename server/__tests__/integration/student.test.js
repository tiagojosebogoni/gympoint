import request from 'supertest';
import app from '../../src/app';
import factory from '../factories';

describe('Student', () => {
  it('permite criar aluno com usuário logado', async () => {
    const user = await factory.create('User');
    const student = await factory.attrs('Student');

    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send(student);

    expect(response.body).toHaveProperty('id');
  });

  it('todos os campos são obrigatório no cadastro de aluno', async () => {
    const user = await factory.create('User');

    const response1 = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: '',
        email: 'asdf@gamil.com',
        age: 9,
        weight: 1,
        height: 2,
      });

    expect(response1.status).toBe(400);

    const response2 = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({ name: 'outro', email: '', age: 9, weight: 1, height: 2 });

    expect(response2.status).toBe(400);

    const response3 = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: 'tiago',
        email: 'tiago@gmail.com',
        age: 0,
        weight: 1,
        height: 2,
      });

    expect(response3.status).toBe(400);

    const response4 = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: 'tiago',
        email: 'tiago@gmail.com',
        age: 9,
        weight: 0,
        height: 2,
      });

    expect(response4.status).toBe(400);

    const response5 = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: 'tiago',
        email: 'tiago@gmail.com',
        age: 9,
        weight: 1,
        height: 0,
      });

    expect(response5.status).toBe(400);
  });

  it('permite atualizar os dados do aluno com usuário logado', async () => {
    const user = await factory.create('User');
    const student = await factory.create('Student');
    const nameAlt = 'Tiago Bogoni';

    const response = await request(app)
      .put(`/students/${student.id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: nameAlt,
        email: student.email,
        age: student.age,
        weight: student.weight,
        height: student.height,
      });

    expect(response.body.name).toBe(nameAlt);
  });

  it('não permite atualizar aluno não existente', async () => {
    const user = await factory.create('User');
    const student = await factory.create('Student');

    const response = await request(app)
      .put(`/students/0`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: 'Nome Alterado',
        email: student.email,
        age: student.age,
        weight: student.weight,
        height: student.height,
      });

    expect(response.status).toBe(401);
  });

  it('não permite cadastrar aluno com email duplicado', async () => {
    const user = await factory.create('User');

    const student = await factory.create('Student');
    const newStudent = await factory.attrs('Student', { email: student.email });

    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send(newStudent);

    expect(response.status).toBe(401);
  });

  it('não permite atualizar aluno com email duplicado', async () => {
    const user = await factory.create('User');
    const student = await factory.create('Student', {
      email: 'tiago@gmail.com',
    });
    const newStudent = await factory.create('Student');

    const response = await request(app)
      .put(`/students/${newStudent.id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: newStudent.name,
        email: student.email,
        age: newStudent.age,
        weight: newStudent.weight,
        height: newStudent.height,
      });
    console.log(JSON.stringify(response.body));
    expect(response.status).toBe(401);
  });
});
