const express = require("express");
const router = express.Router();
const limiter = require("../../utils/limiter");
const authMiddleware = require("../middleware/authMiddleware");
const uploadProjectImages = require("../middleware/upload");
const {addProject, allProjects, getProjectById, editProject, deleteProject} = require("../controllers/projects");

router.post("/add-project", limiter, authMiddleware, uploadProjectImages, addProject);
router.get("/all-projects", limiter, authMiddleware, allProjects);
router.get("/project/:id", limiter, authMiddleware, getProjectById);
router.put("/project/:id", limiter, authMiddleware, uploadProjectImages, editProject);
router.delete("/project/:id", limiter, authMiddleware, deleteProject);

module.exports = router;