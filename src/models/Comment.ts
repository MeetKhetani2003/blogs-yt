import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IComment extends Document {
  blog: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId; // Author of comment
  parentComment?: mongoose.Types.ObjectId; // For nested replies
  content: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    blog: { type: Schema.Types.ObjectId, ref: 'Blog', required: true, index: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    parentComment: { type: Schema.Types.ObjectId, ref: 'Comment' },
    content: { type: String, required: true },
    status: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'APPROVED' },
  },
  { timestamps: true }
);

export const Comment: Model<IComment> = mongoose.models.Comment || mongoose.model<IComment>('Comment', CommentSchema);
