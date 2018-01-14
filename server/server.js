const express = require('express');
const path = require('path');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io').listen(server);



const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, "../public")
app.use(express.static(publicPath));

io.on("connection", (socket) => {
  console.log("New user connected");

  //socket emit form Admin text Welcome to chat app
  socket.emit("newMessage", {
    from: "Admin",
    text: "Welcome to the chat app"
  });
  //socket.broadcast.emit from Admin text New user joined
  socket.broadcast.emit("newMessage", {
    from: "Admin",
    text: "New user joined",
    createAt: new Date().getTime()
  })

  socket.on("createMessage", (message) =>{
    console.log("createMessage", message);
    io.emit("newMessage", {
      from: message.from,
      text: message.text,
      createAt:new Date().getTime()
    });
    // socket.broadcast.emit("newMessage", {
    //   from: message.from,
    //   text: message.text,
    //   createAt:new Date().getTime()
    // })
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
