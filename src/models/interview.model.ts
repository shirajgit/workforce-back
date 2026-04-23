import mongoose, { Document, Schema } from "mongoose";

export interface IInterview extends Document {
  name: string;
  company: string;
  stage: number;
  salary?: string;
  notes?: string;
  createdBy: mongoose.Types.ObjectId;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const InterviewSchema = new Schema<IInterview>(
  {
    name: { type: String, required: true },
    company: { type: String, required: true },
    stage: { type: Number, default: 0 }, // 0 → Recruiter
    salary: { type: String },
    notes: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<IInterview>("Interview", InterviewSchema);