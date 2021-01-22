const mongoose = require('mongoose');

const Profileschema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },

    profileName: {
        type: String,
        default: 'Viewer',
    },
    userName: {
        type: String,
        required: true,
    },
    photoUrl: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png',
    },
});

module.exports = mongoose.model('profile', Profileschema);