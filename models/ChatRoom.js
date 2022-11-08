const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema(
  {
    RoomName: {
      type: String,
      required: true,
      maxlength: 200,
    },

    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
        type:Date,
        default:Date.now()
    }
  }
);

const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);
module.exports = ChatRoom;