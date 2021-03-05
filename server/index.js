const express = require('express');
const cors = require('cors');
const socketio = require('socket.io');
const http = require('http');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: '*',
    }
});

const PORT = process.env.PORT || 5000
const router = require('./router')

const {getUser, removeUser, addUser, getUsersInRoom} = require('./users');

io.on('connection', (socket)=>{
    console.log("There is a new connection!!");

    socket.on('join', ({name, room}, callback)=>{
        console.log('Name: ' + name + ' ,room: ' + room);
        console.log('soekt.id: ' +socket.id);
        const {error, user} = addUser({ id: socket.id, name, room})
        if(error) return callback(error);
        console.log('user.name: ' + user.name + ', user.room: ' + user.room);
        socket.join(user.room);
        socket.emit('message', {user: 'admin', text: `${user.name}, welcome to the room ${user.room}`});
      //  socket.broadcast.to(user.room).emit('message', {user: 'admin', test: `${user.name}, has joined!`})

        callback(); 
    });

    socket.on('sendMessage', (message, callback)=>{
        const user = getUser(socket.id);
        io.to(user.room).emit('message', {user: user.name, text: message});
        callback();
    })

    socket.on('disconnect', ()=> {
        console.log('Connection ended!');
    });
});

app.use(router);

server.listen(PORT, ()=> console.log(`Server has started on port ${PORT}`));
