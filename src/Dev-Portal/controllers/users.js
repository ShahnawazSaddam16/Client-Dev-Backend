const Users = require("../../models/users");
const bycrypt = require("bcryptjs");

const addUser = async(req,res)=>{
    try{
        const {username, email, password, status} = req.body;

        if(!username || !email || !password){
            return res.status(401).json({success: false, message: "Please fill all fields"});
        }

        const existingUser = await Users.findOne({email});


        if(existingUser){
            return res.status(403).json({success: false, message: "User Already Exits"})
        }


        const newuser = await Users.create({
            username,
            email,
            password,
            status
        });

        await newuser.save();
        return res.status(200).json({success: true, message: "User Created Successfully"});

    } catch(err){
        return res.status(500).json({success: false, message: err});
    }
}

const allUsers = async(req,res)=>{
    try{
        const allusers = await Users.find();
        const totalusers = await Users.countDocuments();

        return res.status(200).json({success: true, totalusers, allusers});
    } catch(err){
        return res.status(500).json({success: false, message: err});
    }
}

const editUser = async(req,res)=>{
    try{
        const {id} = req.params;
        const {username, email, password, status} = req.body;

        const user = await Users.findById(id);

        if(!user){
            return res.status(404).json({success: false, message: "User Not Found"});
        }

        if(email && email !== user.email){
            const existingUser = await Users.findOne({email});

            if(existingUser){
                return res.status(403).json({success: false, message: "User Already Exits"});
            }
        }

        if(username) user.username = username;
        if(email) user.email = email;
        if(password) user.password = password;
        if(status) user.status = status;

        await user.save();
        return res.status(200).json({success: true, message: "User Updated Successfully"});

    } catch(err){
        return res.status(500).json({success: false, message: err});
    }
}

const deleteUser = async(req,res)=>{
    try{
        const {id} = req.params;

        const user = await Users.findByIdAndDelete(id);

        if(!user){
            return res.status(404).json({success: false, message: "User Not Found"});
        }

        return res.status(200).json({success: true, message: "User Deleted Successfully"});

    } catch(err){
        return res.status(500).json({success: false, message: err});
    }
}

module.exports = {addUser, allUsers, editUser, deleteUser};