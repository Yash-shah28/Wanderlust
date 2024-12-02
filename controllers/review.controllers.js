const Listing = require("../models/listing.model.js");
const Review = require("../models/review.model.js");
const wrapAsync = require("../utils/wrapAsync.js")


const createreview = wrapAsync(async (req,res) =>{
    let listingid = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review)

    listingid.reviews.push(newReview);
    await newReview.save();
    await listingid.save();
    req.flash("success","Review Created!")
    res.redirect(`/listings/${listingid._id}`);
})


const Deletereview = wrapAsync(async (req,res)=>{
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id , {$pull: {reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!")
    res.redirect(`/listings/${id}`);
})

module.exports = {createreview, Deletereview}