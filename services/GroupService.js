let users = require('../model/users');
let messages = require('../model/messages');
var ObjectId=require('mongodb').ObjectID;


function GetGroup(req,res)
{
  users.findOne({
    '_id' : ObjectId(req.session.Id),
  }).populate('friends')
  .then(data => {
    res.render('addGroup',{'data' : data.friends});
    })
    .catch(err => {
      console.log(err);
      
      res.send(err);
    })
  
}

function AddGroup(req, res){
  //console.log(req.body);
  
   let {members,groupName}=req.body;
  members.push(req.session.Id);

   let newChat=new messages({
    users : [{user :req.session.userName, friend : members }]

    });
    newChat.save()
    .then(msgObj => {
      for(var i=0;i<members.length;i++)
      {
      users.findOneAndUpdate({
        '_id' : ObjectId(members[i]),
      },
      {
        $push : {groups : {$each:[{'members' : members,'groupName' : groupName,'chat' : msgObj._id}]}}
      })
      .then(data => {
         // res.send(data);
        })
        .catch(err => {
          console.log(err);
          
          res.send(err);
        })
      }

       res.send(data);

    })
    .catch(err => {
      res.json({error: true});
    })
}


function getMessages(req,res)
{
  let {chatBoxId}=req.body;
  messages.findOne({
    '_id' :ObjectId(chatBoxId)
  })
  .then(data=>{
    console.log("data messae"+data);
    
    res.send(data);
  })
  .catch(err =>{
    res.send(err);
  }) 
}




function message(req, res){
  let {msg,chatBoxId}=req.body;
  console.log("message received "+msg);
  
  messages.findOneAndUpdate({
    '_id' : ObjectId(chatBoxId),
  },
  {
    $push : {message : {$each:[{'senderId' : req.session.Id,'senderName' : req.session.userName,'msg' : msg}]}}
  })
  .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
      
      res.send(err);
    })
}

module.exports = {
    AddGroup,
    GetGroup,
    getMessages,
    message
};