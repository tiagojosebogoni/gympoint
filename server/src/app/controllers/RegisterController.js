import * as Yup from 'yup';
import { addMonths } from 'date-fns';
import Plan from '../models/Plan';
import Student from '../models/Student';
import Register from '../models/Register';

class RegisterController {
  // async index(req, res) {}
  async store(req, res) {
    const schema = Yup.object().shape({
      date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Campos obrigatórios' });
    }

    const { date } = req.body;
    const { idStudent, idPlan } = req.params;

    const student = await Student.findByPk(idStudent);
    if (!student) {
      return res.status(401).json({ error: 'Aluno não encontrado' });
    }

    const plan = await Plan.findByPk(idPlan);
    if (!plan) {
      return res.status(401).json({ error: 'Plano não encontrado' });
    }

    const start_date = new Date(date);
    const end_date = addMonths(start_date, plan.duration);
    const price = plan.price * plan.duration;

    const register = await Register.create({
      start_date,
      end_date,
      price,
      plan_id: plan.id,
      student_id: student.id,
    });

    return res.json(register);
  }

  async update(req, res) {
    const { id, idStudent, idPlan } = req.params;
    const plan = await Plan.findByPk(idPlan);
    if (!plan) {
      return res.status(401).json({ error: 'Plano não encontrado' });
    }

    const student = await Student.findByPk(idStudent);
    if (!student) {
      return res.status(401).json({ error: 'Aluno não encontrado' });
    }
    const register = await Register.findByPk(id);
    if (!register) {
      return res.status(401).json({ error: 'Matrícula não encontrada' });
    }

    const { start_date } = register;
    const end_date = addMonths(start_date, plan.duration);
    const price = plan.price * plan.duration;

    const registerUpdate = await register.update({
      plan_id: id,
      price,
      start_date,
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
