const Messages = require("../../models/messages");

const userNotification = async(req,res)=>{
    try{
        const userId = req.user._id;
        const notifications = await Messages.find({userId});
        return res.status(200).json({success: false, data: notifications})
    } catch(err){
        return res.status(500).json({success: false, message: err});
    }
}

module.exports = {userNotification}