const express = require("express");
const router = express.Router();
const limiter = require("../../utils/limiter");
const { Login, Me, Logout } = require("../controllers/auth");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/login", limiter, authMiddleware, Login);
router.get("/me", limiter, authMiddleware, Me);
router.post("/logout", limiter, authMiddleware, Logout);

module.exports = router;