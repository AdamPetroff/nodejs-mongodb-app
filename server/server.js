const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Todo} = require('./models/todo');
var {authenticate} = require('./middleware/authenticate');

var app = express();

app.use(bodyParser.json());

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User({
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

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        res.status(400).send();
    }

    Todo.find({_id: id}).then((todo) => {
        if(!todo){
            res.status(404).send();
        }

        res.send({todo});
    });
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        res.status(400).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo){
            res.status(404).send();
        }

        res.send(todo);
    }, (e) => {
        res.status(400).send();
    });
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        res.status(400).send();
    }

    var body = _.pick(req.body, ['text', 'completed']);

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    } else {
        body.completedAt = null;
        body.completed = false;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo){
            res.status(404).send();
        }

        res.send(todo);
    }, (e) => {
        console.log(res.status(400).send());
    });
});



app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});