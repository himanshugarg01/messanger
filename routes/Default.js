let router = require('express').Router();
let services = require('../services/index');




router.get('/', (req, res) => {
    res.redirect('/login');
})



module.exports = router;