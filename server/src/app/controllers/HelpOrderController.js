import * as Yup from 'yup';

import HelpOrder from '../models/Help_Order';
import Student from '../models/Student';

class PlanController {
  async index(req, res) {
    const { student_id } = req.params;

    const helpOrder = await HelpOrder.findAndCountAll({
      where: { student_id },
    });

    return res.json(helpOrder);
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
}

export default new PlanController();
