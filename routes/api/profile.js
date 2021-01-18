const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/Users');

//@route      Post api/profile/

//@desc       Get current users profile
//@access     Private
router.post(
    '/',
    auth, [check('profileName', 'Name is required').not().isEmpty()],
    async(req, res) => {
        const errors = validationResult(req);
        const { profileName } = req.body;
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            let profile = await Profile.findOne({ profileName });
            if (profile) {
                return res.status(400).json({
                    error: [
                        { msg: 'Profile name already exists, please choose another' },
                    ],
                });
            }

            profile = new Profile({
                profileName,
            });

            await profile.save();
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

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

module.exports = router;