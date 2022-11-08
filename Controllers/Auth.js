const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { stringToHash, varifyHash } = require('bcrypt-inzi')
const cloudinary = require('cloudinary')
const crypto = require('crypto')
const sendEmail = require('../Utils/sendEmail.js')

//    SignUp Form

const RegisterUser = async (req, res, next) => {
  const { name, email, password, avatar } = req.body

  if (!name || !email || !password || !avatar) {
    return res.status(500).json({error:"Invalid Data"})
  }

  const user = await User.findOne({ email })
  if (user) {
    return res.status(401).json({ msg: 'You Are Not Registered User' })
  }


  await cloudinary.v2.uploader
    .upload(avatar, {
      folder: 'ThunderChatAvatar',
      width: 150,
      crop: 'scale',
    })
    .then((result) => {
      stringToHash(password).then(async (hash) => {
        await User.create({
          name,
          email,
          password: hash,
          avatar: {
            public_id: result?.public_id,
            url: result?.secure_url,
          },
        })
          .then((result) => {
            res
              .status(201)
              .json({ msg: 'Registeration Successfully', user: result })
          })
          .catch((err) => {
            res.status(500).json({ msg: err })
          })
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

// //    SignIn Form

const Login = async (req, res) => {
  let { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ msg: 'Please Enter Email && Password !' })
  }

  const user = await User.findOne({ email })
  if (!user) {
    return res.status(401).json({ msg: 'You Are Not Registered User',user })
  }

  varifyHash(password, user.password)
    .then(async (result) => {
      if (result) {
        const token = jwt.sign(
          {
            email,
            name: user.name,
            role: user.role,
            id: user._id,
          },
          process.env.ACCESS_TOKEN,
          {
            expiresIn: process.env.EXPIRES_IN,
          },
        )

        res.cookie('authToken', token, {
          expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
          ),
          httpOnly: false,
          sameSite: 'none',
          maxAge: 120 * 60 * 60 * 1000,
          secure:true
        })

        res.status(200).json({
          msg: 'You Are Logged In Successfully',
          token: token,
          user: user,
        })
      } else {
        res.status(500).json({ msg: "Email Or Password Doesn't Match" })
      }
    })
    .catch((e) => {
      console.log('error: ', e)
    })
}

// logout

const Logout = async (req, res, next) => {
  res
    .clearCookie('authToken', {
      sameSite: 'none',
      secure: true,
    })
    .status(200)
    .json({ message: 'Successfully logged out 😏 🍀' })
}

// Forgot Password

const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: 'User not found',
      })
    }

    const resetPasswordToken = user.getResetPasswordToken()

    await user.save()

    const resetUrl = `${req.protocol}://localhost:3000/resetPassword/${resetPasswordToken}`

    const message = `Reset Your Password by clicking on the link below: \n\n ${resetUrl}`

    try {
      await sendEmail({
        email: user.email,
        subject: 'Reset Password',
        message,
      })

      res.status(200).json({
        success: true,
        msg: `Email sent to ${user.email}`,
      })
    } catch (error) {
      user.resetPasswordToken = undefined
      user.resetPasswordExpire = undefined
      await user.save()

      res.status(500).json({
        success: false,
        msg: error.message,
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    })
  }
}

const ResetPassword = async (req, res, next) => {
  let resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.id)
    .digest('hex')

  let resetPasswordExpire = { $gt: Date.now() }

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire,
  })

  if (!user) {
    return res
      .status(404)
      .json({
        msg: `Reset Password Token is invalid or it has been Expired ${user}`,
      })
  }

  if (!req.body.password) {
    return res.status(400).json({ msg: 'Please Enter Password' })
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({ msg: 'Password doesnot match' })
  }

  if (req.body.password.length < 8) {
    return res
      .status(400)
      .json({ msg: 'Password doesnot be less than 8 character' })
  }

  stringToHash(req.body.password).then(async (string) => {
    await user
      .updateOne({
        resetPasswordToken: null,
        resetPasswordExpire: null,
        password: string,
      })
      .then((result) => {
        res.status(200).json({
          message: 'Password has been Change',
          password: string,
          result,
        })
      })
  })
}

const loadUser = async (req, res, next) => {
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(404).json({
      Error: 'User Not Found'
    })
  }
  res.status(200).json({
    success: true,
    user
  })
}

module.exports = {
  RegisterUser,
  Login,
  Logout,
  forgotPassword,
  ResetPassword,
  loadUser
}
