const Users = require("../../models/users");

const addUser = async(req,res)=>{
    try{
        const {username, email, profession} = req.body;

        if(!email || !email || !profession){
            return res.status(401).json({success: false, message: "Please fill all fields"});
        }

        const existingUser = await Users.find({email});

        if(existingUser){
            return res.status(403).json({success: false, message: "User Already Exits"})
        }

        const newuser = await Users.create({
            username,
            email,
            profession,
        });

        await newuser.save();
        return res.status(200).json({success: true, message: "User Created Successfully"});

    } catch(err){
        return res.status(500).json({success: false, message: err});
    }
}

module.exports = {addUser};