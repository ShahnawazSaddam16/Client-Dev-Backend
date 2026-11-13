const express = require("express");
const router = express.Router();
const limiter = require("../../utils/limiter");
const authMiddleware = require("../middleware/authMiddleware");
const {allMessages, deleteMessage} = require("../controllers/chat-messages");

router.get("/all-messages", authMiddleware, limiter, allMessages);
router.delete("/delete-message/:id", authMiddleware, limiter, deleteMessage);

module.exports = router;