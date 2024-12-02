const express = require('express');
const listingrouter = express.Router();
const {listing ,showlisting, newlisting,createlisting,editlisting , puteditlisting, deletelisting }= require('../controllers/listing.controllers.js')
const {validatelisting ,validatereview} = require("../middleware/validatelisting.middleware.js")
const {isLoggedIn} = require('../middleware/isloggedin.middleware.js')


listingrouter.get('/', listing);
listingrouter.get('/new',isLoggedIn, newlisting);
listingrouter.post('/',validatelisting,isLoggedIn, createlisting);
listingrouter.get('/:id/edit',isLoggedIn, editlisting);
listingrouter.get('/:id', showlisting);
listingrouter.put('/:id',validatelisting,isLoggedIn, puteditlisting);
listingrouter.delete('/:id',isLoggedIn, deletelisting);
// listingrouter.post('/:id/reviews',validatereview, createreview);
// listingrouter.delete('/:id/reviews/:reviewId', Deletereview);



  module.exports = listingrouter;

