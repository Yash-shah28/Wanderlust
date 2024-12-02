const {reviewSchema} = require("../schema.js")

module.exports.validatereview = (res,req,next) =>{
    let {error}= reviewSchema.validate(req.body);
   if(error){
    let errMsg = error.details.map((el)=> el.message).join(",")
    throw new ExpressError(400,errMsg)
   }else{
    next()
   }
}

