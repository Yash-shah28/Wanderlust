
const initdata = require('./data.js')
const Listing = require('../models/listing.model.js')
const connectdb = require("../db/index.js")

connectdb().then(()=>{
    const initDB = async ()=> {
        await Listing.deleteMany({});
        initdata.data = initdata.data.map((obj)=>({
            ...obj,
            owner: "674c77b13529f47780f8670e"}))
        await Listing.insertMany(initdata.data);
        console.log("Data is intialized");
    }
    initDB(); 
})
.catch(err => console.log(err))
