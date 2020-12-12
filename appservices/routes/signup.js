const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');

// routes
router.post('/', createUser);

module.exports = router;

function createUser(req, res, next) {
    userService.createUser(req.body)
        .then(user => user ? res.json(user) : res.status(500).json({ message: 'error while creating user account' }))
        .catch(err => next(err));
}