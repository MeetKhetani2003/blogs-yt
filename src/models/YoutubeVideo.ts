import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IYoutubeVideo extends Document {
  title: string;
  slug: string;
  youtubeId: string; // The v=ID
  url: string;
  thumbnail: string;
  duration?: string;
  channelName?: string;
  description?: string;
  isFeatured: boolean;
  category?: mongoose.Types.ObjectId;
  hashtags?: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const YoutubeVideoSchema = new Schema<IYoutubeVideo>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    youtubeId: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    thumbnail: { type: String, required: true },
    duration: { type: String },
    channelName: { type: String },
    description: { type: String },
    isFeatured: { type: Boolean, default: false },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    hashtags: [{ type: Schema.Types.ObjectId, ref: 'Hashtag' }],
  },
  { timestamps: true }
);

export const YoutubeVideo: Model<IYoutubeVideo> = mongoose.models.YoutubeVideo || mongoose.model<IYoutubeVideo>('YoutubeVideo', YoutubeVideoSchema);
