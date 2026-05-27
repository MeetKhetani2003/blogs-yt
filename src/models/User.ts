import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  image?: string;
  coverImage?: string;
  bio?: string;
  role: 'USER' | 'ADMIN';
  provider: string;
  providerId: string;
  emailVerified?: Date | null;
  savedBlogs: string[]; // For now, string array of blog slugs/ids
  commentedBlogs: string[];
  reviewedBlogs: string[];
  notifications: any[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    coverImage: { type: String, default: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80' },
    bio: { type: String, default: 'Enthusiastic reader and builder.' },
    role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
    provider: { type: String, required: true },
    providerId: { type: String, required: true },
    emailVerified: { type: Date, default: null },
    savedBlogs: [{ type: String }],
    commentedBlogs: [{ type: String }],
    reviewedBlogs: [{ type: String }],
    notifications: [{
      type: { type: String },
      title: { type: String },
      message: { type: String },
      read: { type: Boolean, default: false },
      link: { type: String },
      createdAt: { type: Date, default: Date.now }
    }],
  },
  {
    timestamps: true,
  }
);

// We need to ensure username slugging on creation.
// Mongoose middleware or just handling it in Auth callback is fine.
// Handling in Auth callback is cleaner because we can query for duplicates and append numbers.

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
