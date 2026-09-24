const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConnection = require("./src/config/mongoDB");

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// dbConnection
dbConnection();

// Routes
app.get("/", (req,res)=>{
    res.status(200).json({success: true, message: "Server Running Successfully"});
});


app.listen(PORT,(err)=>{
    if(err){
      console.error(err);
    } else{
        console.log(`Server Running at ${PORT} ✅✅`);
    }
});