const express = require("express");
const router = express.Router();
const limiter = require("../../utils/limiter");
const authMiddleware = require("../middleware/authMiddleware");
const {Login, Me, Logout} = require("../controllers/auth");

router.post("/login", limiter, Login);
router.get("/me", authMiddleware, limiter, Me);

module.exports = router;