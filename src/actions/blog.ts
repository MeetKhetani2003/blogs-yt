"use server";

import dbConnect from "@/lib/db";
import { Blog, IBlog } from "@/models/Blog";
import { Category } from "@/models/Category";
import { Hashtag } from "@/models/Hashtag";
import { User } from "@/models/User";
import { GalleryImage } from "@/models/GalleryImage";
import slugify from "slugify";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import mongoose from "mongoose";

async function deleteMediaByUrl(url?: string) {
    if (!url || !url.startsWith('/api/media/')) return;
    try {
        const fileId = url.split('/').pop();
        if (!fileId) return;
        
        await dbConnect();
        await GalleryImage.deleteOne({ url });
        
        const db = mongoose.connection.db;
        if (db) {
            const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: 'media' });
            await bucket.delete(new mongoose.mongo.ObjectId(fileId));
        }
    } catch (e) {
        console.error("Error deleting media:", e);
    }
}

export async function createBlog(data: Partial<IBlog>) {
    try {
        const session = await auth();
        if (!session || session.user?.role !== 'ADMIN') {
            throw new Error("Unauthorized");
        }

        await dbConnect();
        
        let slug = data.slug;
        if (!slug && data.title) {
            slug = slugify(data.title, { lower: true, strict: true });
        }

        const newBlog = await Blog.create({
            ...data,
            slug,
            author: session.user.id,
        });

        if (newBlog.status === 'PUBLISHED') {
            revalidatePath('/');
            revalidatePath('/publications');
        }

        return { success: true, blog: JSON.parse(JSON.stringify(newBlog)) };
    } catch (error: any) {
        console.error("Create Blog Error:", error);
        return { success: false, error: error.message };
    }
}

export async function updateBlog(id: string, data: Partial<IBlog>) {
    try {
        const session = await auth();
        if (!session || session.user?.role !== 'ADMIN') {
            throw new Error("Unauthorized");
        }

        await dbConnect();
        
        if (data.title && !data.slug) {
            data.slug = slugify(data.title, { lower: true, strict: true });
        }

        const existingBlog = await Blog.findById(id);
        if (existingBlog && data.heroImage !== undefined && existingBlog.heroImage !== data.heroImage) {
            await deleteMediaByUrl(existingBlog.heroImage);
        }

        const updatedBlog = await Blog.findByIdAndUpdate(id, data, { new: true });
        
        revalidatePath('/');
        revalidatePath('/publications');
        if (updatedBlog) {
            revalidatePath(`/publications/${updatedBlog.slug}`);
        }

        return { success: true, blog: JSON.parse(JSON.stringify(updatedBlog)) };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function getBlogs(page = 1, limit = 10, filter = {}) {
    try {
        await dbConnect();
        // Prevent tree shaking of models required for population
        if (!Category || !Hashtag || !User) console.log("Models missing");

        const skip = (page - 1) * limit;
        const blogs = await Blog.find(filter)
            .populate('category')
            .populate('hashtags')
            .populate('author', 'name image username')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();
            
        const total = await Blog.countDocuments(filter);
        return { success: true, blogs: JSON.parse(JSON.stringify(blogs)), total, totalPages: Math.ceil(total / limit) };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function getBlogById(id: string) {
    try {
        await dbConnect();
        const blog = await Blog.findById(id).lean();
        return { success: true, blog: JSON.parse(JSON.stringify(blog)) };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteBlog(id: string) {
    try {
        const session = await auth();
        if (!session || session.user?.role !== 'ADMIN') {
            throw new Error("Unauthorized");
        }
        await dbConnect();
        const existingBlog = await Blog.findById(id);
        if (existingBlog && existingBlog.heroImage) {
            await deleteMediaByUrl(existingBlog.heroImage);
        }
        await Blog.findByIdAndDelete(id);
        revalidatePath('/');
        revalidatePath('/publications');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
