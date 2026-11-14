const Settings = require("../../models/settings");

const EmailSetting = async(req,res)=>{
    const userId = req.user._id;

    try{
        const {emailtoggle} = req.body;

        if(typeof emailtoggle !== "boolean"){
            return res.status(400).json({success: false, message: "Invalid emailtoggle"});
        }

        const settings = await Settings.findOneAndUpdate(
            {userId},
            {$set: {emailtoggle}},
            {upsert: true, new: true, setDefaultsOnInsert: true}
        );

        return res.status(200).json({success: true, message: emailtoggle ? "Emails turned on" : "Emails turned off", settings});
    } catch(err){
        console.error(err);
        return res.status(500).json({success: false, message: err.message || err});
    }
}

const GetEmailSetting = async(req,res)=>{
    const userId = req.user._id;

    try{
        const settings = await Settings.findOne({userId});

        return res.status(200).json({success: true, emailtoggle: settings ? settings.emailtoggle : true, settings});
    } catch(err){
        console.error(err);
        return res.status(500).json({success: false, message: err.message || err});
    }
}

module.exports = {EmailSetting, GetEmailSetting};