import mongoose, { Document, Model, Schema } from 'mongoose';
import './Category';
import './Hashtag';

export interface IGalleryImage extends Document {
  title: string;
  url: string; // Could be GridFS URL or CDN URL
  gridFsId?: mongoose.Types.ObjectId;
  blurDataUrl?: string;
  width?: number;
  height?: number;
  sizeBytes?: number;
  format?: string;
  altText?: string;
  category?: mongoose.Types.ObjectId;
  tags?: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const GalleryImageSchema = new Schema<IGalleryImage>(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    gridFsId: { type: Schema.Types.ObjectId },
    blurDataUrl: { type: String },
    width: { type: Number },
    height: { type: Number },
    sizeBytes: { type: Number },
    format: { type: String },
    altText: { type: String },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Hashtag' }],
  },
  { timestamps: true }
);

export const GalleryImage: Model<IGalleryImage> = mongoose.models.GalleryImage || mongoose.model<IGalleryImage>('GalleryImage', GalleryImageSchema);
