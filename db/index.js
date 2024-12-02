const mongoose = require('mongoose');
const mongo_url = require('../constant.js');



const connectdb = async ()=>{
    main()
    .then(()=>{
        console.log("Connected DB")
    }).catch((err) => {
        console.log(err)
    });
    async function main() {
        await mongoose.connect(mongo_url);
      }
}

module.exports = connectdb;
