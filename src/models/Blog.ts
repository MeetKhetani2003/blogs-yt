import mongoose, { Document, Model, Schema } from 'mongoose';
import './Category';
import './Hashtag';
import './User';

export interface IBlog extends Document {
  title: string;
  slug: string;
  seoTitle?: string;
  metaDescription?: string;
  focusKeywords?: string[];
  heroImage?: string;
  thumbnailImage?: string;
  category: mongoose.Types.ObjectId;
  hashtags: mongoose.Types.ObjectId[];
  featuredImageAlt?: string;
  author: mongoose.Types.ObjectId;
  status: 'DRAFT' | 'PUBLISHED';
  publishedAt?: Date;
  canonicalUrl?: string;
  excerpt?: string;
  content: string; // HTML or Markdown
  faq?: { question: string; answer: string }[];
  isFeatured: boolean;
  views: number;
  readTime: string;
  sections?: { id: string; title: string }[];
  seoScore?: number;
  seoSuggestions?: string[];
  robots?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    seoTitle: { type: String },
    metaDescription: { type: String },
    focusKeywords: [{ type: String }],
    heroImage: { type: String },
    thumbnailImage: { type: String },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    hashtags: [{ type: Schema.Types.ObjectId, ref: 'Hashtag' }],
    featuredImageAlt: { type: String },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['DRAFT', 'PUBLISHED'], default: 'DRAFT' },
    publishedAt: { type: Date },
    canonicalUrl: { type: String },
    excerpt: { type: String },
    content: { type: String, required: true },
    faq: [{
      question: { type: String },
      answer: { type: String },
    }],
    isFeatured: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    readTime: { type: String, default: '5 min read' },
    seoScore: { type: Number },
    seoSuggestions: [{ type: String }],
    robots: { type: String, default: 'index, follow' },
    sections: [{
      id: { type: String },
      title: { type: String }
    }],
  },
  { timestamps: true }
);

BlogSchema.index({ title: 'text', excerpt: 'text', content: 'text' });

export const Blog: Model<IBlog> = mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
