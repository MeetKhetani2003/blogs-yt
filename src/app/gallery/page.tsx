import React from 'react';
import dbConnect from '@/lib/db';
import { GalleryImage } from '@/models/GalleryImage';

export const metadata = {
    title: 'Image Gallery | Technical Rahul',
    description: 'A visual showcase of our engineering architecture, technical diagrams, and tech event moments.',
};

export default async function GalleryPage() {
    await dbConnect();
    const images = await GalleryImage.find().sort({ createdAt: -1 }).lean();

    return (
        <main className="min-h-screen bg-slate-50 py-20 px-6 lg:px-20 animate-fadeIn">
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl font-serif font-bold text-textPrimary tracking-tight">Visual <span className="text-gold-500">Gallery</span></h1>
                    <p className="text-textSecondary leading-relaxed">High-fidelity engineering diagrams, workflow schematics, and behind-the-scenes moments from our studio.</p>
                </div>

                {images.length === 0 ? (
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
                )}
            </div>
        </main>
    );
}
