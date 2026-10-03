const express = require("express");
const router = express.Router();
const limiter = require("../../utils/limiter");
const authMiddleware = require("../middleware/authMiddleware");
const {addProject, allProjects, getProjectById} = require("../controllers/projects");

router.post("/add-project", limiter, authMiddleware, addProject);
router.get("/all-projects", limiter, authMiddleware, allProjects);
router.get("/project/:id", limiter, authMiddleware, getProjectById);

module.exports = router;