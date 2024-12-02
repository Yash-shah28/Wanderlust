const express = require('express');
const path = require('path');
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate')
const ExpressError = require("./utils/ExpressError.js")
const listingrouter = require("./routes/listing.routes.js")
const reviewrouter = require("./routes/review.routes.js")
const userrouter = require("./routes/user.routes.js")
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStratergy = require('passport-local');
const User = require('./models/user.model.js')

const app = express()

const sessionOption = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expries: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};

app.use(session(sessionOption));
app.use(flash());

// Setting up passport for authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.engine('ejs', ejsMate);

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Set the view engine to EJS
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, "/public")))

app.use((req,res,next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
})

// app.get("/demouser",async(req,res)=>{
//     let fakeUser = new User({
//         email: "abc@gmail.com",
//         username: "Yash"
//     });
//     let registeredUser = await User.register(fakeUser,"Helloworld");
//     res.send(registeredUser);
// })

//routes
app.use("/listings", listingrouter );
app.use("/listings/:id/reviews", reviewrouter );
app.use("/", userrouter );



app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found!"))
})
app.use((err,req,res,next)=>{
    let {statusCode = 500, message = "Something went wrong!"} = err;
   res.status(statusCode).render("error.ejs", {message} );

})

module.exports = app;