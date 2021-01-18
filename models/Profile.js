const mongoose = require('mongoose');

const Profileschema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    profileName: {
        type: String,
        required: true,
    },
    photoUrl: {
        type: String,
    },
});

module.exports = Profile = mongoose.model('profile', Profileschema);