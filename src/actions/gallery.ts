"use server";

import dbConnect from "@/lib/db";
import { GalleryImage } from "@/models/GalleryImage";
import { auth } from "@/auth";
import mongoose from "mongoose";

export async function getGalleryImages() {
    try {
        await dbConnect();
        const images = await GalleryImage.find().sort({ createdAt: -1 }).lean();
        return { success: true, images: JSON.parse(JSON.stringify(images)) };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteGalleryImage(id: string) {
    try {
        const session = await auth();
        if (!session || session.user?.role !== 'ADMIN') throw new Error("Unauthorized");
        
        await dbConnect();
        const image = await GalleryImage.findById(id);
        if (!image) throw new Error("Image not found");
        
        const gridFsId = image.gridFsId;
        await GalleryImage.findByIdAndDelete(id);
        
        const db = mongoose.connection.db;
        if (db && gridFsId) {
            const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: 'media' });
            await bucket.delete(new mongoose.mongo.ObjectId(gridFsId));
        }
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
