import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanControlle from './app/controllers/PlanController';
import RegisterController from './app/controllers/RegisterController';
import HelpOrder from './app/controllers/HelpOrderController';
import CheckinController from './app/controllers/CheckinController';
import ResponderController from './app/controllers/ResponderController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.post('/students/:student_id/checkins', CheckinController.store);
routes.get('/students/:student_id/checkins', CheckinController.index);
routes.post('/students/:student_id/help-orders', HelpOrder.store);
routes.get('/students/:student_id/help-orders', HelpOrder.index);

routes.use(authMiddleware);

routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);

routes.post('/plans', PlanControlle.store);
routes.put('/plans/:id', PlanControlle.update);
routes.get('/plans/:id', PlanControlle.index);
routes.delete('/plans/:id', PlanControlle.delete);

routes.post(
  '/register/students/:idStudent/plans/:idPlan',
  RegisterController.store
);
routes.put(
  '/register/:id/students/:idStudent/plans/:idPlan',
  RegisterController.update
);
routes.delete('/register/:id', RegisterController.delete);

routes.get('/help-orders', ResponderController.indexAll);
routes.get('/students/:student_id/help-orders', ResponderController.index);
routes.post(`/help-orders/:id}/answer`, ResponderController.store);

// ////////////////////////////////////////
routes.get('/dashboard', (req, res) => {
  return res.status(200).send();
});

export default routes;
