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
    const listingdata = await Listing.findById(id)
    .populate({
        path: "reviews",
        populate:{
            path: "author",
        },
    })
    .populate("owner");
    if(!listingdata){
        req.flash("error","Listing you requested for doesnot exist!");
        res.redirect("/listings")
    }
    // console.log(listingdata)
    // console.log(listingdata)
    res.render("listing/show.ejs",{listingdata})
})


// Make a new listing
const newlisting = (req,res)=>{
    res.render("listing/new.ejs");
}

// create a new listings
const createlisting = wrapAsync(async (req,res) =>{ 
    let url = req.file.path;
    let filename = req.file.filename;
    const newlisting = new Listing(req.body.listing);
    newlisting.owner = req.user._id;
    newlisting.image = {url,filename};
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
    let originalimage = listing.image.url;
    originalimage = originalimage.replace("/upload","/upload/h_100,w_250")
    res.render("listing/edit.ejs",{listing, originalimage})
})

const puteditlisting = wrapAsync(async (req,res) => {
    let { id } = req.params; 
    let listing = await Listing.findByIdAndUpdate(id , {...req.body.listing});
    if(typeof req.file!="undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename};
        await listing.save();
    }
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