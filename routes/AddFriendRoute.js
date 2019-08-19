let router = require('express').Router();
let services = require('../services/index');
let middleFunc=require('../statics/functions').middleFunc;


router.get('/', middleFunc,(req, res) => {
    res.render('addfriend');
    
})


router.post('/',middleFunc ,(req, res) => {
    services.AddFriendService.AddFriend(req, res);
})


module.exports = router;