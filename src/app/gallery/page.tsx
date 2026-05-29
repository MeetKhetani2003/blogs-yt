import React from 'react';
import dbConnect from '@/lib/db';
import { GalleryImage } from '@/models/GalleryImage';
import { YoutubeVideo } from '@/models/YoutubeVideo';
import GalleryClient from './GalleryClient';

export const metadata = {
    title: 'Image Gallery | Technical Rahul',
    description: 'A visual showcase of our engineering architecture, technical diagrams, and tech event moments.',
};

export default async function GalleryPage() {
    await dbConnect();
    const images = await GalleryImage.find().sort({ createdAt: -1 }).lean();
    const videos = await YoutubeVideo.find().sort({ createdAt: -1 }).lean();

    return (
        <main className="min-h-screen bg-slate-50 py-20 px-6 lg:px-20 animate-fadeIn">
            <GalleryClient images={JSON.parse(JSON.stringify(images))} videos={JSON.parse(JSON.stringify(videos))} />
        </main>
    );
}
