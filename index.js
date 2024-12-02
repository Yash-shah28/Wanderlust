const connectdb = require("./db/index.js")
const app = require("./app.js");

//Mongoose connect

connectdb()
    .then(()=>{
        app.listen(3000, ()=> {
            console.log("Server started")
        });
    })
    .catch((err)=>{
        console.log("Connection Failed",err)
    });

// app.get("/",(req,res)=>{
//     res.send("Hi i am Root node")
// });

