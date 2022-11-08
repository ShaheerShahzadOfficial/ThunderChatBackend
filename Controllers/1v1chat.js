const OneOnOneChat = require("../models/1v1chat");

const SendMessage = async (req, res, next) => {

    await OneOnOneChat.create({
     message:req.body.message,
     sender: req.user.id,
     receiver:req.params.id
      })
        .then((result) => {
          res
            .status(201)
            .json({ msg: "Message Sended Successfully",message: result})
        })
        .catch((err) => {
          res.status(500).json({ msg: `Message Not Sended ${err}` })
        })
}

const getMessage = async (req, res) => {
    await OneOnOneChat.find({sender: req.user.id,receiver:req.params.id}).then((result) => {
        res
        .status(201)
        .json({message: result})
    
    }).catch((err) => {
        res.status(500).json({ msg: `Message Not Found ${err}` })
    });
}

const deleteMessage = async (req, res, next) =>{

    try {

    const findMessage = await OneOnOneChat.findById(req.params.id)
    if (!findMessage) {
        return res.status(404).json({
          success: false,
          message: 'Message not found',
        })
      }

      if (findMessage.sender !== req.user.id) {
        return res.status(403).json({
            msg:"you are not allowed to delete this message",
        })
      }

      await findMessage.remove()

      return res.status(200).json({
        msg:"Message Deleted"
      })
              
    } catch (error) {
        res.status(500).json({ msg:error })
    }


}

module.exports ={
    SendMessage,
    getMessage,
    deleteMessage
}