import mongoose, { Document, Schema } from "mongoose";

export interface IPayment extends Document {
  user: mongoose.Types.ObjectId;
  role: "developer" | "caller" | "bidder";
  baseSalary: number;
  bonus: number;
  total: number;
  month: string; // "2026-04"
  status: "pending" | "paid";
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    role: { type: String, required: true },
    baseSalary: { type: Number, required: true },
    bonus: { type: Number, default: 0 },
    total: { type: Number, required: true },
    month: { type: String, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model<IPayment>("Payment", PaymentSchema);