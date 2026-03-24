import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'staff' | 'public';
  staffProfile?: {
    skills: string[];
    isVerified: boolean;
    onboardingStatus: 'pending' | 'approved' | 'rejected';
    rejectionReason?: string;
    profileImage?: string;
    bio?: string;
    yearsOfExperience?: string;
    noticePeriod?: string;
    customTags?: string[];
    availability?: {
      monday: boolean;
      tuesday: boolean;
      wednesday: boolean;
      thursday: boolean;
      friday: boolean;
      saturday: boolean;
      sunday: boolean;
    };
    verificationDocs?: string[];
    earnings?: {
      balance: number;
      lifetime: number;
    };
    shifts?: Array<{
      eventId: string;
      eventTitle: string;
      date: Date;
      role: string;
      amount: number;
      status: 'pending' | 'processing' | 'paid';
    }>;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { 
      type: String, 
      enum: ['admin', 'staff', 'public'], 
      default: 'public' 
    },
    staffProfile: {
      skills: [String],
      isVerified: { type: Boolean, default: false },
      onboardingStatus: { 
        type: String, 
        enum: ['pending', 'approved', 'rejected'], 
        default: 'pending' 
      },
      rejectionReason: String,
      profileImage: String,
      bio: String,
      yearsOfExperience: String,
      noticePeriod: String,
      customTags: [String],
      availability: {
        monday: { type: Boolean, default: true },
        tuesday: { type: Boolean, default: true },
        wednesday: { type: Boolean, default: true },
        thursday: { type: Boolean, default: true },
        friday: { type: Boolean, default: true },
        saturday: { type: Boolean, default: false },
        sunday: { type: Boolean, default: false },
      },
      verificationDocs: [String],
      earnings: {
        balance: { type: Number, default: 0 },
        lifetime: { type: Number, default: 0 }
      },
      shifts: [{
        eventId: { type: Schema.Types.ObjectId, ref: 'Event' },
        eventTitle: String,
        date: Date,
        role: String,
        amount: Number,
        status: { 
          type: String, 
          enum: ['pending', 'processing', 'paid'], 
          default: 'pending' 
        }
      }]
    }
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
