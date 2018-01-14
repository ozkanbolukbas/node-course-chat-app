var socket = io();
socket.on("connect", ()=>{
  console.log("Connected to server");
});
socket.on("disconnect", ()=>{
  console.log("Disconnect from server");
});

socket.on("newMessage", (message)=>{
  console.log("newMessage", message);
});
