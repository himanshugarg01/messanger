let router = require('express').Router();
let services = require('../services');
var flash = require('connect-flash');
router.use(flash());

router.get('/', (req, res) => {
    res.render('signup',{ messages: req.flash('info') });
})



router.post('/', (req, res) => {
    services.SignupService.SignupServices(req, res);
})
router.post('/checkName', (req, res) => {
    services.SignupService.checkName(req, res);
})

module.exports = router;