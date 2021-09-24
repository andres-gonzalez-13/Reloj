const path = require('path');
const express = require('express');
const clock = require('clock');
const app = express();
const port = 3000

//settings
app.set('port', process.env.PORT || port);
//static files
app.use(express.static(path.join(__dirname, 'public')));
//start server
const server = app.listen(app.get('port'), () => {
    console.log(`App listening at http://localhost:${port}`)
}); 

const SocketIO = require('socket.io');
const io = SocketIO(server);
//websockets
io.on('connection', (socketClient) => {
    console.log('new connection', socketClient.id);
    
    socketClient.on('chat:message', (data) => {
        //esto es para todos los conectados, incluyendo la persona realizando esta accion
        io.sockets.emit('chat:message', data);
    });

    socketClient.on('time:output', (info) => {
        io.sockets.emit('time:output', info);
    })
});


