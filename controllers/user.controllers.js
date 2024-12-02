const wrapAsync = require("../utils/wrapAsync.js");
const User = require('../models/user.model.js');
const { equal } = require("joi");

const signup =  (req,res)=>{
    res.render("../views/users/signup.ejs")
};

const  saveSignup = wrapAsync(async (req,res) =>{
    try {
        let {username,password,email} = req.body;
    const newUser = new User({username,email});
    const registeredUser = await User.register(newUser,password);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Welcome To wanderlust")
     res.redirect('/listings');
    })
    } catch (e) {
        req.flash("error",e.message)
        res.redirect('/signup')
    }
})
const login = (req,res) =>{
    res.render("../views/users/login.ejs")
}
const checklogin = wrapAsync (async (req,res) =>{
    req.flash("success","Welcome back to wonderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl)
})

const logout = (req,res)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","You are logged Out!");
        res.redirect("/listings")
    })
}

module.exports = {signup, saveSignup,login,checklogin,logout}