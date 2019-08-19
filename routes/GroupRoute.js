let router = require('express').Router();
let services = require('../services/index');
let middleFunc=require('../statics/functions').middleFunc;


router.get('/',middleFunc ,(req, res) => {

    
    services.GroupService.GetGroup(req,res);
    //res.render('addGroup');
    
})


router.post('/',middleFunc ,(req, res) => {
    services.GroupService.AddGroup(req, res);
})


router.post('/getMessages',middleFunc ,(req, res) => {
    services.GroupService.getMessages(req, res);
})

router.post('/message',middleFunc ,(req, res) => {
    services.GroupService.message(req, res);
})



module.exports = router;