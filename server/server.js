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

  socket.emit("newEmail", {
    from: "ozkan@example.com",
    test: "Hey What is happening",
    createAt: 123
  });

  socket.emit("newMessage", {
    from: "Jhon",
    text: "See you then",
    createdAt: 123
  });

  socket.on("createMessage", (message) =>{
    console.log("createMessage", message);
  })

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
