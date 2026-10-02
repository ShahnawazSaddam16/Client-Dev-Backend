const mongoose = require("mongoose");

const projectschema = new mongoose.Schema(
  {
    projectName: { type: String, required: true },
    email: { type: String, lowercase: true, trim: true, required: true },
    projectType: { type: String, required: true },
    projectDuration: { type: Date, required: true },
    projectProgress: { type: String, required: true },
    projectImages: { type: String, required: true },
    projectLinks: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Projects", projectschema);
