const mongoose = require('mongoose')
const crypto = require('crypto')


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    avatar:[
      {
        public_id: {
          type: String
        },
        url: {
          type: String
        }
      }
    ],
    createdAt: {
        type:Date,
        default:Date.now()
    }
  }
)

	// Generating Password Reset Token
  userSchema.methods.getResetPasswordToken = function () {
    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  
    return resetToken;
  };
  

const User = mongoose.model('User', userSchema)
module.exports = User
