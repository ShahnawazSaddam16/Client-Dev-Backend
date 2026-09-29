const express = require("express");
const router = express.Router();
const limiter = require("../../utils/limiter");
const authMiddleware = require("../middleware/authMiddleware");
const {addUser, allUsers} = require("../controllers/users");

router.post("/add-user", limiter, authMiddleware, addUser);
router.get("/all-users", limiter, authMiddleware, allUsers);

module.exports = router;