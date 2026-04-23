import mongoose, { Document, Schema } from "mongoose";

export interface ISubmission extends Document {
  userId: mongoose.Types.ObjectId;
  company: string;
  position: string;
  date: Date;
  status: "Pending" | "Response" | "Rejected" | "Interview";
}

const submissionSchema = new Schema<ISubmission>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    company: {
      type: String,
      required: true,
    },

    position: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Response", "Rejected", "Interview"],
      default: "Pending",
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ISubmission>("Submission", submissionSchema);