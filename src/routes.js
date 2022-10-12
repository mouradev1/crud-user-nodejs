import { Router } from 'express';
import UserController from './controllers/UserController';
const routes = new Router();

routes.post('/users', UserController.create)
routes.get('/',UserController.getUsers);
routes.get('/users/:id',UserController.getUserId)
routes.put('/users',UserController.updateUser)
routes.delete('/users/:id',UserController.deleteUser)

export default  routes;