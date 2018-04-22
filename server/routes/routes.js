import {Router} from 'express';
import v1 from './v1/routes';

const router = new Router({});

router.use('/v1', v1);

export default router;