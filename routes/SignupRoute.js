let router = require('express').Router();
let services = require('../services');


router.get('/', (req, res) => {
    res.render('signup');
})



router.post('/', (req, res) => {
    services.SignupService.SignupServices(req, res);
})

module.exports = router;