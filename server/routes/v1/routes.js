import {Router} from 'express';
import todos from './todos/routes';
import users from './users/routes';

const router = new Router({});

router.use(todos);
router.use(users);

export default router;