const Projects = require("../../models/projects");

const userProjects = async (req, res) => {
    try {
        const userId = req.user._id;

        const userproject = await Projects.find({ userId });
        const totalProjects = userproject.length;

        const ongoingProjects = userproject.filter((p) => p.status === "In Progress");
        const totalOngoingProjects = ongoingProjects.length;

        return res.status(200).json({ success: true, userproject, totalProjects, ongoingProjects, totalOngoingProjects });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: err.message || err });
    }
};

const userProjectsById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const project = await Projects.findOne({ _id: id, userId });

        if (!project) {
            return res.status(404).json({ success: false, message: "Project Not Found" });
        }

        return res.status(200).json({ success: true, project });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: err.message || err });
    }
};

module.exports = { userProjects, userProjectsById };