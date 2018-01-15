const express = require('express');
const path = require('path');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io').listen(server);



const port = process.env.PORT || 3000;

const {generateMessage, generateLocationMessage} = require("./utils/message");
const {isRealString} = require("./utils/validation");

const publicPath = path.join(__dirname, "../public")
app.use(express.static(publicPath));

io.on("connection", (socket) => {
  console.log("New user connected");


  socket.on("join", (params, callback)=>{
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback("Kullanıcı adı ve Oda adı giriniz.");
    }
    socket.join(params.room);


    socket.emit("newMessage", generateMessage("ChatApp", "Chat uygulamasına hoşgeldiniz"));
    socket.broadcast.to(params.room).emit("newMessage", generateMessage("ChatApp" , `${params.name} sohbete katıldı`));
    callback();
  });

  socket.on("createMessage", (message, callback) =>{
    console.log("createMessage", message);
    io.emit("newMessage", generateMessage(message.from, message.text));
    callback();
  });

  socket.on("createLocationMessage", (cords)=>{
    io.emit("newLocationMessage", generateLocationMessage("Admin", cords.latitude, cords.longitude))
  });

  socket.on("disconnect", ()=>{
    console.log("User was disconnected");
  });
});





app.get('/', (req, res, next) => {
  res.send("Hello world");
});



server.listen(port, () => {
  console.log(`Server Starts on ${port}`);
});
