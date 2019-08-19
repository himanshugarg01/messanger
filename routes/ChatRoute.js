let router = require('express').Router();
let services = require('../services/index');
let middleFunc=require('../statics/functions').middleFunc;



router.get('/',middleFunc ,(req, res) => {
    res.render('chat');
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



module.exports = router;