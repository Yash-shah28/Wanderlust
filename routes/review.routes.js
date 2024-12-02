const express = require('express');
const reviewrouter = express.Router({mergeParams: true});
const {createreview,Deletereview }= require('../controllers/review.controllers.js')
const {validatereview} = require("../middleware/validatelisting.middleware.js");

reviewrouter.post('/',validatereview, createreview);
reviewrouter.delete('/:reviewId', Deletereview);



  module.exports = reviewrouter;

