const express = require('express');
const userrouter = express.Router();
const {signup, saveSignup,login,checklogin,logout} = require('../controllers/user.controllers.js');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware/isloggedin.middleware.js');

userrouter.get("/signup",signup);
userrouter.post("/signup",saveSignup);
userrouter.get("/login",login);
userrouter.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect: '/login', failureFlash: true}),checklogin);
userrouter.get("/logout",logout);

module.exports = userrouter;