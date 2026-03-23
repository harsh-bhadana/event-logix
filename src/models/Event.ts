import mongoose, { Schema, Document } from "mongoose";

export interface IStaffRole {
  id: string;
  name: string;
  description: string;
  headcount: number;
  icon: string;
}

export interface IEvent extends Document {
  title: string;
  category: string;
  date: string;
  description: string;
  bannerImage: string | null;
  accessModel: "paid" | "free";
  ticketPrice: string;
  totalQuantity: string;
  pricingStrategy: "early-bird" | "group-rate" | "standard";
  taxInclusive: boolean;
  showFeeBreakdown: boolean;
  staffRoles: IStaffRole[];
  createdAt: Date;
  updatedAt: Date;
}

const StaffRoleSchema = new Schema<IStaffRole>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  headcount: { type: Number, required: true },
  icon: { type: String, required: true },
});

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
    bannerImage: { type: String, default: null },
    accessModel: { type: String, enum: ["paid", "free"], required: true },
    ticketPrice: { type: String, required: true },
    totalQuantity: { type: String, required: true },
    pricingStrategy: { type: String, enum: ["early-bird", "group-rate", "standard"], required: true },
    taxInclusive: { type: Boolean, default: true },
    showFeeBreakdown: { type: Boolean, default: false },
    staffRoles: [StaffRoleSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);
