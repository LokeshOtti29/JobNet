const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    Job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true } // Corrected from timeseries to timestamps
);

module.exports = mongoose.model("Application", applicationSchema);
