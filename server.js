var http = require('http'); //gọi ra 2 thư viện: http (chuẩn) và socket.io
var socketIO = require('socket.io');

var ip = '127.0.0.1'; //ip và port kết nối
var port = 8080;

//tạo server http với ip và port đã có
var server = http.createServer().listen(port, ip, function() {
    console.log('Server stared');
});

//gắn socket.io vào server
io = socketIO.listen(server);

//hàm nhận sự kiện: 'connection',
//khi có 1 client nào đó kết nối vào
io.sockets.on('connection', function (socket) {

    //gửi ngay 1 dòng chữ Hello World về cho client đó
    socket.emit('info', 'Hello world!');

    //gửi 1 thống báo tới tất cả các client
    socket.broadcast.emit('info', 'Some one is online now...');

    //hàm nhận sự kiện khi có 1 message được gửi
    socket.on('message', function (data) {
        socket.emit('message', data);
        socket.broadcast.emit('message', data);
    });

    //hàm nhận sự kiện khi có 1 client disconnect
    socket.on('disconnection', function (data) {
        socket.broadcast.emit('info', 'Some one is offline now...');
    });
});
