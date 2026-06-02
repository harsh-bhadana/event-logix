import mongoose, { Schema, Document } from "mongoose";

export interface IAuditLog extends Document {
  actor?: mongoose.Types.ObjectId;
  actorEmail?: string;
  action: string;
  targetType: string;
  targetId?: string;
  details: Record<string, any>;
  ipAddress?: string;
  createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>(
  {
    actor: { type: Schema.Types.ObjectId, ref: "User" },
    actorEmail: String,
    action: { type: String, required: true },
    targetType: { type: String, required: true },
    targetId: String,
    details: { type: Schema.Types.Mixed, default: {} },
    ipAddress: String,
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.models.AuditLog ||
  mongoose.model<IAuditLog>("AuditLog", AuditLogSchema);
