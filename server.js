const http = require('http');
const dotenv = require('dotenv');
const app = require('./app.js');
const DBConnection = require('./config/db.js');
const cloudinary = require('cloudinary')

// const SocketIo = require('socket.io');
// const User = require('./models/user');
// const ChatRoom = require('./models/ChatRoom');
// const GroupMessage = require('./models/GroupMessage');
// const OneOnOneChat = require('./models/1v1chat');

dotenv.config({ path: "config/config.env" })

const server = http.createServer(app)


DBConnection()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// const io = SocketIo(server)

// io.on("connection",()=>{
//     console.log("connected");

// User.watch().on('change',(change)=>{
//     console.log('Something has changed in User')
//     io.to(change.fullDocument._id).emit('changes',change.fullDocument)
// })

// ChatRoom.watch().on('change',(change)=>{
//     console.log('Something has changed in ChatRoom')
//     io.to(change.fullDocument._id).emit('changes',change.fullDocument)
// })

// GroupMessage.watch().on('change',(change)=>{
//     console.log('Something has changed in GroupMessage')
//     io.to(change.fullDocument._id).emit('changes',change.fullDocument)
// })

// OneOnOneChat.watch().on('change',(change)=>{
//     console.log('Something has changed in OneOnOneChat')
//     io.to(change.fullDocument._id).emit('changes',change.fullDocument)
// })

// })


const port = process.env.PORT || 4500

server.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})