const Listing = require("../models/listing.model.js");
const wrapAsync = require("../utils/wrapAsync.js")

//Index listing

const listing = wrapAsync(async (req,res) =>{
    const alllisting = await Listing.find();
    res.render("listing/index.ejs", { alllisting });
})

//Show all the listing

const showlisting = wrapAsync(async (req,res) =>{
    const { id } = req.params;
    const listingdata = await Listing.findById(id).populate("reviews");
    if(!listingdata){
        req.flash("error","Listing you requested for doesnot exist!");
        res.redirect("/listings")
    }
    res.render("listing/show.ejs",{listingdata})
})


// Make a new listing
const newlisting = (req,res)=>{
    res.render("listing/new.ejs");
}

// create a new listings
const createlisting = wrapAsync(async (req,res) =>{ 
   
    const newlisting = new Listing(req.body.listing);
    await newlisting.save();
    req.flash("success","New Listing Created!")
    res.redirect('/listings');
})

const editlisting = wrapAsync(async (req,res) => {
   
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for doesnot exist!");
        res.redirect("/listings")
    }
    res.render("listing/edit.ejs",{listing})
})

const puteditlisting = wrapAsync(async (req,res) => {
    let { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id , {...req.body.listing});
    req.flash("success","Listing Updated!")
    res.redirect(`/listings/${id}`)
})

const deletelisting = wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await  Listing.findByIdAndDelete(id)
    console.log(listing);
    req.flash("success","Listing Deleted!")
    res.redirect("/listings")

})




module.exports = {listing,showlisting,newlisting,createlisting, editlisting ,puteditlisting , deletelisting}