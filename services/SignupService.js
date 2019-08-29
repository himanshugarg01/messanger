let users = require('../model/users');

function SignupServices(req, res){
  
    
    let {firstName, lastName, userName, password} = req.body;
    console.log(req.body);
    users.find({
       "userName" : userName
    })
        .then((user) => {
            if(user.length>0){
                req.flash('info', 'Username already exists!')
                res.send();
            }
            else{
                let newUser = new users({
                    'firstName' : firstName,
                    'lastName' : lastName,
                    'userName' : userName,
                     'password' : password,
                     'online' : false,
                });
                newUser.save().then(data => {
                    req.flash('info', 'Signed up successfully!')
                     res.redirect('/login')
                     })
                     .catch(err => {
                       console.error(err)
                       res.redirect('/signup')
                     })
            }
        })
}

function checkName(req, res){
  
    
    let { userName} = req.body;
   // console.log(req.body);
    users.find({
       "userName" : userName
    })
        .then((user) => {
            if(user.length>0){
                
                res.send(true);
            }
            else{
                res.send(false)
            }
        })
}

module.exports = {
    SignupServices,
    checkName,
}