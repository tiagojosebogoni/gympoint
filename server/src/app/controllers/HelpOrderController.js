import * as Yup from 'yup';

import HelpOrder from '../models/Help_Order';
import Student from '../models/Student';

class HelpOrderController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const { count, rows } = await HelpOrder.findAndCountAll({
      where: {
        answer_at: null,
      },
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json({
      total: count,
      page,
      perPage: 20,
      helpOrders: rows,
    });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Campo pergunta é obrigatório' });
    }

    const { student_id } = req.params;
    const { question } = req.body;

    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.status(401).json({ error: 'Aluno não encontrado' });
    }

    const helpOrder = await HelpOrder.create({
      student_id,
      question,
    });

    return res.json(helpOrder).send();
  }

  async show(req, res) {
    const { student_id } = req.params;
    const { page = 1 } = req.query;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Aluno não encontrado.' });
    }

    const { count, rows } = await HelpOrder.findAndCountAll({
      where: {
        student_id,
      },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
      order: [['createdAt', 'DESC']],
      limit: 10,
      offset: (page - 1) * 10,
    });

    return res.json({
      total: count,
      page,
      perPage: 10,
      helpOrders: rows,
    });
  }
}

export default new HelpOrderController();
