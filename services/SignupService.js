let users = require('../model/users');

function SignupServices(req, res){
    let {firstName, lastName, userName, password} = req.body;
    console.log(req.body);
    users.find({
       "userName" : userName
    })
        .then((user) => {
            if(user.length>0){
                res.send({'success' : false});
            }
            else{
                let newUser = new users({
                    firstName,
                    lastName,
                    userName,
                    password,
                });
                newUser.save().then(data => {
                     res.redirect('/login')
                     })
                     .catch(err => {
                       console.error(err)
                       res.redirect('/signup')
                     })
            }
        })
}

module.exports = {
    SignupServices,
}