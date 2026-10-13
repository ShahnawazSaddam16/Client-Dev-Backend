const express = require("express");
const router = express.Router();
const limiter = require("../../utils/limiter");
const authMiddleware = require("../middleware/authMiddleware");
const {userProjects} = require("../controllers/projects");

router.get("/user-project", limiter, authMiddleware, userProjects);

module.exports = router;