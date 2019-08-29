let users = require('../model/users');
let messages = require('../model/messages');
var ObjectId=require('mongodb').ObjectID;
//var flash = require('connect-flash');
//router.use(flash());

  function AddFriend(req, res){
    let {friendName} = req.body;
    var friendId;
    if(friendName==req.session.userName)
    {
      req.flash('info', 'you cannot add yourself as your friend');
      res.redirect('/addFriend');
    }
    else{
    users.findOne({
      "userName" : friendName
    })
    .then(data => {
      //console.log(msgObj);
      friendId=""+data._id;
      console.log("////////////////////"+friendId);
      
      let newChat=new messages({
        users : [{user :req.session.userName, friend : friendName }]

        });
        newChat.save()
        .then(msgObj => {
          users.findOneAndUpdate({
            "userName" : req.session.userName,
          },
          {
            $push : {friends: friendId},
           // $push : {chatBox : {$each:[{friendId : friendId,friendName : friendName,chat : msgObj._id}]}}
          })
          .then(data => {
            console.log("add friend   ",data);
              //res.json({data})
            })
            .catch(err => {
              res.json({error: true});
            })
            users.findOneAndUpdate({
              "userName" : req.session.userName,
            },
            {
             // $push : {friends: friendId},
              $push : {chatBox : {$each:[{friendId : friendId,friendName : friendName,chat : msgObj._id}]}}
            })
            .then(data => {
              console.log("add friend   ",data);
              //  res.json({data})
              })
              .catch(err => {
                res.json({error: true});
              })








///////////////// for friend

              users.findOneAndUpdate({
                "_id" : ObjectId(friendId),
              },
              {
                $push : {friends: req.session.Id+""},
               // $push : {chatBox : {$each:[{friendId : friendId,friendName : friendName,chat : msgObj._id}]}}
              })
              .then(data => {
               // console.log("add friend   ",data);
                //  res.json({data})
                })
                .catch(err => {
                  res.json({error: true});
                })
                users.findOneAndUpdate({
                  "_id" : ObjectId(friendId),
                },
                {
                 // $push : {friends: friendId},
                  $push : {chatBox : {$each:[{friendId : req.session.Id+"",friendName : req.session.userName,chat : msgObj._id}]}}
                })
                .then(data => {
               //   console.log("add friend   ",data);
                  //  res.json({data})
                  })
                  .catch(err => {
                    res.json({error: true});
                  })
                  res.redirect('/chat');
        })
        .catch(err => {
          res.json({error: true});
        })
        req.flash('info', 'friend added')
           })
           .catch(err => {
            req.flash('info', 'no friend found')
             console.error(err)
             res.redirect('/addFriend/')
           })
      



          }
  }

module.exports = {
    AddFriend,
};