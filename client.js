//client.js

var chatarea = document.getElementById('chatarea');
var chatbox = document.getElementById('chatbox');
var send = document.getElementById('send');

//biến io đã được lấy thông qua dòng 
//<script src="http://127.0.0.1:8080/socket.io/socket.io.js"></script>
//trong file HTML
//connect tới server
var socket = io.connect('http://127.0.0.1:8080');

//khi có có 1 message với tên: 'info'
socket.on('info', function(data) {
    chatarea.value = chatarea.value + '\n' + data;
});

//khi có 1 message với tên: 'message'
socket.on('message', function (data) {
    //hiển thị lên chatarea
    chatarea.value = chatarea.value + '\n' + data;
});

//khi nút send được nhấn
send.onclick = function() {
    //gửi 1 message lên server với tên: 'message', giá trị trong 'chatbox.value'
    socket.emit('message', chatbox.value);
}
