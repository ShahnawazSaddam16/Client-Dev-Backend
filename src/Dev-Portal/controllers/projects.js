const Projects = require("../../models/projects");

const addProject = async(req,res)=>{
    try{
        const {
            projectName,
            email,
            projectType,
            projectDuration,
            projectProgress = "",
            projectImages = "",
            projectLinks = "",
        } = req.body;

        if(!projectName || !email || !projectType || !projectDuration){
            return res.status(401).json({success: false, message: "Please fill all fields"});
        }

        const newProject = await Projects.create({
            projectName,
            email,
            projectType,
            projectDuration,
            projectProgress,
            projectImages,
            projectLinks,
        });
        await newProject.save();
        return res.status(200).json({success: true, message: "New Project Created"});
    } catch(err){
        console.log(err)
        return res.status(500).json({success: false, message: err});
    }
}

const allProjects = async(req,res)=>{
    try{
        const allprojects = await Projects.find();
        const totalProjects = await Projects.countDocuments();

        return res.status(200).json({success: true, allProjects, totalProjects});
    } catch(err){
        return res.status(500).json({success: false, message: err});
    }
}

module.exports = {addProject, allProjects}