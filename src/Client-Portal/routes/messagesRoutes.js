const express = require("express");
const router = express.Router();
const limiter = require("../../utils/limiter");
const authMiddleware = require("../middleware/authMiddleware");
const {userNotification, deleteNotification} = require("../controllers/messages");

router.get("/user-notification", limiter, authMiddleware, userNotification);
router.delete("/delete-notifcation", limiter, authMiddleware, deleteNotification);

module.exports = router;