import * as Yup from 'yup';
import { parseISO, addMonths } from 'date-fns';
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
    /*
    const { idStudent, idPlan } = req.params;

    const { title, duration, price } = req.body;
    const plan = await Register.create({ title, duration, price });
    const student = await Student.findByPk(idStudent);
    const plan = await Plan.findByPk(idPlan);
    if (!student) {
      return res.status(401).json({ error: 'Aluno não encontrado' });
    }

    if (!plan) {
      return res.status(401).json({ error: 'Plano não encontrado' });
    }

    const start_date = parseISO(req.body.date)
    const end_date = addMonth(start_date, plan.duration)
    const price = plan.price * plan.duration

    const register = await Register.create({
      idSudent,
      idPlan,
      start_date,
      end_date,
      price,
    });
    // manda Email

    return res.send(register);
   */
    return res.send();
  }

  /*
  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .positive()
        .integer(),
      price: Yup.number().positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Campos obrigatórios' });
    }
    const { id } = req.params;

    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(401).send();
    }

    const newPlan = await plan.update(req.body);

    return res.json(newPlan);
  }

  async delete(req, res) {
    const { id } = req.params;

    const plan = await Plan.findByPk(id);
    if (!plan) {
      return res.status(401).send();
    }

    await plan.destroy();

    return res.status(200).send();
  } */
}

export default new RegisterController();
