const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/Users');
const { route } = require('./users');

//@route      Get api/profile
//@desc       Gets the default profile in 'Who's watching' component

router.get('/', auth, async(req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate(
            'user',
            'name'
        );
        if (!profile) {
            return res.status(400).json({ msg: 'No profile set up yet' });
        }
        return res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route      get api/profile

//@desc       returns all profiles associated with the user
//@access     Private;
router.get('/me', auth, async(req, res) => {
    try {
        const profiles = await Profile.find({
            user: req.user.id,
        }).populate('user', ['name']);

        if (profiles) {
            res.json(profiles);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route      Post api/profile

//@desc       Create or update profile to be displayed on 'who's watching' component
//@access     Private
router.post(
    '/',
    auth, [check('userName', 'Name is required').not().isEmpty()],
    async(req, res) => {
       
    
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { profileName='Viewer' , photoUrl, userName } = req.body;

        //build profile object
        const profileFields = {
            user:req.user.id,
            profileName,
            userName,
            photoUrl
        };
       

        try {
            // if there is profile
            let profile = await Profile.findOne({ user:req.user.id, profileName });

            if (profile) {
                //update
                profile = await Profile.findOneAndUpdate({ _id: profile_id }, { $set: profileFields }, { new: true });
                return res.json(profile);
            }
            //create
            profile = new Profile(profileFields);

            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);

            if(err.code === 11000){
                return res.status(400).json({msg:"Profile name already exist for this user" });
            }
            res.status(500).send('Server error');
        }
    }
);

//@route  DELETE api/profile

//@desc   Delete profile & user

//@access    Private
router.delete('/', auth, async(req, res) => {
    try {
        //Remove Profile
        await Profile.findOneAndRemove({ user: req.user.id });
        //Remove User
        await User.findOneAndRemove({ _id: req.user.id });
        res.json({ msg: 'User deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route     DELETE api/profile_id
//@route     Delete profile by ID
//@access    Private

router.delete('/:profile_id', auth, async(req, res) => {
    console.log("Profile ID received in backend:", req.params.profile_id);
    try {
        const profile = await Profile.findOneAndRemove({_id:req.params.profile_id, user: req.user.id});
        if(!profile){
            return res.status(404).json({msg:'Profile not found'});
        }
       
        res.json('profile has been deleted');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;