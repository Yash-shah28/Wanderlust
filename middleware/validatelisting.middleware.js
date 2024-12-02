const {listingSchema, reviewSchema} = require("../schema.js")

module.exports.validatelisting = (res,req,next) =>{
    let {error}= listingSchema.validate(req.body);
   if(error){
    let errMsg = error.details.map((el)=> el.message).join(",")
    throw new ExpressError(400,errMsg)
   }else{
    next()
   }
}

module.exports.validatereview = (res,req,next) =>{
    let {error}= reviewSchema.validate(req.body);
   if(error){
    let errMsg = error.details.map((el)=> el.message).join(",")
    throw new ExpressError(400,errMsg)
   }else{
    next()
   }
}

