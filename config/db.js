const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const DBConnection = () => {
  const url = "mongodb://localhost:27017/ThunderChat"

  mongoose.connect(url, { useNewUrlParser: true }).then((result) => {
    console.log(`DATABASE CONNECTED WITH THE HOST ${result.connection.host}`)
  })


}

module.exports = DBConnection
