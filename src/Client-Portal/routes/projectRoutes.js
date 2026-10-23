const express = require("express");
const router = express.Router();
const limiter = require("../../utils/limiter");
const authMiddleware = require("../middleware/authMiddleware");
const {userProjects, userProjectsById} = require("../controllers/projects");

router.get("/user-project", limiter, authMiddleware, userProjects);
router.get("/user-project/:id", limiter, authMiddleware, userProjectsById);

module.exports = router;