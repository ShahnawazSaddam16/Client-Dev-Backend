const Projects = require("../../models/projects");

const addProject = async(req,res)=>{
    try{
        const {projectName, email, projectType, projectDuration} = req.body;

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
        return res.status(500).json({success: false, message: err});
    }
}

module.exports = {}