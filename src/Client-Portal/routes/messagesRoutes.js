const express = require("express");
const router = express.Router();
const limiter = require("../../utils/limiter");
const authMiddleware = require("../middleware/authMiddleware");
const {userNotification} = require("../controllers/messages");

router.get("/user-notification", limiter, authMiddleware, userNotification);

module.exports = router;