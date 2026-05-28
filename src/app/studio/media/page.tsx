"use client";

import React, { useState } from 'react';
import { Upload, ImageIcon, File as FileIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function MediaLibraryPage() {
    const [images, setImages] = useState<any[]>([]); // Need an API to fetch them
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        
        setUploading(true);
        toast.loading('Uploading media...', { id: 'media-upload' });

        for (let i = 0; i < files.length; i++) {
            const formData = new FormData();
            formData.append('file', files[i]);
            try {
                const res = await fetch('/api/media/upload', { method: 'POST', body: formData });
                const data = await res.json();
                if (data.success) {
                    setImages(prev => [data.image, ...prev]);
                }
            } catch (error) {
                console.error("Upload failed", error);
            }
        }

        toast.success('Media uploaded!', { id: 'media-upload' });
        setUploading(false);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-textPrimary">Media Library</h1>
                    <p className="text-xs text-textSecondary">Manage your GridFS optimized assets.</p>
                </div>
                
                <label className="px-4 py-2 bg-slate-900 text-white font-bold rounded-xl text-sm flex items-center gap-2 hover:bg-gold-500 hover:text-slate-900 transition-colors shadow-sm cursor-pointer">
                    <Upload className="w-4 h-4" /> 
                    {uploading ? 'Uploading...' : 'Upload Media'}
                    <input type="file" multiple accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
                </label>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                {images.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                        <ImageIcon className="w-16 h-16 mb-4 opacity-20" />
                        <p className="text-sm font-semibold">No media uploaded yet.</p>
                        <p className="text-xs mt-1">Upload images to see them here.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {images.map(img => (
                            <div key={img._id} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 group bg-slate-50">
                                <img src={img.url} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                                    <p className="text-[10px] text-white font-bold truncate">{img.title}</p>
                                    <p className="text-[9px] text-slate-300">{(img.sizeBytes / 1024).toFixed(1)} KB</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
