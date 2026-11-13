const Messages = require("../../models/chat-messages");

const allMessages = async(req,res)=>{
    try{
        const allmessages = await Messages.find().sort({createdAt: -1});
        const totalmessages = await Messages.countDocuments();

        return res.status(200).json({success: true, data: allmessages, totalmessages});
    } catch(err){
        return res.status(500).json({success: false, message: err});
    }
}

const deleteMessage = async(req,res)=>{
    try{
        const {id} = req.params;

        const deletedMessage = await Messages.findByIdAndDelete(id);

        if(!deletedMessage){
            return res.status(404).json({success: false, message: "Message not found"});
        }

        return res.status(200).json({success: true, message: "Message deleted"});
    } catch(err){
        return res.status(500).json({success: false, message: err});
    }
}

module.exports = {allMessages, deleteMessage};