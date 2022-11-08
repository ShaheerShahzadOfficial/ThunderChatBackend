const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatRoom",
    },
    createdAt: {
      type:Date,
      default:Date.now()
  }
  }
);

const GroupMessage = mongoose.model("GroupMessage", messageSchema);
module.exports = GroupMessage;