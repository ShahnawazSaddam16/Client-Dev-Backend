require("dotenv").config();
const mongoose = require("mongoose");

const dbConnection = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI,{});
    } catch(err){
        console.error(err);
    }
}

dbConnection()
.then(()=>{console.log("MongoDB Connected Successfully ✅✅")})
.catch((err)=>{console.error(err)});

module.exports = dbConnection;