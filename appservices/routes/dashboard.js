const express = require('express');
const router = express.Router();
const familyService = require('../services/family.service');

// routes
router.get('/family', getFamily);
router.post('/family/member/add', addFamilyMember);
router.post('/family/member/remove', removeFamilyMember);

module.exports = router;

function getFamily(req, res, next) {
    familyService.getFamily(req.user)
        .then(family => family ? res.json(family) : res.status(400).json({ message: 'user name or password are not valid' }))
        .catch(err => next(err));
}

function addFamilyMember(req, res, next) {
    familyService.addFamilyMember(req.body,req.user)
        .then(family => family ? res.json(family) : res.status(400).json({ message: 'user name or password are not valid' }))
        .catch(err => next(err));
}

function removeFamilyMember(req, res, next) {
    familyService.removeFamilyMember(req.body,req.user)
        .then(family => family ? res.json(family) : res.status(400).json({ message: 'user name or password are not valid' }))
        .catch(err => next(err));
}