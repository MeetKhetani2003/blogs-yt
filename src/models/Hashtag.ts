import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IHashtag extends Document {
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const HashtagSchema = new Schema<IHashtag>(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true, index: true },
  },
  { timestamps: true }
);

export const Hashtag: Model<IHashtag> = mongoose.models.Hashtag || mongoose.model<IHashtag>('Hashtag', HashtagSchema);
