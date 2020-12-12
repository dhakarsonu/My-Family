const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');

// routes
router.post('/', authenticate);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'user name or password are not valid' }))
        .catch(err => next(err));
}