const GroupMessage = require("../models/GroupMessage");

const SendMessage = async (req, res, next) => {

    await GroupMessage.create({
        message:req.body.message,
        sender: req.user.id,
        room:req.params.id
         })
           .then((result) => {
            return res
               .status(201)
               .json({ msg: "Message Sended Successfully",message: result})
           })
           .catch((err) => {
            return res.status(500).json({ msg: `Message Not Sended ${err}` })
           })

}

const getGroupMessage = async (req, res, next) => {
    await GroupMessage.find({
        room:req.params.id
    }).then((result) => {
        return res.status(200).json({ message: result})
    }).catch((err) => {
        return res.status(500).json({ msg: err.message})
    });
}

const deleteSingleMessage = async (req, res) => {
    try {
       const message = await GroupMessage.findById(req.params.id)
     
       if (!message) {
        return res.status(404).json({ msg:"Message Not Found"})
       }

    await message.remove()
    
    return res.status(200).json({ msg:"Message has been deleted"})

    } catch (error) {
        return res.status(200).json({ msg: error.message})
    }
}


module.exports = {
    SendMessage,
    getGroupMessage,
    deleteSingleMessage
}