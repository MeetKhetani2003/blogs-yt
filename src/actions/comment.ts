"use server";

import dbConnect from "@/lib/db";
import { Comment } from "@/models/Comment";
import { User } from "@/models/User";
import { Blog } from "@/models/Blog";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
// import { sendEmail } from "@/lib/email"; // To be updated after checking email.ts

import { sendNotificationEmail } from "@/lib/email";

export async function addComment(blogId: string, content: string, parentCommentId?: string, recaptchaToken?: string) {
    try {
        const session = await auth();
        if (!session) throw new Error("Must be logged in to comment.");

        // Verify reCAPTCHA
        if (recaptchaToken) {
            const verifyRes = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`
            });
            const verifyData = await verifyRes.json();
            if (!verifyData.success) {
                throw new Error("reCAPTCHA verification failed");
            }
        }

        await dbConnect();
        const newComment = await Comment.create({
            blog: blogId,
            user: session.user.id,
            parentComment: parentCommentId || undefined,
            content,
            status: 'APPROVED', // Auto-approve for working comment section
        });

        // Send email to admin
        if (process.env.ADMIN_EMAIL) {
            await sendNotificationEmail(
                [process.env.ADMIN_EMAIL], 
                'New Comment posted', 
                `<p>A new comment was posted by <b>${session.user.name}</b>:</p><p>"${content}"</p><p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/studio/comments">View here</a></p>`
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
        const query: any = blogId ? { blog: blogId, status: 'APPROVED' } : {};
        const comments = await Comment.find(query)
            .populate('user', 'name image username')
            .populate('blog', 'title slug')
            .sort({ isPinned: -1, createdAt: -1 })
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

export async function likeComment(commentId: string) {
    try {
        const session = await auth();
        if (!session) throw new Error("Must be logged in to like.");

        await dbConnect();
        const comment = await Comment.findById(commentId);
        if (!comment) throw new Error("Comment not found");

        const userId = session.user.id;
        const index = comment.likes.indexOf(userId as any);
        if (index > -1) {
            comment.likes.splice(index, 1);
        } else {
            comment.likes.push(userId as any);
        }
        await comment.save();

        return { success: true, likes: comment.likes.length };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function pinComment(commentId: string, isPinned: boolean) {
    try {
        const session = await auth();
        if (!session || session.user?.role !== 'ADMIN') throw new Error("Unauthorized");

        await dbConnect();
        await Comment.findByIdAndUpdate(commentId, { isPinned });
        
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
