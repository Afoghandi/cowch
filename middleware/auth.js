const jwt = require('jsonwebtoken');
const config = require('config');
module.exports = function(req, res, next) {
    //Get tpken from header
    const token = req.header('x-auth-token');

    //check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No Token, authorisation denied' });
    }

    //verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};