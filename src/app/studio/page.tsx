import React from 'react';
import mongoose from 'mongoose';
import { Activity, Percent, Users, Zap, Database, HardDrive, FileText, Settings, RefreshCw } from 'lucide-react';
import dbConnect from '@/lib/db';
import { Blog } from '@/models/Blog';
import { User } from '@/models/User';
import { Comment } from '@/models/Comment';
import { GalleryImage } from '@/models/GalleryImage';

export default async function StudioDashboard() {
    await dbConnect();
    
    const [totalBlogs, totalUsers, pendingComments, mediaCount] = await Promise.all([
        Blog.countDocuments(),
        User.countDocuments(),
        Comment.countDocuments({ status: 'PENDING' }),
        GalleryImage.countDocuments()
    ]);

    // Calculate views
    const allBlogs = await Blog.find().select('views').lean();
    const totalViews = allBlogs.reduce((acc, curr) => acc + (curr.views || 0), 0);

    // GridFS storage monitor logic removed as requested

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8 animate-fadeIn w-full flex-grow">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-6 mt-4">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-textPrimary">Studio Dashboard</h2>
                    <p className="text-xs text-textSecondary font-medium">Control panel and real-time CMS analytics</p>
                </div>
            </div>

            {/* METRICS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-[10px] uppercase font-bold text-textSecondary tracking-wider">Total Publications</p>
                        <p className="text-xl sm:text-2xl font-bold text-textPrimary">{totalBlogs}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-gold-500">
                        <FileText className="w-5 h-5" />
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-[10px] uppercase font-bold text-textSecondary tracking-wider">Total Pageviews</p>
                        <p className="text-xl sm:text-2xl font-bold text-textPrimary">{totalViews.toLocaleString()}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-blue-500">
                        <Activity className="w-5 h-5" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-[10px] uppercase font-bold text-textSecondary tracking-wider">Registered Users</p>
                        <p className="text-xl sm:text-2xl font-bold text-textPrimary">{totalUsers.toLocaleString()}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-emerald-500">
                        <Users className="w-5 h-5" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-[10px] uppercase font-bold text-textSecondary tracking-wider">Pending Comments</p>
                        <p className="text-xl sm:text-2xl font-bold text-textPrimary">{pendingComments}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-rose-500">
                        <Zap className="w-5 h-5" />
                    </div>
                </div>
            </div>

            {/* STORAGE RESOURCE MONITOR REMOVED */}
        </div>
    );
}
