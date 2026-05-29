import mongoose, { Document, Model, Schema } from 'mongoose';
import './Blog';
import './YoutubeVideo';

export interface IAnalytics extends Document {
  blogId?: mongoose.Types.ObjectId;
  videoId?: mongoose.Types.ObjectId;
  type: 'PAGEVIEW' | 'SEARCH' | 'UPLOAD';
  metaData?: any;
  createdAt: Date;
}

const AnalyticsSchema = new Schema<IAnalytics>(
  {
    blogId: { type: Schema.Types.ObjectId, ref: 'Blog' },
    videoId: { type: Schema.Types.ObjectId, ref: 'YoutubeVideo' },
    type: { type: String, enum: ['PAGEVIEW', 'SEARCH', 'UPLOAD'], required: true },
    metaData: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export const Analytics: Model<IAnalytics> = mongoose.models.Analytics || mongoose.model<IAnalytics>('Analytics', AnalyticsSchema);
