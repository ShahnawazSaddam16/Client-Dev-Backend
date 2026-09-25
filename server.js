const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConnection = require("./src/config/mongoDB");
const authRoutes = require("./src/Dev-Portal/routes/authRoutes");

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cors({origin: "http://localhost:3000", credentials: true}));
app.use(cookieParser());

// dbConnection
dbConnection();

// Routes
app.get("/", (req,res)=>{
    res.status(200).json({success: true, message: "Server Running Successfully"});
});

app.use("/api/dev/auth", authRoutes);


app.listen(PORT,(err)=>{
    if(err){
      console.error(err);
    } else{
        console.log(`Server Running at ${PORT} ✅✅`);
    }
});