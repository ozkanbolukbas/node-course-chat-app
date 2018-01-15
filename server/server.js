const express = require('express');
const path = require('path');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io').listen(server);



const port = process.env.PORT || 3000;

const {generateMessage, generateLocationMessage} = require("./utils/message");

const publicPath = path.join(__dirname, "../public")
app.use(express.static(publicPath));

io.on("connection", (socket) => {
  console.log("New user connected");

  //socket emit form Admin text Welcome to chat app
  socket.emit("newMessage", generateMessage("Admin", "Welcome the chat app"));
  //socket.broadcast.emit from Admin text New user joined
  socket.broadcast.emit("newMessage", generateMessage("Admin", "New user joined"));

  socket.on("createMessage", (message, callback) =>{
    console.log("createMessage", message);
    io.emit("newMessage", generateMessage(message.from, message.text));
    callback("This is from server");
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
