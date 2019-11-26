import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanControlle from './app/controllers/PlanController';
import RegisterController from './app/controllers/RegisterController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);

routes.post('/plans', PlanControlle.store);
routes.put('/plans/:id', PlanControlle.update);
routes.get('/plans/:id', PlanControlle.index);
routes.delete('/plans/:id', PlanControlle.delete);

routes.post('/students/:id_student/plans/:id_plan', RegisterController.store);

// ////////////////////////////////////////
routes.get('/dashboard', (req, res) => {
  return res.status(200).send();
});

export default routes;
