const mongoose = require("mongoose");

const projectschema = new mongoose.Schema(
  {
    projectName: { type: String, required: true },
    username: {type: String, required: true},
    email: { type: String, lowercase: true, trim: true, required: true },
    projectType: { type: String, required: true },
    projectDuration: { type: Date, required: true },
    projectProgress: { type: String, default: ""},
    projectImages: { type: String, default: ""},
    projectLinks: { type: String, default: ""},
    status: {type: String, default: "Not Started"},
  },
  { timestamps: true },
);

module.exports = mongoose.model("Projects", projectschema);
