const Projects = require("../../models/projects");

const userProjects = async (req, res) => {
    try {
        const userId = req.user._id || req.user.id || req.user.userId;

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

module.exports = { userProjects };