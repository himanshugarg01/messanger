let users = require('../model/users');
let messages = require('../model/messages');
var ObjectId=require('mongodb').ObjectID;

function getUser(req, res){
  console.log("hello");
  
  res.send({'id' : req.session.Id,'userName' : req.session.userName})
}



function getFriends(req, res){
  users.findOne({
    'userName' : req.session.userName,
  
  }).populate({
    path : 'friends',

  })
  .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
      
      res.send(err);
    })
}


function getMessages(req, res){
  console.log(req.body);
  
  let {friendId}=req.body;
  var chatBoxId;
  users.findOne({
    'userName' : req.session.userName,
  })
  .then(data => {
      //res.send(data);
      //console.log(data);
      
      for(let i=0;i<data.chatBox.length;i++)
      {
      //  console.log(data.chatBox[i].chat);
        
        if(friendId==data.chatBox[i].friendId)
        {
          chatBoxId=data.chatBox[i].chat;
          console.log("*chatBoxID",chatBoxId);
          
          break;
        }
      }

    messages.findOne({
      '_id' :chatBoxId
    })
    .then(data=>{
      console.log("data messae"+data);
      
      res.send(data);
    })
    .catch(err =>{
      res.send(err);
    })


    })
    .catch(err => {
      console.log(err);
      
     // res.send(err);
    })
}


  function message(req, res){
    let {msg,chatBoxId}=req.body;
    console.log("message received "+msg);
    
    messages.findOneAndUpdate({
      '_id' : ObjectId(chatBoxId),
    },
    {
      $push : {message : {$each:[{'senderId' : req.session.Id,'senderName' : req.session.userName,'msg' : msg,'timestamp' : Date.now()}]}}
    })
    .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log(err);
        
        res.send(err);
      })
  }

  function updateOnline(req, res){
    
    //console.log("message received "+msg);
   

  }


module.exports = {
    getUser,
    getFriends,
   message,
  getMessages,
  updateOnline,

};