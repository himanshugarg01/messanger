let router = require('express').Router();
let services = require('../services/index');
var flash = require('connect-flash');
router.use(flash());

router.get('/', (req, res) => {
    res.render('login',{ messages: req.flash('info') });
})


router.post('/', (req, res) => {
    services.LoginService.LoginService(req, res);
})


module.exports = router;