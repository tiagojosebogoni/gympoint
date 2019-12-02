import { Op } from 'sequelize';
import { subDays } from 'date-fns';
import Checkin from '../models/Checkin';
import Student from '../models/Student';

class PlanController {
  async index(req, res) {
    const { student_id } = req.params;

    const checkin = await Checkin.findAndCountAll({ where: { student_id } });

    return res.json(checkin);
  }

  async store(req, res) {
    const { student_id } = req.params;

    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.status(401).json({ error: 'Aluno não encontrado' });
    }
    const startDate = new Date();
    const endDate = subDays(startDate, 7);

    const countCheckin = await Checkin.count({
      where: { student_id, created_at: { [Op.between]: [endDate, startDate] } },
    });

    if (countCheckin >= 5) {
      return res.status(401).send({
        error: 'Não é possível realizar o checkin valor máximo de vezes 5',
      });
    }

    const checkin = await Checkin.create({ student_id });

    return res.json(checkin).send();
  }
}

export default new PlanController();
