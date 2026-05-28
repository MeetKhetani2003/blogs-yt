"use server";

import dbConnect from "@/lib/db";
import { YoutubeVideo } from "@/models/YoutubeVideo";
import slugify from "slugify";
import { auth } from "@/auth";

export async function addYoutubeVideo(data: { url: string, title?: string, description?: string }) {
    try {
        const session = await auth();
        if (!session || session.user?.role !== 'ADMIN') throw new Error("Unauthorized");
        
        await dbConnect();
        
        // Extract ID
        let youtubeId = '';
        const match = data.url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&]{11})/);
        if (match && match[1]) {
            youtubeId = match[1];
        } else {
            throw new Error("Invalid YouTube URL");
        }

        // Fetch basic metadata from oembed if not provided
        let title = data.title;
        let thumbnail = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
        
        if (!title) {
            const res = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${youtubeId}&format=json`);
            if (res.ok) {
                const oembed = await res.json();
                title = oembed.title;
            } else {
                title = `Video ${youtubeId}`;
            }
        }

        const slug = slugify(title as string, { lower: true, strict: true }) + '-' + Math.random().toString(36).substring(2, 7);

        const video = await YoutubeVideo.create({
            title,
            slug,
            youtubeId,
            url: data.url,
            thumbnail,
            description: data.description,
        });

        return { success: true, video: JSON.parse(JSON.stringify(video)) };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function getYoutubeVideos() {
    try {
        await dbConnect();
        const videos = await YoutubeVideo.find().sort({ createdAt: -1 }).lean();
        return { success: true, videos: JSON.parse(JSON.stringify(videos)) };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
