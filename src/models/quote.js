const mongoose = require("mongoose");

const quoteschema = new mongoose.Schema({

    name: {type: String, required: true},
    email: {type: String, required: true, unique: true, lowercase: true},
    message: {type: String, required: true},
    purpose: {type: String, required: true}

}, {timestamps: true});

module.exports = mongoose.model("Quotes", quoteschema);