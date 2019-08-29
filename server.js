const express = require('express')
const app = express()
const http = require('http')
const server = http.Server(app);
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const io = socketIO(server);
const path = require('path');
const port = 8000;
const cors = require('cors');
var session = require('express-session');
let connected = require('./statics/variable').connected;
var ObjectId=require('mongodb').ObjectID;
var flash = require('connect-flash');

var cookieParser = require('cookie-parser');
app.use(cookieParser());

require('./model/db');
//Express Middleware
app.use(express.json()); //A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body).
app.use(express.urlencoded({extended: true})); 
app.use("/",express.static(path.join(__dirname, 'public'))); // To serve static files
//ByDefault serve /public/index.html 
app.use(cors());
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(session({secret: "xYzUCAchitkara"}));
//---------------Routers---------------//

app.use('/', require('./routes'));

// app.get('/asdf',(req,res)=>{
//     res.render("login");
// })

//----------------- End ----------------//
let users = require('./model/users');



  app.use(flash());

io.on('connection', function(socket){
    console.log('connected');
    console.log(connected);
        

    socket.emit('connection','hello');

    socket.on('initialize', function(data){
        if(data.id!=undefined)
        connected[data.id]=socket.id;
        //console.log(socket.id);
        //console.log(connected);
        console.log(connected);
    })

    socket.on('online', function(data){
          //console.log(data.friends);
         // console.log("//////////////"+data.friends+"////////////////");
         users.findOneAndUpdate({
            '_id': data._id
         },
         {
            'online' : true
         }).then(data=>{

         })
         .catch(err=>{

         })
         for(i=0;i<data.friends.length;i++)
         {
            io.to(connected[data.friends[i]._id]).emit('online', data._id);
         }
          
      })
  


    socket.on('disconnect', function(data){
        console.log('disconnected...');
        
        
        let keys = Object.keys(connected);
    //    console.log(keys);
        keys.forEach((value) => {
            if(connected[value] == socket.id){
              //  console.log("disconneced   .............."+value);
                delete connected[value];      
                users.findOneAndUpdate({
                    '_id' : value,
                },
                {
                    'online' : false,
                    'lastSeen' : Date.now()
                })
                .then(data => {
                    //res.send(data);
                  ///  console.log(data);
                  //  console.log(data.friends[0]);
                    
                    for(i=0;i<data.friends.length;i++)
                    {
                    //    console.log(connected[data.friends[i]]);
                        
                       io.to(connected[data.friends[i]]).emit('offline', data._id);
                    }
                    })
                    .catch(err => {
                    console.log(err);
                    
                    //res.send(err);
                    })
                
            }
        })
       // socket.emit('disconnected',data);
       
        //    users.findOneAndUpdate({
        //       '_id': data._id
        //    },
        //    {
        //       'online' : false
        //    }).then(data=>{
  
        //    })
        //    .catch(err=>{
  
        //    })
       // console.log("sdfghjkl;dfghjklfdghjk///////////////////////////////");
        
        //console.log( connected);
        
    })

    // socket.on('chat message', function(msg){
    //     socket.emit('chat message', msg);
    // });

    socket.on('chat message', function(data){
        //console.log(data);
       // socket.emit('chat message', data.msg);
        console.log("chat message    "+connected[data.currentChat]);
        if(connected[data.currentChat]!=undefined)
        io.to(connected[data.currentChat]).emit('chat message', data);

        // console.log(connected[data['Rid']])
        // io.to(connected[data['Rid']]).emit('new message', data.msg)
    })

    socket.on('group message', function(data){
        
        //console.log(data);
        
       // socket.emit('chat message', data.msg);
        console.log("chat message    "+connected[data.currentChat]);
        for(let i=0;i<data.friends.length;i++)
        {
        io.to(connected[data.friends[i]]).emit('group message', data);
        }
        // console.log(connected[data['Rid']])
        // io.to(connected[data['Rid']]).emit('new message', data.msg)
    })

    socket.on('typing', function(data){
        //console.log("chat message    "+connected[data.currentChat]);
        
        io.to(connected[data.currentChat]).emit('typing', data);
        
    })
    socket.on('stopTyping', function(data){
        //console.log("chat message    "+connected[data.currentChat]);
        
        io.to(connected[data.currentChat]).emit('stopTyping', data);
        
    })

});
  
server.listen(port , ()=>{console.log(`Listening on Port ${port}`)})