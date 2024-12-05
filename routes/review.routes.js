const express = require('express');
const reviewrouter = express.Router({mergeParams: true});
const {createreview,Deletereview }= require('../controllers/review.controllers.js')
const {validatereview} = require("../middleware/validatelisting.middleware.js");
const {isLoggedIn, isAuthor } = require('../middleware/isloggedin.middleware.js')


reviewrouter.post('/',validatereview,isLoggedIn, createreview);
reviewrouter.delete('/:reviewId',isLoggedIn,isAuthor, Deletereview);



  module.exports = reviewrouter;

