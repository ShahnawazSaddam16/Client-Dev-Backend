const express = require("express");
const router = express.Router();
const limiter = require("../../utils/limiter");
const authMiddleware = require("../middleware/authMiddleware");
const {sentMessage} = require("../controllers/messages");

router.post("/sent-message", authMiddleware, limiter, sentMessage);

module.exports = router;