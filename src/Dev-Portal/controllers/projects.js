const Projects = require("../../models/projects");
const Users = require("../../models/users");
const {sendProjectUpdateEmail} = require("../../utils/sendEmail");

const addProject = async(req,res)=>{
    try{
        const {
            projectName,
            email,
            projectType,
            projectDuration,
            projectProgress = [],
            projectLinks = [],
            status = "Not Started",
        } = req.body;

        if(!projectName || !email || !projectType || !projectDuration){
            return res.status(401).json({success: false, message: "Please fill all fields"});
        }

        const user = await Users.findOne({email});

        if(!user){
            return res.status(404).json({success: false, message: "User Not Found"});
        }

        const normalizedLinks = Array.isArray(projectLinks)
            ? projectLinks
            : projectLinks
                ? [projectLinks]
                : [];

        const normalizedProgress = Array.isArray(projectProgress)
            ? projectProgress
            : projectProgress
                ? [projectProgress]
                : [];

        const newProject = await Projects.create({
            projectName,
            username: user.username,
            email,
            userId: user._id,
            projectType,
            projectDuration,
            projectProgress: normalizedProgress,
            projectImages: req.imageUrls || [],
            status,
            projectLinks: normalizedLinks,
        });

        return res.status(200).json({success: true, message: "New Project Created", project: newProject});
    } catch(err){
        console.error(err)
        return res.status(500).json({success: false, message: err.message || err});
    }
}

const allProjects = async(req,res)=>{
    try{
        const allprojects = await Projects.find().sort({createdAt: -1});
        const totalProjects = await Projects.countDocuments();
        const completedProjects = await Projects.countDocuments({status: "Completed"});

        return res.status(200).json({success: true, allprojects, totalProjects, completedProjects});
    } catch(err){
        console.error(err);
        return res.status(500).json({success: false, message: err});
    }
}

const getProjectById = async(req,res)=>{
    try{
        const {id} = req.params;

        const project = await Projects.findById(id);

        if(!project){
            return res.status(404).json({success: false, message: "Project Not Found"});
        }

        return res.status(200).json({success: true, project});
    } catch(err){
        console.error(err);
        return res.status(500).json({success: false, message: err});
    }
}

const editProject = async(req,res)=>{
    try{
        const {id} = req.params;
        const {
            projectName,
            projectType,
            projectDuration,
            projectProgress,
            projectLinks,
            status,
        } = req.body;

        const project = await Projects.findById(id);

        if(!project){
            return res.status(404).json({success: false, message: "Project Not Found"});
        }

        if(projectName !== undefined) project.projectName = projectName;
        if(projectType !== undefined) project.projectType = projectType;
        if(projectDuration !== undefined) project.projectDuration = projectDuration;
        if(projectProgress !== undefined){
            project.projectProgress = Array.isArray(projectProgress)
                ? projectProgress
                : projectProgress
                    ? [projectProgress]
                    : [];
        }
        if(req.imageUrls && req.imageUrls.length) project.projectImages = [...project.projectImages, ...req.imageUrls];
        if(projectLinks !== undefined) project.projectLinks = projectLinks;
        if(status !== undefined) project.status = status;

        await project.save();

        try{
            await sendProjectUpdateEmail(project.email, project.projectName, project.status);
        } catch(emailErr){
            console.error(emailErr);
        }

        return res.status(200).json({success: true, message: "Project Updated Successfully"});
    } catch(err){
        console.error(err);
        return res.status(500).json({success: false, message: err});
    }
}

const deleteProjectImage = async(req,res)=>{
    try{
        const {id} = req.params;
        const {imageUrl} = req.body;

        if(!imageUrl){
            return res.status(401).json({success: false, message: "Please provide imageUrl"});
        }

        const project = await Projects.findById(id);

        if(!project){
            return res.status(404).json({success: false, message: "Project Not Found"});
        }

        if(!project.projectImages.includes(imageUrl)){
            return res.status(404).json({success: false, message: "Image Not Found"});
        }

        project.projectImages = project.projectImages.filter((img) => img !== imageUrl);

        await project.save();
        return res.status(200).json({success: true, message: "Image Deleted Successfully", projectImages: project.projectImages});
    } catch(err){
        console.error(err);
        return res.status(500).json({success: false, message: err});
    }
}

const deleteProject = async(req,res)=>{
    try{
        const {id} = req.params;

        const project = await Projects.findByIdAndDelete(id);

        if(!project){
            return res.status(404).json({success: false, message: "Project Not Found"});
        }

        return res.status(200).json({success: true, message: "Project Deleted Successfully"});
    } catch(err){
        console.error(err);
        return res.status(500).json({success: false, message: err});
    }
}

module.exports = {addProject, allProjects, getProjectById, editProject, deleteProjectImage, deleteProject}