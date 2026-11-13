const Notifications = require("../../models/notification");

const userNotification = async(req,res)=>{
    try{
        const userId = req.user._id;
        const notifications = await Notifications.find({userId});
        const totalNotifications = await Notifications.countDocuments({userId});
        return res.status(200).json({success: true, data: notifications})
    } catch(err){
        console.error(err);
        return res.status(500).json({success: false, message: err});
    }
}

const deleteNotification = async(req,res)=>{
    try{
        const userId = req.user._id;
        const { id } = req.params;
        const notification = await Notifications.findOneAndDelete({_id: id, userId});
        if(!notification){
            return res.status(404).json({success: false, message: "Notification not found"});
        }
        return res.status(200).json({success: true, message: "Notification deleted"});
    } catch(err){
        console.error(err);
        return res.status(500).json({success: false, message: err});
    }
}

module.exports = {userNotification, deleteNotification}