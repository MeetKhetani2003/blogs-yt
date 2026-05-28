import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import mongoose from 'mongoose';
import sharp from 'sharp';
import { GalleryImage } from '@/models/GalleryImage';
import { Analytics } from '@/models/Analytics';
import { auth } from '@/auth';

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const categoryId = formData.get('categoryId') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const originalName = file.name;
    const format = 'webp'; // Convert to webp for better compression

    // Optimize with sharp
    const optimizedBuffer = await sharp(buffer)
      .resize({ width: 1920, height: 1080, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    const blurBuffer = await sharp(buffer)
        .resize(10, 10, { fit: 'inside' })
        .webp({ quality: 20 })
        .toBuffer();
    
    const blurDataUrl = `data:image/webp;base64,${blurBuffer.toString('base64')}`;
    const sizeBytes = optimizedBuffer.length;
    const metadata = await sharp(optimizedBuffer).metadata();

    const db = mongoose.connection.db;
    if (!db) {
        throw new Error("Database connection not established");
    }

    const bucket = new mongoose.mongo.GridFSBucket(db, {
      bucketName: 'media',
    });

    const uploadStream = bucket.openUploadStream(originalName, {
      contentType: `image/${format}`,
      metadata: {
        width: metadata.width,
        height: metadata.height,
        sizeBytes,
        uploadedBy: session.user.id,
      },
    } as any);

    const fileId = uploadStream.id;

    uploadStream.end(optimizedBuffer);

    return new Promise<NextResponse>((resolve, reject) => {
      uploadStream.on('finish', async () => {
        // Save to GalleryImage schema
        const galleryImage = await GalleryImage.create({
          title: originalName.split('.')[0],
          url: `/api/media/${fileId}`,
          gridFsId: fileId,
          blurDataUrl,
          width: metadata.width,
          height: metadata.height,
          sizeBytes,
          format: `image/${format}`,
          category: categoryId || undefined,
        });

        // Track Analytics
        await Analytics.create({
          type: 'UPLOAD',
          metaData: { sizeBytes, format, fileId }
        });

        resolve(NextResponse.json({ success: true, image: galleryImage }, { status: 200 }));
      });

      uploadStream.on('error', (error) => {
        console.error('GridFS Upload Error:', error);
        resolve(NextResponse.json({ error: 'Upload failed' }, { status: 500 }));
      });
    });
  } catch (error: any) {
    console.error('Media Upload Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
