const express = require("express");
const router = express.Router();
const limiter = require("../../utils/limiter");
const authMiddleware = require("../middleware/authMiddleware");
const {userProjects, userProjectsById} = require("../controllers/projects");
const {aiSuggestProject} = require("../controllers/ai-suggest");

router.get("/user-project", limiter, authMiddleware, userProjects);
router.get("/user-project/:id", limiter, authMiddleware, userProjectsById);
router.post("/ai-suggest/:id", limiter, authMiddleware, aiSuggestProject);

module.exports = router;