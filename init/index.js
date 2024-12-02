
const initdata = require('./data.js')
const Listing = require('../models/listing.model.js')
const connectdb = require("../db/index.js")

connectdb().then(()=>{
    const initDB = async ()=> {
        await Listing.deleteMany({});
        await Listing.insertMany(initdata.data);
        console.log("Data is intialized");
    }
    initDB(); 
})
.catch(err => console.log(err))
