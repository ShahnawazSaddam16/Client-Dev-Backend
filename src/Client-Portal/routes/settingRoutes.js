const express = require("express");
const router = express.Router();
const limiter = require("../../utils/limiter");
const authMiddleware = require("../middleware/authMiddleware");
const {EmailSetting, GetEmailSetting} = require("../controllers/settings");

router.get("/email-setting", authMiddleware, GetEmailSetting);
router.post("/email-setting", authMiddleware, limiter, EmailSetting);

module.exports = router;