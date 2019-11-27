import * as Yup from 'yup';
import { addMonth, parseISO, formatISO } from 'date-fns';
import Plan from '../models/Plan';
import Student from '../models/Student';
import Register from '../models/Register';

class RegisterController {
  // async index(req, res) {}
  async store(req, res) {
    const { date } = req.body;

    const schema = Yup.object().shape({
      date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Campos obrigatórios' });
    }

    const { idStudent, idPlan } = req.params;

    const student = await Student.findByPk(idStudent);
    if (!student) {
      return res.status(401).json({ error: 'Aluno não encontrado' });
    }

    const plan = await Plan.findByPk(idPlan);
    if (!plan) {
      return res.status(401).json({ error: 'Plano não encontrado' });
    }

    const dateFormatted = parseISO(date);

    const endDateFormatted = addMonth(dateFormatted, plan.duration);
    const end_date = formatISO(endDateFormatted)

    const price = plan.price * plan.duration;
    const register = await Register.create({
      start_date: date,
      end_date,
      price,
      plan_id: plan.id,
      student_id: student.id,
    });

    return res.json(register);

    /*


    const { title, duration, price } = req.body;
    const student = await Student.findByPk(idStudent);



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
