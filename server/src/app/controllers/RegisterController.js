import * as Yup from 'yup';
import { Op } from 'sequelize';
import { parseISO, addMonths, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Plan from '../models/Plan';
import Student from '../models/Student';
import Register from '../models/Register';

import Mail from '../../lib/Mail';

class RegisterController {
  async index(req, res) {
    const { page = 1, name = '' } = req.query;

    const registers = await Register.findAndCountAll({
      limit: process.env.ITENS_PAGE,
      offset: (page - 1) * process.env.ITENS_PAGE,
      include: [
        {
          model: Student,
          as: 'student',
          where: {
            [Op.or]: [{ name: { [Op.iLike]: `%${name}%` } }],
          },
          attributes: ['name'],
        },

        {
          model: Plan,
          as: 'plan',
          attributes: ['title', 'duration', 'price'],
        },
      ],
      atributes: ['id', 'start_date', 'end_date', 'price', 'active'],
    });

    const pages = Math.ceil(registers.count / process.env.ITENS_PAGE);
    return res.json({ pages, registers });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: `Campos obrigatórios ${JSON.stringify(req.body)}` });
    }

    const { student_id, plan_id, start_date } = req.body;
    const formattedDateStart = parseISO(start_date);

    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.status(401).json({ error: 'Aluno não encontrado' });
    }

    const plan = await Plan.findByPk(plan_id);
    if (!plan) {
      return res.status(401).json({ error: 'Plano não encontrado' });
    }

    const end_date = addMonths(formattedDateStart, plan.duration);
    const price = plan.price * plan.duration;

    const register = await Register.create({
      start_date: formattedDateStart,
      end_date,
      price,
      plan_id,
      student_id,
    });

    const dateStartFomatted = format(
      formattedDateStart,
      "dd 'de' MMMM 'de' yyyy'",
      {
        locale: pt,
      }
    );

    const dateEndFomatted = format(end_date, "dd 'de' MMMM 'de' yyyy'", {
      locale: pt,
    });

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Matrícula realizada',
      text: `Parabéns, ${student.name}
      sua matrícula foi realiza com início em ${dateStartFomatted} e o término em ${dateEndFomatted}`,
    });

    return res.json(register);
  }

  async update(req, res) {
    const { id } = req.params;

    const { plan_id, start_date } = req.body;

    const plan = await Plan.findByPk(plan_id);
    if (!plan) {
      return res.status(401).json({ error: 'Plano não encontrado' });
    }

    const formattedDateStart = parseISO(start_date);
    const register = await Register.findByPk(id);
    if (!register) {
      return res.status(401).json({ error: 'Matrícula não encontrada' });
    }

    const end_date = addMonths(formattedDateStart, plan.duration);
    const price = plan.price * plan.duration;

    const registerUpdate = await register.update({
      plan_id,
      price,
      start_date: formattedDateStart,
      end_date,
    });

    return res.json(registerUpdate);
  }

  async delete(req, res) {
    const { id } = req.params;

    const register = await Register.findByPk(id);
    if (!register) {
      return res.status(401).send();
    }

    await register.destroy();

    return res.status(200).send();
  }
}

export default new RegisterController();
