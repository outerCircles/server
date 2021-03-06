const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
require('dotenv').config({path:"./config/keys.env"})

io.on('connection', socket => {
    socket.on('new message', message => {
        socket.broadcast.emit('new message', message);
        socket.emit('new message', message);
    })
})

const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send(
        `<h1>Server is running at port: ${port}</h1>`
    )
})


http.listen(port, ()=>{
    console.log(`server listening on port: ${port}`);
})