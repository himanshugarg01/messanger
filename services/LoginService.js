let users = require('../model/users');
let router = require('express').Router();
var jwt=require('jsonwebtoken');
var cookieParser = require('cookie-parser');
router.use(cookieParser());




function LoginService(req, res){
    let {userName, password} = req.body;
    users.findOne({
        userName : userName,
        password : password,
    })
    .then(data => {
          req.session.islogin=1;
          req.session.userName=data.userName;
          req.session.name=data.firstName;
          req.session.Id=data._id;
          console.log(req.session.islogin);
          jwt.sign({userName : req.session.userName},'himanshu',(err,token)=>{
            console.log('token generated',token);
            
            res.cookie('token',token);
            res.redirect('/chat');
          });
         // res.cookie('token' , 'token')
           
         })
         .catch(err => {
           console.error(err)
           res.redirect('/login');
           //res.send(error)
         })
}

module.exports = {
    LoginService,
};