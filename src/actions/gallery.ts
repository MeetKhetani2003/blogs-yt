"use server";

import dbConnect from "@/lib/db";
import { GalleryImage } from "@/models/GalleryImage";

export async function getGalleryImages() {
    try {
        await dbConnect();
        const images = await GalleryImage.find().sort({ createdAt: -1 }).lean();
        return { success: true, images: JSON.parse(JSON.stringify(images)) };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
