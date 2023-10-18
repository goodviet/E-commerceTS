const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
// const io = new Server(server);



// cấu hình giúp angular kết nối với socket
const io = require('socket.io')(server, {
    cors: {
        origin: 'https://te-ecommerce.netlify.app',
        methods: ['GET', 'POST'],
        allowedHeaders: ['my-custom-header'],
        credentials: true
    }
})
var list_online = []

io.on('connection', (socket) => {
    console.log(socket.id);
    list_online.push(socket.id)
    socket.on('message', (data)=>{  
        socket.emit('server', 'Server trả về dữ liệu:' + data);
    })

    socket.on('disconnect', () => {
        console.log('da thoat:'+socket.id);

        // xoa nguoi offline ra khoi danh sach online(loai bo han tu ra khoi mang)
        // + Vi tri trong mang
        // + Xoa phan tu
        list_online.splice(list_online.indexOf(socket.id),1)
      });
});

server.listen(3001, () => {
  console.log('listening on *:3001');
});