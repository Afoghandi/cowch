const mongoose = require('mongoose');

const Profileschema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required:true,
    },

    profileName: {
        type: String,
        default: 'Viewer',
        trim:true,
        required:true,
    },
    userName: {
        type: String,
        trim:true,
        
        required: true,
    },
    photoUrl: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png',
    },
});
Profileschema.index({user:1, profileName:1}, {unique:true});

module.exports = mongoose.model('profile', Profileschema);