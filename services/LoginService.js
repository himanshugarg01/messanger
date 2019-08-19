let users = require('../model/users');

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
          
           res.redirect('/chat');
         })
         .catch(err => {
           console.error(err)
           res.send(error)
         })
}

module.exports = {
    LoginService,
};