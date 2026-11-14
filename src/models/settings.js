const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
        unique: true,
    },
    emailtoggle: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("Settings", settingsSchema);