const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/Users');

//@route      Get api/profile

router.get('/me', auth, async(req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate(
            'user',
            'name',
            'avatar'
        );
        if (!profile) {
            return res.status(400).json({ msg: 'No profile set up yet' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route      Post api/profile

//@desc       Create or update profile
//@access     Private
router.post(
    '/',
    auth, [check('profileName', 'Name is required').not().isEmpty()],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { profileName, photoUrl } = req.body;

        //build profile object
        const profileFields = {};
        profileFields.user = req.user.id;

        if (profileName) profileFields.profileName = profileName;
        if (photoUrl) profileFields.photoUrl = photoUrl;

        try {
            // if there is profile
            let profile = await Profile.findOne({ profileName });

            if (profile) {
                //update
                profile = await Profile.findOneAndUpdate({ profile: req._id }, { $set: profileFields }, { new: true });
                return res.json(profile);
            }
            //create
            profile = new Profile(profileFields);

            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;