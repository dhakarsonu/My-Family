const userService = require('./user.service');

module.exports = isAuthenticated;

async function isAuthenticated(req, res, next) {
    
    // check for basic auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Bearer ') === -1) {
        return res.status(401).json({ message: 'Missing Authorization Header'});
    }

    // verify auth credentials
    const token =  req.headers.authorization.split(' ')[1];
    const user = await userService.validate(token);
    if (!user) {
        return res.status(401).json({ message: 'Authentication failed'});
    }

    // attach user to request object
    req.user = user;

    next();
}