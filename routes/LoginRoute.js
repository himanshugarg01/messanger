let router = require('express').Router();
let services = require('../services/index');




router.get('/', (req, res) => {
    res.render('login');
})


router.post('/', (req, res) => {
    services.LoginService.LoginService(req, res);
})


module.exports = router;