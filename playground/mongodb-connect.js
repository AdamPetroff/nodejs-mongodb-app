const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unble to connect to mongodb server');
    }

    console.log('Connected to MongoDB server');
    
    // db.collection('Todos').insertOne({
    //     text: 'todo',
    //     completed: false
    // }, (err, result) => {
    //     if(err){
    //         return console.log('Unable to insert todo', err);
    //     }
    //
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    //Insert new doc into Users (name, age, location)

    // db.collection('Users').insertOne({
    //     name: 'Adamko',
    //     age: 21,
    //     location: "piestany"
    // }, (err, result) => {
    //     if(err){
    //         return console.log('Unable to insert user', err);
    //     }
    //
    //     console.log(result.ops[0]._id.getTimestamp());
    // });
        
    db.close();
});