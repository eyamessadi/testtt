const express = require('express');
const bodyParser = require ('body-parser');
const cookieParser = require ('cookie-parser');

const mongoose = require("mongoose");
const userRoutes = require ('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const activiteRoutes = require ('./routes/activite.routes');


require ('dotenv').config({path:'./config/.env'})

require('./config/db');
const cors =require ('cors');
const {checkUser , requireAuth} = require ('./middleware/auth.middleware');
const app =express();

//Connexion à la base de donnée




console.log('testgit')
  const { Chat } = require("./models/Chat");

const server= app.listen(process.env.PORT,()=>{
    console.log(`Listening on port ${process.env.PORT}`); 
})
const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});




const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }
  app.use(cors(corsOptions));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:'true'}))
app.use (cookieParser());

//routes 
app.use('/api/user',userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/chat', require ('./routes/chat'));


app.use('/api/activite', activiteRoutes);



///jwt app * chaque routes all tu me declanche cette middlware de check de user
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req ,res )=> {
    res.status(200).send (res.locals.user._id)
})


io.on("connection", (socket) => {
	socket.emit("me", socket.id);

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});
});


io.on("connection", socket => {

  socket.on("Input Chat Message", msg => {

    connect.then(db => {
      try {
		  console.log("aaaaaa");
          let chat = new Chat({ message: msg.chatMessage, sender:msg.userID, type: msg.type })

          chat.save((err, doc) => {
            if(err) return res.json({ success: false, err })

            Chat.find({ "_id": doc._id })
            .populate("sender")
            .exec((err, doc)=> {

                return io.emit("Output Chat Message", doc);
            })
          })
      } catch (error) {
        console.error(error);
      }
    })
   })

})




//server

module.exports = server;