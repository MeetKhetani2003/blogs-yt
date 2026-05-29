"use client";

import { useState, useMemo, useEffect } from 'react';
import { getBlogs } from '@/actions/blog';
import { Search, X, FolderOpen, Bookmark, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const categories = ["All", "Artificial Intelligence", "Web Development", "React Architecture", "Productivity", "Creator Economy"];

export default function PublicationsDirectory() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [articles, setArticles] = useState<any[]>([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            const cat = urlParams.get('category');
            if (cat && categories.includes(cat)) {
                setSelectedCategory(cat);
            }
        }
        async function fetchArticles() {
            try {
                const res = await getBlogs(1, 100, { status: 'PUBLISHED' });
                console.log("getBlogs response:", res);
                if (res.success) {
                    const formatted = res.blogs.map((b: any) => ({
                        id: b._id,
                        slug: b.slug,
                        title: b.title,
                        excerpt: b.excerpt || '',
                        category: b.category?.name || 'Technology',
                        readTime: b.readTime || '5 min read',
                        publishDate: new Date(b.createdAt).toLocaleDateString(),
                        coverImage: b.heroImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
                        author: {
                            name: 'Rahul Pandey',
                            avatar: '/logo.png'
                        }
                    }));
                    setArticles(formatted);
                } else {
                    console.error("Failed to fetch blogs:", res.error);
                }
            } catch (err) {
                console.error("Error calling getBlogs:", err);
            }
        }
        fetchArticles();
    }, []);

    const filteredArticles = useMemo(() => {
        return articles.filter(art => {
            const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory, articles]);

    const toggleBookmark = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        alert("Bookmark feature requires authentication");
    };

    return (
        <div className="relative py-16 lg:py-24 bg-slate-50 min-h-[85vh] px-6 lg:px-20 animate-fadeIn w-full flex-grow overflow-hidden">
            {/* SUBTLE BACKDROP AMBIENT GLOW */}
            <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-gold-400/10 rounded-full blur-[100px] pointer-events-none animate-pulse-glow"></div>
            <div className="absolute top-20 left-1/4 w-[300px] h-[300px] bg-accent-red/5 rounded-full blur-[80px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
            
            <div className="max-w-7xl mx-auto w-full space-y-12 relative z-10">

                {/* Header Info */}
                <div className="text-center space-y-6 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200/60 w-fit mx-auto shadow-sm">
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
                        </span>
                        <span className="text-[11px] font-bold text-slate-800 tracking-wider uppercase">The Directory</span>
                    </div>
                    <h2 className="text-4xl sm:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1]">
                        Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-amber-500">Publications</span>
                    </h2>
                    <p className="text-lg text-slate-600 font-medium leading-relaxed">
                        Search and filter our complete technical collection of simplified tutorials and architectural insights in real time.
                    </p>
                </div>

                {/* STICKY SEARCH BAR & CATEGORY SELECTOR */}
                <div className="glass-card p-4 rounded-2xl border border-slate-100 shadow-sm space-y-4 md:space-y-0 md:flex md:items-center md:gap-4 justify-between sticky top-[92px] z-30">
                    {/* Left Side: Input filter */}
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-textSecondary" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by keyword, tag, or topic..."
                            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-textPrimary placeholder:text-textSecondary focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all"
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary hover:text-textPrimary">
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Right Side: Horizontal category scroll */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none max-w-full">
                        {categories.map((cat, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${selectedCategory === cat ? 'bg-gold-500 text-slate-950 shadow-md' : 'bg-white hover:bg-slate-100 text-textSecondary border border-slate-200/60'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* SEARCH RESULTS METRICS */}
                <div className="flex items-center justify-between text-xs text-textSecondary">
                    <span>Showing <strong className="text-textPrimary font-semibold">{filteredArticles.length}</strong> publications</span>
                    {selectedCategory !== 'All' && (
                        <button
                            onClick={() => setSelectedCategory('All')}
                            className="text-gold-600 hover:text-gold-500 font-bold"
                        >
                            Clear Category Filter
                        </button>
                    )}
                </div>

                {/* ARTICLES ARCHITECTURE LIST GRID */}
                {filteredArticles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredArticles.map(art => (
                            <Link
                                href={`/publications/${art.slug}`}
                                key={art.id}
                                className="group cursor-pointer glass-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-slate-100 flex flex-col justify-between"
                            >
                                <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                                    <Image
                                        fill
                                        src={art.coverImage}
                                        alt={art.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute top-3 left-3">
                                        <span className="bg-slate-900/90 text-white text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full">
                                            {art.category}
                                        </span>
                                    </div>
                                    <button
                                        onClick={(e) => toggleBookmark(art.id, e)}
                                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-textSecondary hover:text-gold-500 shadow transition-colors z-10"
                                    >
                                        <Bookmark className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-[10px] font-semibold text-textSecondary">
                                            <span>{art.publishDate}</span>
                                            <span>•</span>
                                            <span>{art.readTime}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-textPrimary leading-snug group-hover:text-gold-600 transition-colors line-clamp-2">
                                            {art.title}
                                        </h3>
                                        <p className="text-xs text-textSecondary font-normal leading-relaxed line-clamp-3">
                                            {art.excerpt}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-6">
                                        <div className="flex items-center gap-2 relative">
                                            <div className="relative w-6 h-6 rounded-full overflow-hidden">
                                                <Image fill src={art.author.avatar} alt="Author" className="object-cover" />
                                            </div>
                                            <span className="text-[11px] font-semibold text-textPrimary">{art.author.name}</span>
                                        </div>
                                        <span className="text-xs font-bold text-gold-600 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                                            Read Guide <ChevronRight className="w-3.5 h-3.5" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 space-y-4 shadow-sm">
                        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto text-slate-400">
                            <FolderOpen className="w-8 h-8" />
                        </div>
                        <h4 className="text-base font-bold text-textPrimary">No results found for your search</h4>
                        <p className="text-xs text-textSecondary max-w-sm mx-auto">
                            Try double-checking the spelling or toggle categories to browse general simplifications instead.
                        </p>
                        <button
                            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                            className="bg-gold-500 hover:bg-gold-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-all"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
