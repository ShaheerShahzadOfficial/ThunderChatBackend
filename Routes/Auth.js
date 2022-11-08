// const express = require("express");
const express = require("express")
const { Login, RegisterUser, Logout, ResetPassword, forgotPassword, loadUser } = require("../Controllers/Auth");
const { checkToken } = require("../middleware/auth");

const AuthRoute = express.Router()


AuthRoute.route("/login").post(Login);

AuthRoute.route("/register").post(RegisterUser);

AuthRoute.route("/logout").delete(Logout);

AuthRoute.route("/forgotPassword").put(forgotPassword);

AuthRoute.route("/password/reset/:id").put(ResetPassword);

AuthRoute.route("/myProfile").get(checkToken,loadUser);

module.exports = AuthRoute