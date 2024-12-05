const Listing = require('../models/listing.model.js')
const Review = require('../models/review.model.js')

module.exports.isLoggedIn = (req,res,next) =>{
    if(!req.isAuthenticated()){
        //redirect Url
        req.session.redirectUrl = req.originalUrl
        req.flash("error","You must be loggedin!");
         res.redirect('/login');
    }
    next()
}

module.exports.saveRedirectUrl = (req,res,next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next();
}

module.exports.isOwner = async (req,res,next) =>{
    let { id } = req.params;
    let listing = await Listing.findById(id)
    if(!listing.owner.equals(res.locals.currentUser._id)){
        req.flash("error","You are not the owner of the listing");
        res.redirect(`/listings/${id}`)
    }
    next()
}

module.exports.isAuthor = async (req,res,next) =>{
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId)
    if(!review.author.equals(res.locals.currentUser._id)){
        req.flash("error","You are not the Author of the Review");
        res.redirect(`/listings/${id}`);
    }
    next()
}