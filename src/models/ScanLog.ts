import mongoose, { Schema, Document } from "mongoose";

export interface IScanLog extends Document {
  event: mongoose.Types.ObjectId;
  booking?: mongoose.Types.ObjectId;
  ticketCode: string;
  scannedBy?: mongoose.Types.ObjectId;
  status: "success" | "failure";
  errorReason?: string;
  scannedAt: Date;
}

const ScanLogSchema = new Schema<IScanLog>(
  {
    event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    booking: { type: Schema.Types.ObjectId, ref: "Booking" },
    ticketCode: { type: String, required: true },
    scannedBy: { type: Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["success", "failure"], required: true },
    errorReason: String,
    scannedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.ScanLog ||
  mongoose.model<IScanLog>("ScanLog", ScanLogSchema);
