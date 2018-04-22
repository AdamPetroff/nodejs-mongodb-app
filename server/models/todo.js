import mongoose from './../db/mongoose';

const Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    }
});

export default Todo;