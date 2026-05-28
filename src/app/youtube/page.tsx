import React from 'react';
import dbConnect from '@/lib/db';
import { YoutubeVideo } from '@/models/YoutubeVideo';
import Link from 'next/link';
import { Play, ExternalLink } from 'lucide-react';

export const metadata = {
    title: 'YouTube Gallery | Technical Rahul',
    description: 'Explore the latest engineering breakdowns, tutorials, and tech reviews.',
};

export default async function YoutubePage() {
    await dbConnect();
    const videos = await YoutubeVideo.find().sort({ createdAt: -1 }).lean();

    return (
        <main className="min-h-screen bg-slate-50 py-20 px-6 lg:px-20 animate-fadeIn">
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl font-serif font-bold text-textPrimary tracking-tight">Tech Vault <span className="text-red-500">Visualized</span></h1>
                    <p className="text-textSecondary leading-relaxed">Deep-dive technical tutorials, architectural breakdowns, and hands-on coding sessions curated from our official channel.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videos.map((video: any) => (
                        <div key={video._id} className="group flex flex-col glass-card rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500">
                            <div className="relative aspect-video overflow-hidden">
                                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 opacity-80 group-hover:opacity-100 transition-opacity">
                                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform shadow-red-500/50 pl-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                        <Play className="w-5 h-5 fill-white" />
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-1 bg-white">
                                <h3 className="font-bold text-lg text-textPrimary leading-snug line-clamp-2 mb-4 group-hover:text-red-600 transition-colors">
                                    {video.title}
                                </h3>
                                <div className="mt-auto flex items-center justify-between">
                                    <Link href={`/youtube/${video.slug}`} className="text-sm font-bold text-textPrimary hover:text-gold-500 transition-colors flex items-center gap-1">
                                        Watch Details
                                    </Link>
                                    <a href={video.url} target="_blank" rel="noreferrer" className="text-sm font-bold text-red-500 hover:text-red-600 transition-colors flex items-center gap-1">
                                        <ExternalLink className="w-4 h-4" /> YouTube
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
