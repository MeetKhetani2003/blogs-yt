"use server";

import { revalidatePath } from 'next/cache';
import dbConnect from '@/lib/db';
import { User } from '@/models/User';
import { auth } from '@/auth';

export async function updateProfile(formData: FormData) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return { error: 'Unauthorized' };
        }

        const userId = formData.get('userId') as string;
        if (session.user.id !== userId) {
            return { error: 'Unauthorized to edit this profile' };
        }

        const name = formData.get('name') as string;
        const bio = formData.get('bio') as string;
        const image = formData.get('image') as string;
        const coverImage = formData.get('coverImage') as string;

        if (!name || name.trim() === '') {
            return { error: 'Display name is required' };
        }

        await dbConnect();

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, bio, image, coverImage },
            { new: true }
        );

        if (!updatedUser) {
            return { error: 'User not found' };
        }

        // Revalidate the user's profile page
        revalidatePath(`/u/${updatedUser.username}`);

        return { success: true };
    } catch (error: any) {
        console.error("Profile update error:", error);
        return { error: 'Failed to update profile' };
    }
}

export async function saveBlogAction(blogId: string) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return { error: 'You must be logged in to save blogs' };
        }

        await dbConnect();
        const user = await User.findById(session.user.id);
        
        if (!user) {
            return { error: 'User not found' };
        }

        const hasSaved = user.savedBlogs.includes(blogId);
        
        if (hasSaved) {
            user.savedBlogs = user.savedBlogs.filter((id: string) => id !== blogId);
        } else {
            user.savedBlogs.push(blogId);
        }

        await user.save();
        
        // Revalidate both the current blog path and the user's profile path
        revalidatePath(`/publications/${blogId}`);
        revalidatePath(`/u/${session.user.username}`);

        return { success: true, isSaved: !hasSaved };
    } catch (error: any) {
        console.error("Save blog error:", error);
        return { error: 'Failed to perform action' };
    }
}
