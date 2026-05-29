"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function FeaturedBlogs({ blogs }: { blogs: any[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!blogs || blogs.length === 0) return null;

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === blogs.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? blogs.length - 1 : prev - 1));
    };

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(timer);
    }, [blogs.length]);

    return (
        <section className="py-16 bg-slate-50 border-b border-gray-100 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-20">
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <p className="text-xs uppercase tracking-widest font-bold text-gold-600 mb-2">Highlights</p>
                        <h3 className="text-2xl sm:text-3xl font-bold text-textPrimary">Featured Publications</h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={prevSlide} className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm">
                            <ChevronLeft className="w-5 h-5 text-textSecondary" />
                        </button>
                        <button onClick={nextSlide} className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm">
                            <ChevronRight className="w-5 h-5 text-textSecondary" />
                        </button>
                    </div>
                </div>

                <div className="relative w-full overflow-hidden">
                    <div 
                        className="flex transition-transform duration-500 ease-in-out gap-6"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {blogs.map((blog) => (
                            <div key={blog._id} className="min-w-full md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)]">
                                <Link
                                    href={`/publications/${blog.slug}`}
                                    className="group cursor-pointer glass-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 block bg-white h-full border border-slate-100"
                                >
                                    <div className="relative aspect-video overflow-hidden">
                                        <Image 
                                            width={600} 
                                            height={340} 
                                            src={blog.heroImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                            alt={blog.title} 
                                        />
                                        <div className="absolute top-3 left-3">
                                            <span className="bg-slate-900/90 text-white text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full">
                                                {blog.category?.name || 'Technology'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-5 space-y-3">
                                        <div className="flex items-center text-[11px] font-semibold text-textSecondary">
                                            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                            <span className="mx-2">•</span>
                                            <span>{blog.readTime || '5 min read'}</span>
                                        </div>
                                        <h4 className="text-lg font-bold text-textPrimary leading-snug group-hover:text-gold-600 transition-colors line-clamp-2">
                                            {blog.title}
                                        </h4>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
