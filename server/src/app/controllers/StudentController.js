import * as Yup from 'yup';
import { Op } from 'sequelize';
import Student from '../models/Student';

class StudentController {
  async show(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);
    return res.json(student);
  }

  async index(req, res) {
    const { page = 1, name = '' } = req.query;

    const students = await Student.findAndCountAll({
      limit: process.env.ITENS_PAGE,
      offset: (page - 1) * process.env.ITENS_PAGE,
      where: {
        [Op.or]: [{ name: { [Op.iLike]: `%${name}%` } }],
      },
      order: [['name']],
    });

    const pages = Math.ceil(students.count / process.env.ITENS_PAGE);
    return res.json({ pages, students });
  }

  async store(req, res) {
    const { name, email, age, weight, height } = req.body;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .positive()
        .integer(),
      weight: Yup.number().positive(),
      height: Yup.number().positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Campos obrigatórios' });
    }

    const checkEmail = await Student.findOne({ where: { email } });
    if (checkEmail) {
      return res.status(401).json({ error: 'Aluno já existe' });
    }

    const student = await Student.create({ name, email, age, weight, height });

    return res.json(student);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .positive()
        .integer(),
      weight: Yup.number().positive(),
      height: Yup.number().positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Campos obrigatórios' });
    }

    const { id } = req.params;
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(401).json({ error: 'Aluno não encontrado' });
    }
    const { email } = req.body;

    if (email !== student.email) {
      const checkEmail = await Student.findOne({ where: { email } });

      if (checkEmail) {
        return res.status(401).json({ error: 'Email já está sendo usado.' });
      }
    }

    const newStudent = await student.update(req.body);
    return res.json(newStudent);
  }
}

export default new StudentController();
