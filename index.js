const http = require('http');
const express = require('express');
const cors = require('cors');
const SocketIo = require('socket.io');

const app = express()

const users = [{}]

app.use(cors())

app.get("/",(req,res)=>{
    res.send("Welcome To Thunder Chat   ")
})


const server = http.createServer(app)

const io = SocketIo(server)


io.on("connection",(socket)=>{
    console.log("connected");

    socket.on("joined",({user})=>{
        users[socket.id] = user
        console.log(`${user} has joined`)
        socket.emit("welcome",{user:"Admin",message:`:- ${users[socket.id]} Welcome to the chat`})
        socket.broadcast.emit("userJoined",{user:"Admin",message:`:- ${users[socket.id]} has joined`})
       })


socket.on("message",({message,id})=>{
io.emit("sendMessage",{user:users[id],message,id})
})


       socket.on("disconnect",()=>{
        socket.broadcast.emit("leave",{user:"Admin",message:`:- ${users[socket.id]} has  leave`})
        console.log("user left")
       })

})



const port = process.env.PORT || 4500


server.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})