const express = require("express");
const { CreateChatRoom, deleteChatRoom, updateChatRoom } = require("../Controllers/ChatRoom");
const { checkToken } = require("../middleware/auth");

const ChatRoomRoute = express.Router()

ChatRoomRoute.route("/createRoom").post(checkToken,CreateChatRoom)
ChatRoomRoute.route("/deleteChatRoom").delete(checkToken,deleteChatRoom) // Room id
ChatRoomRoute.route("/updateChatRoom").put(checkToken,updateChatRoom) // Room id

module.exports = ChatRoomRoute