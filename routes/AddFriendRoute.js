let router = require('express').Router();
let services = require('../services/index');
let middleFunc=require('../statics/functions').middleFunc;
var flash = require('connect-flash');
router.use(flash());


router.get('/', middleFunc,(req, res) => {
    res.render('addfriend',{ messages: req.flash('info') });
    
})


router.post('/',middleFunc ,(req, res) => {
    services.AddFriendService.AddFriend(req, res);
})


module.exports = router;