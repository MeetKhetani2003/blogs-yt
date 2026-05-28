import React from 'react';
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

    // Mock storage metrics for MongoDB
    const storageUsedMB = (mediaCount * 0.5).toFixed(1); // Rough estimate 500KB per image
    const storageLimitMB = 512; // Free tier
    const storagePercent = (parseFloat(storageUsedMB) / storageLimitMB) * 100;

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

            {/* STORAGE RESOURCE MONITOR */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <HardDrive className="w-5 h-5 text-slate-500" />
                    <h3 className="text-lg font-bold text-textPrimary">GridFS Storage Monitor</h3>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold text-slate-600">Storage Used</span>
                        <span className="font-bold text-textPrimary">{storageUsedMB} MB / {storageLimitMB} MB</span>
                    </div>
                    
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                            className={`h-full rounded-full transition-all duration-1000 ${storagePercent > 90 ? 'bg-red-500' : storagePercent > 70 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                            style={{ width: `${Math.min(storagePercent, 100)}%` }}
                        ></div>
                    </div>

                    {storagePercent > 90 && (
                        <div className="p-4 bg-red-50 text-red-700 text-sm font-semibold rounded-xl border border-red-100 flex items-start gap-3">
                            <Database className="w-5 h-5 shrink-0" />
                            <p>CRITICAL ALERT: Database storage is exceeding 90% capacity. Please remove unused media or upgrade your MongoDB cluster tier.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
