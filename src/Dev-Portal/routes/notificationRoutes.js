const express = require("express");
const router = express.Router();
const limiter = require("../../utils/limiter");
const authMiddleware = require("../middleware/authMiddleware");
const {sentNotification} = require("../controllers/notification");

router.post("/send-notification", authMiddleware, limiter, sentNotification);

module.exports = router;