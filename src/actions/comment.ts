"use server";

import dbConnect from "@/lib/db";
import { Comment } from "@/models/Comment";
import { User } from "@/models/User";
import { Blog } from "@/models/Blog";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
// import { sendEmail } from "@/lib/email"; // To be updated after checking email.ts

import { sendNotificationEmail } from "@/lib/email";

export async function addComment(blogId: string, content: string) {
    try {
        const session = await auth();
        if (!session) throw new Error("Must be logged in to comment.");

        await dbConnect();
        const newComment = await Comment.create({
            blog: blogId,
            user: session.user.id,
            content,
            status: 'PENDING', // Require moderation
        });

        // Send email to admin
        if (process.env.ADMIN_EMAIL) {
            await sendNotificationEmail(
                [process.env.ADMIN_EMAIL], 
                'New Comment pending moderation', 
                `<p>A new comment was posted by <b>${session.user.name}</b>:</p><p>"${content}"</p><p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/studio/comments">Moderate here</a></p>`
            );
        }

        return { success: true, comment: JSON.parse(JSON.stringify(newComment)) };

    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function getComments(blogId?: string) {
    try {
        await dbConnect();
        const query = blogId ? { blog: blogId, status: 'APPROVED' } : {};
        const comments = await Comment.find(query)
            .populate('user', 'name image username')
            .populate('blog', 'title slug')
            .sort({ createdAt: -1 })
            .lean();
        
        return { success: true, comments: JSON.parse(JSON.stringify(comments)) };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function moderateComment(commentId: string, status: 'APPROVED' | 'REJECTED') {
    try {
        const session = await auth();
        if (!session || session.user?.role !== 'ADMIN') throw new Error("Unauthorized");

        await dbConnect();
        const comment = await Comment.findByIdAndUpdate(commentId, { status }, { new: true }).populate('blog', 'slug');
        
        if (comment) {
            revalidatePath(`/publications/${(comment.blog as any).slug}`);
        }
        
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
