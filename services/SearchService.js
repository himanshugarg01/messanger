let users = require('../model/users');
let fs = require('fs');

function Users(req, res){
    let {search} = req.body;
    console.log(req.body);
    users.find({
      "userName":  { '$regex' : search, '$options' : 'i' }
    })
    .then(data => {
      console.log(data);
        res.json({data})
      })
      .catch(err => {
        res.json({error: true});
      })
}

function Friends(req, res){
  let {search,userName} = req.body;
  console.log(req.body);
  users.find({
    'userName' : userName,
   // "friends.userName":  { '$regex' : search, '$options' : 'i' }
  }).populate({
    path : 'friends',

    match : {userName : { '$regex' : search, '$options' : 'i' }}
  })
  .then(data => {
    console.log('data-------', data,data[0].friends);

   //   fs.writeFile('./out.txt', JSON.stringify(data, undefined, 2), (err) => {
     //   console.log(err);
     // });
      res.json({data})
    })
    .catch(err => {
      console.log(err);
      
      res.json({error: true});
    })
}

module.exports = {
   Users,
   Friends,
}