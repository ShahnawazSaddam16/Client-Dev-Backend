const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        trim: true,
    },
    updateId: {
        type: String,
        trim: true,
    },
    approval: {
        type: String,
        enum: ["liked", "disliked"],
    },
}, { timestamps: true });

module.exports = mongoose.model("Messages", messageSchema);