const express = require('express');
const listingrouter = express.Router();
const {listing ,showlisting, newlisting,createlisting,editlisting , puteditlisting, deletelisting }= require('../controllers/listing.controllers.js')
const {validatelisting } = require("../middleware/validatelisting.middleware.js")
const {isLoggedIn, isOwner} = require('../middleware/isloggedin.middleware.js')
const multer  = require('multer')
const {storage} = require('../middleware/cloudinary.middleware.js')
const upload = multer({ storage })


listingrouter
  .route('/')
  .get(listing)
  .post(
    validatelisting,
    isLoggedIn,
    upload.single('listing[image]'),
    createlisting
  );
 
listingrouter
  .route('/new')
  .get(
    isLoggedIn,
    newlisting
  );


listingrouter
  .route('/:id')
  .get(showlisting)
  .delete(
    isLoggedIn,
    isOwner,
    deletelisting
  )
  .put(
    isLoggedIn,
    isOwner, 
    upload.single('listing[image]'),
    validatelisting,
    puteditlisting
  );

listingrouter.get('/:id/edit',isLoggedIn,isOwner, editlisting);





  module.exports = listingrouter;

