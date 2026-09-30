const express = require("express");
const router = express.Router();
const limiter = require("../../utils/limiter");
const authMiddleware = require("../middleware/authMiddleware");
const {addUser, allUsers, editUser, deleteUser} = require("../controllers/users");

router.post("/add-user", limiter, authMiddleware, addUser);
router.get("/all-users", limiter, authMiddleware, allUsers);
router.put("/edit-user/:id", limiter, authMiddleware, editUser);
router.delete("/delete-user/:id", limiter, authMiddleware, deleteUser);

module.exports = router;