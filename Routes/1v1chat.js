const express = require("express");
const { SendMessage, getMessage, deleteMessage } = require("../Controllers/1v1chat");
const { checkToken } = require("../middleware/auth");

const OneOnOneChatRoute = express.Router()

OneOnOneChatRoute.route("/sendMessage/:id").post(checkToken,SendMessage); // Recievers Id
OneOnOneChatRoute.route("/getMessage/:id").get(checkToken,getMessage); // Recievers Id
OneOnOneChatRoute.route("/deleteMessage/:id").get(checkToken,deleteMessage); // message Id

module.exports = OneOnOneChatRoute;