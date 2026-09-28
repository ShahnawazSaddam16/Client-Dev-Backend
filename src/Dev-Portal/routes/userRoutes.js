const express = require("express");
const router = express.Router();
const limiter = require("../../utils/limiter");
const authMiddleware = require("../middleware/authMiddleware");
const {addUser} = require("../controllers/users");

router.post("/add-user", limiter, authMiddleware, addUser);

module.exports = router;