const express = require("express");
const router = express.Router();
const limiter = require("../../utils/limiter");
const authMiddleware = require("../middleware/authMiddleware");
const {addProject} = require("../controllers/projects");

router.post("/add-project", limiter, authMiddleware, addProject);

module.exports = router;