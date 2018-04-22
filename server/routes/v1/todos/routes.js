import Todo from "./../../../models/todo";
import _ from "lodash";
import {Router} from "express";
import {ObjectID} from 'mongodb';

const router = new Router({});
const todosRouter =  new Router({});

todosRouter.route('/:id').get(async (req, res) => {
    const id = req.params.id;

    if(!ObjectID.isValid(id)){
        res.status(400).send();
    }

    try {
        const todo = await Todo.find({_id: id});
        if(!todo){
            res.status(404).send();
        }
        res.send({todo});

    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
}).delete(async (req, res) => {
    const id = req.params.id;

    if(!ObjectID.isValid(id)){
        res.status(400).send();
    }

    try {
        const todo = await Todo.findByIdAndRemove(id);
        if(!todo){
            res.status(404).send();
        }

        res.send(todo);
    } catch (e) {
        res.status(400).send();
    }
}).patch(async (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(400).send();
    }

    const body = _.pick(req.body, ['text', 'completed']);

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completedAt = null;
        body.completed = false;
    }

    try {
        const todo = await Todo.findByIdAndUpdate(id, {$set: body}, {new: true});
        if (!todo) {
            res.status(404).send();
        }

        res.send(todo);
    } catch (e) {
        console.log(res.status(400).send());
    }
});

todosRouter.route('/').post(async (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    try{
        const doc = await todo.save();
        res.send(doc);
    } catch (e) {
        res.status(400).send(e);
    }
}).get(async (req, res) => {
    try{
        const todos = await Todo.find();
        res.send({todos});
    } catch (e) {
        res.status(400).send(e);
    }
});

router.use('/todos', todosRouter);

export default router;