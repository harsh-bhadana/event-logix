import mongoose, { Schema, Document } from "mongoose";

export interface IStaffRoleNeeded {
  roleName: string;
  count: number;
  assignedStaff: mongoose.Types.ObjectId[];
}

export interface IEvent extends Document {
  title: string;
  description: string;
  bannerImage: string | null;
  category: string;
  date: Date;
  location: {
    type: 'Point';
    address: string;
    coordinates: number[];
  };
  accessModel: "paid" | "free";
  ticketPrice: number;
  totalQuantity: number;
  pricingStrategy: "early-bird" | "group-rate" | "standard";
  taxInclusive: boolean;
  showFeeBreakdown: boolean;
  staffRolesNeeded: IStaffRoleNeeded[];
  status: 'draft' | 'published' | 'cancelled';
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const StaffRoleNeededSchema = new Schema<IStaffRoleNeeded>({
  roleName: { type: String, required: true },
  count: { type: Number, required: true },
  assignedStaff: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    bannerImage: { type: String, default: null },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    location: {
      type: { type: String, default: 'Point' },
      address: String,
      coordinates: [Number] // [longitude, latitude]
    },
    accessModel: { type: String, enum: ["paid", "free"], required: true },
    ticketPrice: { type: Number, default: 0 },
    totalQuantity: { type: Number, required: true },
    pricingStrategy: { type: String, enum: ["early-bird", "group-rate", "standard"], required: true },
    taxInclusive: { type: Boolean, default: true },
    showFeeBreakdown: { type: Boolean, default: false },
    staffRolesNeeded: [StaffRoleNeededSchema],
    status: { 
      type: String, 
      enum: ['draft', 'published', 'cancelled'], 
      default: 'draft' 
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true,
  }
);

// Add index for location if needed
EventSchema.index({ location: '2dsphere' });

export default mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);
