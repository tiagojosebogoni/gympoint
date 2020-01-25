import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const { id } = req.params;
    const { page = 1 } = req.query;

    if (id > 0) {
      const plan = await Plan.findByPk(id);
      return res.json(plan);
    }

    const plans = await Plan.findAndCountAll({
      limit: process.env.ITENS_PAGE,
      offset: (page - 1) * process.env.ITENS_PAGE,
    });

    const pages = Math.ceil(plans.count / process.env.ITENS_PAGE);

    return res.json({ pages, plans });
  }

  async store(req, res) {
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

    const { title, duration, price } = req.body;

    const plan = await Plan.create({ title, duration, price });
    return res.json(plan);
  }

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
  }
}

export default new PlanController();
