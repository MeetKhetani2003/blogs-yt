"use server";

import dbConnect from "@/lib/db";
import { Category } from "@/models/Category";
import slugify from "slugify";
import { auth } from "@/auth";

export async function createCategory(data: { name: string, description?: string, thumbnail?: string }) {
    try {
        const session = await auth();
        if (!session || session.user?.role !== 'ADMIN') throw new Error("Unauthorized");
        
        await dbConnect();
        const slug = slugify(data.name, { lower: true, strict: true });
        const newCategory = await Category.create({ ...data, slug });
        return { success: true, category: JSON.parse(JSON.stringify(newCategory)) };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function getCategories() {
    try {
        await dbConnect();
        const categories = await Category.find().sort({ name: 1 }).lean();
        return { success: true, categories: JSON.parse(JSON.stringify(categories)) };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
