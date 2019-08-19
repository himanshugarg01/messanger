let router = require('express').Router();
let services = require('../services');

router.post('/users', (req, res) => {
    services.SearchService.Users(req, res);
})

router.post('/friends', (req, res) => {
    services.SearchService.Friends(req, res);
})

module.exports = router;