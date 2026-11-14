const express = require("express");
const router = express.Router();
const limiter = require("../../utils/limiter");
const authMiddleware = require("../middleware/authMiddleware");
const {sentMessage, ChangeApproval} = require("../controllers/chat-messages");

router.post("/sent-message", authMiddleware, limiter, sentMessage);
router.post("/update-approval", authMiddleware, limiter, ChangeApproval);

module.exports = router;