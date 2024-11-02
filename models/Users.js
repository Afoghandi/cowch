const mongoose = require('mongoose');

const Userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim:true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
         default: 'https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png',
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = User = mongoose.model('user', Userschema);