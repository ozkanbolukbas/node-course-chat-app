var socket = io();
socket.on("connect", ()=>{
  console.log("Connected to server");
});
socket.on("disconnect", ()=>{
  console.log("Disconnect from server");
});

socket.on("newMessage", (message)=>{
  var formattedTime=moment(message.createdAt).format("k:mm")
  var template = $("#message-template").html();
  var html = Mustache.render(template, {
    text:message.text,
    from: message.from,
    createdAt: formattedTime
  });

  $("#messages").append(html);
  // var formattedTime=moment(message.createdAt).format("k:mm");
  // var li = $("<li></li>");
  // li.text(`${message.from} ${formattedTime} : ${message.text}`);
  // $("#messages").append(li);
});

socket.on("newLocationMessage", function(message){
  var formattedTime=moment(message.createdAt).format("k:mm");
  var template = $("#location-message-template").html();
  var html = Mustache.render(template, {
    from:message.from,
    url: message.url,
    createdAt: formattedTime
  })
  $("#messages").append(html);
  // var li= $("<li></li>");
  // var a = $('<a target="_blank" >My current location</a>');
  // li.text(`${message.from} ${formattedTime}: `);
  // a.attr("href", message.url);
  // li.append(a);
  // console.log(li);
  // $("#messages").append(li);

});

var messageTextBox = jQuery("[name=message]");

$("#message-form").on("submit", function(e){
  e.preventDefault();
  socket.emit("createMessage", {
    from: "User",
    text: messageTextBox.val()
  }, function(){
    messageTextBox.val("")
  });
});

var locationButton = $("#send-location");
locationButton.on("click", function(){
  if(!navigator.geolocation){
    return alert("Geolocation not supported by your browser");
  }
locationButton.attr("disabled", "disabled").text("Konum gönderiliyor..");

  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text("Konum gönder");
    socket.emit("createLocationMessage", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr("disabled");
    alert("Konum bulunamadı")
  });

});
