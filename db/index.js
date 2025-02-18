const mongoose = require('mongoose');
require('dotenv').config();
const mongodb_url =process.env.MONGO_URL;


const connectdb = async ()=>{
    main()
    .then(()=>{
        console.log("Connected DB")
    }).catch((err) => {
        console.log(err)
    });
    async function main() {
        await mongoose.connect(mongodb_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  socketTimeoutMS: 30000, // 30 seconds
  connectTimeoutMS: 30000, // 30 seconds
});
      }
}

module.exports = connectdb;
