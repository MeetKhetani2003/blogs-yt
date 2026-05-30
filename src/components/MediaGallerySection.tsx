"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, Image as ImageIcon, PlaySquare } from 'lucide-react';
import Link from 'next/link';

export default function MediaGallerySection({ images, videos }: { images: any[], videos: any[] }) {
    const [activeTab, setActiveTab] = useState<'images' | 'videos'>('images');

    // Take only the top 6 for the home page section
    const displayImages = images.slice(0, 6);
    const displayVideos = videos.slice(0, 6);

    return (
        <section className="py-20 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 lg:px-20">
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 text-center md:text-left gap-6">
                    <div>
                        <p className="text-xs uppercase tracking-widest font-bold text-accent-red mb-2">Inside The Studio</p>
                        <h3 className="text-2xl sm:text-3xl font-bold text-textPrimary">Media & Masterclasses</h3>
                    </div>
                    
                    <div className="bg-slate-50 p-1.5 rounded-2xl border border-slate-200 shadow-sm inline-flex gap-2">
                        <button
                            onClick={() => setActiveTab('images')}
                            className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                                activeTab === 'images' 
                                    ? 'bg-gold-500 text-slate-900 shadow-md' 
                                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                            }`}
                        >
                            <ImageIcon className="w-4 h-4" /> Images
                        </button>
                        <button
                            onClick={() => setActiveTab('videos')}
                            className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                                activeTab === 'videos' 
                                    ? 'bg-accent-red text-white shadow-md' 
                                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                            }`}
                        >
                            <Play className="w-4 h-4" /> YouTube Media
                        </button>
                    </div>
                </div>

                {activeTab === 'images' && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-max mb-10">
                        {displayImages.map((img: any) => (
                            <div key={img._id} className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group bg-slate-200 aspect-square md:aspect-video">
                                <Image 
                                    fill
                                    src={img.url} 
                                    alt={img.title} 
                                    sizes="(max-width: 768px) 50vw, 33vw"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                    <h3 className="text-white font-bold text-sm truncate">{img.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'videos' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                        {displayVideos.map((vid: any) => (
                            <a 
                                key={vid._id} 
                                href={vid.url} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group bg-slate-900 block aspect-video"
                            >
                                <Image 
                                    fill
                                    src={vid.thumbnail} 
                                    alt={vid.title} 
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                )}

                <div className="flex justify-center mt-12">
                    <a 
                        href="https://youtube.com/@technicalrahulpandey88?si=3A9H5kv1jDVotrpy" 
                        target="_blank" 
                        rel="noreferrer"
                        className="px-8 py-4 rounded-xl text-base font-bold bg-slate-900 hover:bg-accent-red text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 border border-slate-800"
                    >
                        <PlaySquare className="w-6 h-6" /> Subscribe to our YouTube Channel
                    </a>
                </div>
            </div>
        </section>
    );
}
