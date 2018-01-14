var socket = io();
socket.on("connect", ()=>{
  console.log("Connected to server");

  socket.emit("createMessage", {
    from: "Oğuzhan",
    text: "Abi nerelerdesin"
  })
});
socket.on("disconnect", ()=>{
  console.log("Disconnect from server");
});

socket.on("newEmail", (email)=>{
  console.log("New Email", email);
});

socket.on("newMessage", (message)=>{
  console.log("newMessage", message);
});
