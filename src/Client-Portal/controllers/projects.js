const Projects = require("../../models/projects");

const userProjects = async(req,res)=>{
    try{
        const {userId} = req.params;

        const userproject = await Projects.find({userId});
        const totalProjects = await Projects.countDocuments({userId});

        const ongoingProjects = await Projects.find({userId, status: "Active"});
        const totalOngoingProjects = await Projects.countDocuments({userId, status: "Active"});

        return res.status(200).json({success: true, userproject, totalProjects, ongoingProjects, totalOngoingProjects});
    } catch(err){
        console.error(err);
        return res.status(500).json({success: false, message: err.message || err});
    }
}

module.exports = {userProjects}