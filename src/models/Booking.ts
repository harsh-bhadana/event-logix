import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  event: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  ticketType: string;
  paymentStatus: 'pending' | 'completed' | 'refunded';
  paymentId?: string;
  qrCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    ticketType: { type: String, required: true },
    paymentStatus: { 
      type: String, 
      enum: ['pending', 'completed', 'refunded'], 
      default: 'pending' 
    },
    paymentId: String,
    qrCode: String,
  },
  { timestamps: true }
);

export default mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);
