import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const { name, email, password } = req.body;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid({ name, email, password }))) {
      return res.status(400).json({ error: 'Campos obrigatórios' });
    }

    const checkEmail = await User.findOne({ where: { email } });

    if (checkEmail) {
      return res.status(401).send();
    }

    const user = await User.create(req.body);
    return res.json(user);
  }
}

export default new UserController();
