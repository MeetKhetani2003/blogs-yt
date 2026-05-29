"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, Image as ImageIcon } from 'lucide-react';

export default function GalleryClient({ images, videos }: { images: any[], videos: any[] }) {
    const [activeTab, setActiveTab] = useState<'images' | 'videos'>('images');

    return (
        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
            {/* SUBTLE BACKDROP AMBIENT GLOW (Since this is a client component, adding it in the wrapper) */}
            <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-gold-400/10 rounded-full blur-[100px] pointer-events-none animate-pulse-glow -z-10"></div>
            <div className="absolute top-20 left-1/4 w-[300px] h-[300px] bg-accent-red/5 rounded-full blur-[80px] pointer-events-none animate-pulse-glow -z-10" style={{ animationDelay: '2s' }}></div>

            <div className="text-center space-y-6 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200/60 w-fit mx-auto shadow-sm">
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
                    </span>
                    <span className="text-[11px] font-bold text-slate-800 tracking-wider uppercase">Visual Gallery</span>
                </div>
                <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1]">
                    The <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-amber-500">Exhibition</span>
                </h1>
                <p className="text-lg text-slate-600 font-medium leading-relaxed">
                    High-fidelity engineering diagrams, workflow schematics, and behind-the-scenes moments from our studio.
                </p>
            </div>

            {/* Switch / Tabs */}
            <div className="flex justify-center">
                <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm inline-flex gap-2">
                    <button
                        onClick={() => setActiveTab('images')}
                        className={`px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
                            activeTab === 'images' 
                                ? 'bg-gold-500 text-slate-900 shadow-md' 
                                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                    >
                        <ImageIcon className="w-4 h-4" /> Media Images
                    </button>
                    <button
                        onClick={() => setActiveTab('videos')}
                        className={`px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
                            activeTab === 'videos' 
                                ? 'bg-accent-red text-white shadow-md' 
                                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                    >
                        <Play className="w-4 h-4" /> YouTube Media
                    </button>
                </div>
            </div>

            {/* Gallery Grid */}
            {activeTab === 'images' && (
                images.length === 0 ? (
                    <div className="py-20 text-center text-slate-400">
                        <p>No images uploaded yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-max">
                        {images.map((img: any) => (
                            <div key={img._id} className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group bg-slate-200">
                                <img 
                                    src={img.url} 
                                    alt={img.title} 
                                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                    <h3 className="text-white font-bold text-sm truncate">{img.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            )}

            {activeTab === 'videos' && (
                videos.length === 0 ? (
                    <div className="py-20 text-center text-slate-400">
                        <p>No videos available yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {videos.map((vid: any) => (
                            <a 
                                key={vid._id} 
                                href={vid.url} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group bg-slate-900 block aspect-video"
                            >
                                <img 
                                    src={vid.thumbnail} 
                                    alt={vid.title} 
                                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-14 h-14 rounded-full bg-white text-accent-red flex items-center justify-center shadow-2xl scale-100 group-hover:scale-110 transition-transform duration-300">
                                        <Play className="w-6 h-6 fill-accent-red translate-x-0.5" />
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                    <h3 className="text-white font-bold text-sm line-clamp-2">{vid.title}</h3>
                                </div>
                            </a>
                        ))}
                    </div>
                )
            )}
        </div>
    );
}
