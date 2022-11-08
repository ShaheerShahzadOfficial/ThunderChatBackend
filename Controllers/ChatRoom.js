const ChatRoom = require('../models/ChatRoom')

const CreateChatRoom = async (req, res) => {
  let { RoomName, users } = req.body

  await ChatRoom.create({ RoomName, users, groupAdmin: req.user.id })
    .then(result => {
      res.status(201).json({
        Room: result
      })
    })
    .catch(err => {
      return res.status(500).json({ msg: err.message })
    })
}

const deleteChatRoom = async (req, res) => {
  try {
    const room = await ChatRoom.findById(req.params.id)

    if (!room) {
      return res.status(404).json({ msg: 'Room Not Found' })
    }

    await room.remove()

    return res.status(200).json({ msg: 'Room Has Been Deleted' })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

const updateChatRoom = async (req, res) => {
  try {
    const room = await ChatRoom.findById(req.params.id)

    if (!room) {
      return res.status(404).json({ msg: 'Room Not Found' })
    }

    if (room?.groupAdmin !== req.user.id) {
      return res.status(403).json({ msg: 'Room Name Can Be updated By Admin' })
    }

    room.RoomName = req.body.RoomName
    await room.save()

    return res.status(200).json({ msg: 'Room Has Been updated' })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

module.exports = {
  CreateChatRoom,
  deleteChatRoom,
  updateChatRoom
}
