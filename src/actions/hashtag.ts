"use server";

import dbConnect from "@/lib/db";
import { Hashtag } from "@/models/Hashtag";
import slugify from "slugify";
import { auth } from "@/auth";

export async function createHashtag(name: string) {
    try {
        const session = await auth();
        if (!session || session.user?.role !== 'ADMIN') throw new Error("Unauthorized");
        
        await dbConnect();
        const slug = slugify(name, { lower: true, strict: true });
        const newTag = await Hashtag.create({ name, slug });
        return { success: true, hashtag: JSON.parse(JSON.stringify(newTag)) };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function getHashtags() {
    try {
        await dbConnect();
        const hashtags = await Hashtag.find().sort({ name: 1 }).lean();
        return { success: true, hashtags: JSON.parse(JSON.stringify(hashtags)) };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
