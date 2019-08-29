let router = require('express').Router();
let services = require('../services/index');
let middleFunc=require('../statics/functions').middleFunc;
var flash = require('connect-flash');
router.use(flash());


router.get('/',middleFunc ,(req, res) => {
    res.render('chat',{ messages: req.flash('info') });
})


router.post('/getUser',middleFunc ,(req, res) => {
    services.ChatService.getUser(req, res);
})


router.post('/getFriends',middleFunc ,(req, res) => {
    services.ChatService.getFriends(req, res);
})

router.post('/message',middleFunc ,(req, res) => {
    services.ChatService.message(req, res);
})

router.post('/getMessages',middleFunc ,(req, res) => {
    services.ChatService.getMessages(req, res);
})
router.post('/updateOnline',middleFunc ,(req, res) => {
    services.ChatService.updateOnline(req, res);
})



module.exports = router;