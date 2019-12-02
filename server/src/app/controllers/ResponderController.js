import * as Yup from 'yup';
import HelpOrder from '../models/Help_Order';
import Student from '../models/Student';

class ResponderController {
  async indexAll(req, res) {
    const helpOrder = await HelpOrder.findAndCountAll({
      where: { answer_at: null },
    });

    return res.json(helpOrder);
  }

  async index(req, res) {
    const { student_id } = req.params;

    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.json({ error: 'Aluno não encontrado' });
    }

    const helpOrder = await HelpOrder.findAll({ where: { student_id } });

    return res.json(helpOrder);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Campos obrigatórios' });
    }

    const { id } = req.params;
    const { answer } = req.body;
    const helpOrder = await HelpOrder.findByPk(id);

    if (!helpOrder) {
      return res.status(401).json({ error: 'Pergunta não encontrada' });
    }

    helpOrder.update({ answer, answer_at: new Date() });
    return res.json(helpOrder);

    // fazer a parte de mandar email com a resposta
  }
}

export default new ResponderController();
