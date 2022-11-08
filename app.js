const express = require('express');
const cors = require('cors');
const AuthRoute = require('./Routes/Auth');
const OneOnOneChatRoute = require('./Routes/1v1chat');
const ChatRoomRoute = require('./Routes/ChatRoom');
const GroupMessageRoute = require('./Routes/GroupMessage');

const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');

const app = express()

app.use(cors())

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }))

app.get("/",(req,res)=>{
    res.send(` <title>Thunder Chat ⚡</title>
    <h1 style='text-align: center;color: darkblue;'>Welcome To Thunder Chat ⚡</h1>`)
})



app.use("/auth",AuthRoute)
app.use("/1v1chat",OneOnOneChatRoute)
app.use("/chatRoom",ChatRoomRoute)
app.use("/groupMessage",GroupMessageRoute)


app.use((req, res) => {
    res.status(404).send(` <title>Thunder Chat ⚡</title>
    <h1 style='text-align: center;color: darkred;'>Page Not Found⚡</h1>`)
})


module.exports = app