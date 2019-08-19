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




io.on('connection', function(socket){
    console.log('connected');
    console.log(connected);
        

    socket.emit('connection','hello');

    socket.on('initialize', function(data){
      //  console.log(data);
       // console.log("//////////////"+data.id+"////////////////");
        
        connected[data.id]=socket.id;
        //console.log(socket.id);
        //console.log(connected);
        console.log(connected);
    })


    socket.on('disconnect', function(){
        console.log('disconnected');
        let keys = Object.keys(connected);
        keys.forEach((value) => {
            if(connected[keys] === socket.id){
                delete connected[keys];
            }
        })
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

});
  
server.listen(port , ()=>{console.log(`Listening on Port ${port}`)})