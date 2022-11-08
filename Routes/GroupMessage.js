const express = require("express");
const { SendMessage, getGroupMessage, deleteSingleMessage } = require("../Controllers/GroupMessage");
const { checkToken } = require("../middleware/auth");

const GroupMessageRoute = express.Router()

GroupMessageRoute.route("/sendMessage/:id").post(checkToken,SendMessage) // room Id
GroupMessageRoute.route("/getGroupMessage/:id").get(checkToken,getGroupMessage) // room Id
GroupMessageRoute.route("/deleteSingleMessage/:id").delete(checkToken,deleteSingleMessage) // message Id

module.exports = GroupMessageRoute