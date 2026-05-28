import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import mongoose from 'mongoose';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbConnect();
    const db = mongoose.connection.db;
    if (!db) {
        throw new Error("Database connection not established");
    }

    const bucket = new mongoose.mongo.GridFSBucket(db, {
      bucketName: 'media',
    });

    const fileId = new mongoose.mongo.ObjectId(id);
    
    // Check if file exists
    const files = await bucket.find({ _id: fileId }).toArray();
    if (files.length === 0) {
      return new NextResponse('File not found', { status: 404 });
    }

    const file = files[0];
    const stream = bucket.openDownloadStream(fileId);

    // Return the stream directly with headers
    return new NextResponse(stream as any, {
      headers: {
        'Content-Type': (file as any).contentType || 'image/webp',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Length': file.length.toString(),
      },
    });
  } catch (error) {
    console.error('Media Fetch Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
