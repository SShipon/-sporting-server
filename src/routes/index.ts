import { Router } from 'express';
import userRoute from '../modules/User/user.route';
import productRoute from '../modules/Products/product.route';

const router = Router();
const moduleRoutes = [
  { path: '/users', route: userRoute },
  { path: '/products', route: productRoute },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
