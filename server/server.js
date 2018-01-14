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
