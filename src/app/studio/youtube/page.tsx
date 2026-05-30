"use client";

import React, { useEffect, useState } from 'react';
import { getYoutubeVideos, addYoutubeVideo, deleteYoutubeVideo } from '@/actions/youtube';
import { toast } from 'sonner';
import { Video as Youtube, Plus, Play, ExternalLink, Trash2 } from 'lucide-react';

export default function YoutubeStudioPage() {
    const [videos, setVideos] = useState<any[]>([]);
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchVideos = async () => {
        const res = await getYoutubeVideos();
        if (res.success) setVideos(res.videos);
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;
        setLoading(true);
        const res = await addYoutubeVideo({ url });
        setLoading(false);
        if (res.success) {
            toast.success("Video added!");
            setUrl('');
            fetchVideos();
        } else {
            toast.error(res.error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this video?')) return;
        toast.loading('Deleting...', { id: 'yt-delete' });
        const res = await deleteYoutubeVideo(id);
        if (res.success) {
            toast.success('Video deleted', { id: 'yt-delete' });
            setVideos(videos.filter(v => v._id !== id));
        } else {
            toast.error(res.error, { id: 'yt-delete' });
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6 animate-fadeIn">
            <div>
                <h1 className="text-2xl font-bold text-textPrimary">YouTube Gallery</h1>
                <p className="text-xs text-textSecondary">Manage your tech engineering videos.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-textPrimary font-bold pb-2 border-b border-slate-100">
                    <Youtube className="w-5 h-5 text-red-500" />
                    Add New Video
                </div>
                
                <form onSubmit={handleAdd} className="flex gap-2">
                    <input 
                        type="url" 
                        value={url} 
                        onChange={e => setUrl(e.target.value)} 
                        placeholder="https://youtube.com/watch?v=..." 
                        className="p-3 border border-slate-200 rounded-lg text-sm flex-1 bg-slate-50 focus:bg-white focus:outline-none focus:border-red-400" 
                        required 
                    />
                    <button type="submit" disabled={loading} className="bg-slate-900 text-white font-bold px-6 rounded-lg text-sm flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors disabled:opacity-50">
                        {loading ? 'Adding...' : <><Plus className="w-4 h-4 mr-2" /> Add Video</>}
                    </button>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {videos.map(video => (
                    <div key={video._id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                        <div className="relative aspect-video">
                            <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <a href={video.url} target="_blank" rel="noreferrer" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white pl-1">
                                    <Play className="w-4 h-4" />
                                </a>
                                <button onClick={() => handleDelete(video._id)} className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div className="p-4 space-y-1">
                            <h3 className="font-bold text-sm text-textPrimary line-clamp-2" title={video.title}>{video.title}</h3>
                            <a href={video.url} target="_blank" rel="noreferrer" className="text-[10px] text-slate-400 hover:text-red-500 flex items-center gap-1">
                                <ExternalLink className="w-3 h-3" /> View on YouTube
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
