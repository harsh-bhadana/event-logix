import mongoose, { Schema, Document } from "mongoose";

export interface IStaffRoleNeeded {
  roleName: string;
  count: number;
  assignedStaff: mongoose.Types.ObjectId[];
}

export interface IEvent extends Document {
  title: string;
  description: string;
  imageUrl: string | null;
  category: string;
  date: Date;
  locationName: string;
  location: {
    type: 'Point';
    address: string;
    coordinates: number[];
  };
  accessModel: "paid" | "free";
  ticketTypes: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  pricingStrategy: "early-bird" | "group-rate" | "standard";
  taxInclusive: boolean;
  showFeeBreakdown: boolean;
  staffRolesNeeded: IStaffRoleNeeded[];
  speakers?: Array<{
    name: string;
    role: string;
    company: string;
    imageUrl: string;
  }>;
  attendeeTypes?: Array<{
    name: string;
    description: string;
    icon: string;
  }>;
  status: 'draft' | 'published' | 'cancelled';
  isFeatured: boolean;
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
    imageUrl: { type: String, default: null },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    locationName: { type: String },
    location: {
      type: { type: String, default: 'Point' },
      address: String,
      coordinates: [Number] // [longitude, latitude]
    },
    isFeatured: { type: Boolean, default: false },
    accessModel: { type: String, enum: ["paid", "free"], required: true },
    ticketTypes: [{
      name: String,
      price: Number,
      quantity: Number
    }],
    pricingStrategy: { type: String, enum: ["early-bird", "group-rate", "standard"], required: true },
    taxInclusive: { type: Boolean, default: true },
    showFeeBreakdown: { type: Boolean, default: false },
    staffRolesNeeded: [StaffRoleNeededSchema],
    speakers: [{
      name: String,
      role: String,
      company: String,
      imageUrl: String
    }],
    attendeeTypes: [{
      name: String,
      description: String,
      icon: String
    }],
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

EventSchema.index({ location: '2dsphere' });

export default mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);
