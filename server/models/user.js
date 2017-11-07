var mongoose = require('mongoose');

var User = mongoose.model('User', {
    email: {
        trim: true,
        required: true,
        type: String,
        minlength: 1
    }
});

module.exports = {User};