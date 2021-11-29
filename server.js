const mongoose = require('mongoose');
const Msg = require('./models/messages')
const io = require('socket.io')(3000)
const mongoDB = "mongodb://localhost/evaluation1";
mongoose.connect(mongoDB).then(()=>{
    console.log('database connected');
})

io.on('connection', (socket) => {
Msg.find().then((result)=>{
socket.emit('output_messages',result)
})
    console.log('a user connected');
    socket.emit('message', '');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chatmessage', msg => {

        const message = new Msg({msg:msg})
        message.save().then(()=>{

            io.emit('message', msg)
        })
        


    })
});