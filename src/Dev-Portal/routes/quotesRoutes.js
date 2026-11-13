const express = require("express");
const router = express.Router();
const limiter = require("../../utils/limiter");
const authMiddleware = require("../middleware/authMiddleware");
const {allQuotes, deleteQuote} = require("../controllers/quote");

router.get("/all-quotes", limiter, authMiddleware, allQuotes);
router.delete("/delete-quote/:id", limiter, authMiddleware, deleteQuote);

module.exports = router;