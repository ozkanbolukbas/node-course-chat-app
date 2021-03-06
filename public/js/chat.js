var socket = io();
function scrollToBottom () {
  var messages = $("#messages");
  // var newMessage = messages.children('li:last-child')
  // var clientHeight = messages.prop("clientHeight");
  // var scrollTop = messages.prop("scrollTop");
  // var scrollHeight = messages.prop("scrollHeight");
  // var newMessageHeight = newMessage.innerHeight();
  // var lastMessageHeight = newMessage.innerHeight();
  // if (clientHeight+scrollTop+newMessageHeight+lastMessageHeight>=scrollHeight) {
  //   console.log("should scroll");
  // }
  messages[0].scrollTop=messages[0].scrollHeight;
}

socket.on("connect", ()=>{
  console.log("Connected to server");
  var params= jQuery.deparam(window.location.search);
  socket.emit("join", params, function(err){
    if (err) {
      alert(err);
      window.location.href ="/";
    } else {
      console.log("Hata yok");
    }
  })
});
socket.on("disconnect", ()=>{
  console.log("Disconnect from server");
});

socket.on("updateUserList", function(users){
  var ol = jQuery('<ol></ol>');
  users.forEach(function (user) {
    ol.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ol);
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
  scrollToBottom();
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
  scrollToBottom();
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
