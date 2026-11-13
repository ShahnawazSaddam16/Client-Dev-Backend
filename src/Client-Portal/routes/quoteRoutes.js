const express = require("express");
const router = express.Router();
const limiter = require("../../utils/limiter");
const {sentQuote} = require("../controllers//quote");

router.post("/sent-quote", limiter, sentQuote);

module.exports = router;