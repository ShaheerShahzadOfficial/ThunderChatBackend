const mongoose = require("mongoose");

const OneOnOneChatSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    message: {
      type: String,
    },
    createdAt: {
      type:Date,
      default:Date.now()
  }
  }
);

const OneOnOneChat = mongoose.model("OneOnOneChat", OneOnOneChatSchema);
module.exports = OneOnOneChat;