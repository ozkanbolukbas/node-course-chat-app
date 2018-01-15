var socket = io();
socket.on("connect", ()=>{
  console.log("Connected to server");
});
socket.on("disconnect", ()=>{
  console.log("Disconnect from server");
});

socket.on("newMessage", (message)=>{
  console.log("newMessage", message);
  var li = $("<li></li>");
  li.text(`${message.from}: ${message.text}`);
  $("#messages").append(li);
});

jQuery("#message-form").on("submit", function(e){
  e.preventDefault();
  socket.emit("createMessage", {
    from: "User",
    text: jQuery("[name=message]").val()
  }, function(){

  })
});
