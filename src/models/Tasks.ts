import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: String,

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: ["assigned", "in-progress", "completed", "failed"],
      default: "assigned",
      index: true,
    },

    deadline: Date,

    attachments: [String], // links/files
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);