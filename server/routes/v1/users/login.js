import _ from "lodash";
import User from "../../../models/user";

const login = (req, res) => {
    const body =  _.pick(req.body, ['email', 'password']);
    if(!body.password || !body.email){
        res.status(400).send();
    }

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send();
        });
    }).catch((e) => {
        res.status(400).send();
    });
};

export default login;