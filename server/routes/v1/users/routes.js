import _ from "lodash";
import User from "./../../../models/user";
import {Router} from "express";
import login from './login';
import authenticate from './../../../middleware/authenticate';

const router = new Router({});
const usersRouter = new Router({});

usersRouter.post('/', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    let user = new User({
        email: body.email,
        password: body.password
    });

    user.save().then((user) => {
        return user.generateAuthToken();
    }).then((token) => {
        res.status(201).header('x-auth', token).send(user);
    }).catch((e) => {
        console.log(e);
        res.status(409).send();
    });
});

usersRouter.get('/me', authenticate, (req, res) => {
    res.send(req.user);
});

usersRouter.post('/login', login);

router.use('/users', usersRouter);

export default router;