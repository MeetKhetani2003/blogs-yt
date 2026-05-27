import Link from 'next/link';
import { ArrowRight, Play, Eye, Code, Award, ChevronRight, Bookmark } from 'lucide-react';
import { INITIAL_ARTICLES } from '@/data/articles';
import Image from 'next/image';
import Newsletter from '@/components/Newsletter';

export default function Home() {
    return (
        <div className="animate-fadeIn">
            {/* SUBTLE BACKDROP AMBIENT GLOW */}
            <div className="absolute top-24 left-1/4 w-[500px] h-[500px] bg-gold-400/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow"></div>
            <div className="absolute top-[80vh] right-1/4 w-[600px] h-[600px] bg-accent-red/5 rounded-full blur-[150px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }}></div>

            {/* HERO HEROIC SECTION */}
            <section className="relative min-h-[80vh] flex items-center px-6 lg:px-20 py-20 lg:py-16 border-b border-gray-100 bg-gradient-to-b from-white to-slate-50/50 overflow-hidden">
                {/* Subtle Grid Pattern Background to fill empty spaces */}
                <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
                
                <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                    {/* LEFT HERO METRICS AND ACTION HEADLINE */}
                    <div className="lg:col-span-7 flex flex-col justify-center space-y-10 order-2 lg:order-1 text-center lg:text-left mt-10 lg:mt-0">
                        {/* Beautiful Editorial Badge */}
                        <div className="inline-flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200/60 w-fit">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
                            </span>
                            <span className="text-[11px] font-bold text-textPrimary tracking-wider uppercase">Simplifying Complex Systems</span>
                        </div>

                        {/* Huge Masterful Typography Headline */}
                        <div className="space-y-6">
                            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] text-textPrimary">
                                Learn Technology{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 via-gold-400 to-accent-red">Like Never Before</span>
                            </h2>
                            <p className="text-lg sm:text-xl text-textSecondary font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                                Discover simplified engineering breakdowns, hands-on tutorials, cutting-edge AI architecture guides, and modern software reviews curated specifically for the modern builder.
                            </p>
                        </div>

                        {/* Elite Call-To-Action buttons with liquid gradient effects */}
                        <div className="flex flex-col sm:flex-row items-center gap-5 pt-2">
                            <Link href="/publications" className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-600 hover:to-amber-600 text-white shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 gold-border-gradient">
                                Explore Publications <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link href="#youtube-showcase" className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold bg-white hover:bg-slate-50 text-textPrimary border border-gray-200 shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2">
                                <Play className="w-5 h-5 text-accent-red fill-accent-red" /> Watch Tutorials
                            </Link>
                        </div>

                        {/* Micro-Social Proof badges */}
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8 pt-8 border-t border-slate-200/60 mt-4">
                            <div>
                                <p className="text-2xl sm:text-3xl font-bold text-textPrimary tracking-tight">1.5M+</p>
                                <p className="text-xs text-textSecondary uppercase tracking-widest font-semibold mt-1">Digital Reach</p>
                            </div>
                            <div className="w-[1px] h-12 bg-gray-200"></div>
                            <div>
                                <p className="text-2xl sm:text-3xl font-bold text-textPrimary tracking-tight">100k+</p>
                                <p className="text-xs text-textSecondary uppercase tracking-widest font-semibold mt-1">Subscribers</p>
                            </div>
                            <div className="w-[1px] h-12 bg-gray-200"></div>
                            <div className="flex -space-x-3">
                                <Image width={40} height={40} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Avatar" />
                                <Image width={40} height={40} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Avatar" />
                                <Image width={40} height={40} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Avatar" />
                                <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm bg-slate-100 flex items-center justify-center text-[11px] font-bold text-textPrimary">+12k</div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT HERO INTERACTIVE FLOATING PORTRAIT & BADGES */}
                    <div className="lg:col-span-5 relative flex justify-center items-center order-1 lg:order-2">
                        {/* Complex Circular Orbit Background Lines */}
                        <div className="hidden sm:block absolute w-[360px] h-[360px] sm:w-[450px] sm:h-[450px] border border-dashed border-slate-200 rounded-full animate-spin" style={{ animationDuration: '40s' }}></div>
                        <div className="hidden sm:block absolute w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] border border-slate-100 rounded-full"></div>

                        {/* Creator Showcase Main Portrait Component */}
                        <div className="relative z-10 w-[260px] h-[360px] sm:w-[310px] sm:h-[430px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-tr from-gold-500 to-amber-300 p-1 group">
                            <div className="w-full h-full rounded-[22px] overflow-hidden bg-slate-900 relative">
                                {/* Custom Avatar Placeholder - Luxury Corporate Stylized Portrait */}
                                <Image
                                    width={310} height={430}
                                    src="/avatar.jpeg"
                                    alt="Technical Rahul Pandey Creator Portrait"
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-95"
                                />

                                {/* Dark Vignette Overlay with textual typography branding */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-6">
                                    <h4 className="text-white text-lg font-bold">Rahul Pandey</h4>
                                    <p className="text-gold-400 text-xs font-medium">Founder & Technical Architect</p>
                                </div>
                            </div>
                        </div>

                        {/* FLOATING SAAS METRICS AND LIVE BADGES ON 3D DEEP HOVER */}
                        <div className="absolute left-0 sm:left-[-10px] top-[10%] sm:top-[15%] z-20 glass-card p-2 sm:p-3 rounded-2xl shadow-xl flex items-center gap-2 sm:gap-3 border border-slate-200/50 animate-float-slow hover:scale-105 transition-transform scale-90 sm:scale-100 origin-left">
                            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-gold-100 flex items-center justify-center text-gold-600">
                                <Eye className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-[9px] sm:text-[10px] uppercase font-bold text-textSecondary tracking-wider">Active Viewers</p>
                                <p className="text-xs sm:text-sm font-bold text-textPrimary flex items-center gap-1.5">
                                    420
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block"></span>
                                </p>
                            </div>
                        </div>

                        <div className="absolute right-0 sm:right-[-15px] bottom-[10%] sm:bottom-[25%] z-20 glass-card p-2 sm:p-3 rounded-2xl shadow-xl flex items-center gap-2 sm:gap-3 border border-slate-200/50 animate-float-medium hover:scale-105 transition-transform scale-90 sm:scale-100 origin-right" style={{ animationDelay: '1s' }}>
                            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-accent-red/10 flex items-center justify-center text-accent-red">
                                <Code className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-[9px] sm:text-[10px] uppercase font-bold text-textSecondary tracking-wider">Simplifications</p>
                                <p className="text-xs sm:text-sm font-bold text-textPrimary">200+ Guides</p>
                            </div>
                        </div>

                        <div className="absolute right-2 sm:right-6 top-0 sm:top-[5%] z-20 bg-slate-900 text-white p-2 sm:p-2.5 rounded-full shadow-lg border border-slate-700 flex items-center justify-center animate-bounce scale-90 sm:scale-100">
                            <Award className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400" />
                        </div>
                    </div>
                </div>
            </section>

            {/* LUXURY INTERACTIVE CATEGORIES */}
            <section className="py-16 bg-white px-6 lg:px-20 border-b border-gray-100">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
                        <div>
                            <p className="text-xs uppercase tracking-widest font-bold text-gold-600 mb-2">Curated Frameworks</p>
                            <h3 className="text-2xl sm:text-3xl font-bold text-textPrimary">Targeted Content Centers</h3>
                        </div>
                        <p className="text-sm text-textSecondary max-w-sm mt-3 md:mt-0">
                            Unlock detailed structured insights divided by strategic development topics. Designed to minimize searching and maximize deep understanding.
                        </p>
                    </div>

                    {/* Category Bento Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Artificial Intelligence", desc: "Quantized Local LLMs, Neural pipelines, prompt systems, and fine-tuning engineering.", count: 24, icon: Code, color: "from-amber-500 to-gold-400" },
                            { title: "Web Architecture", desc: "High-throughput React components, CSS layouts, and modern rendering engines.", count: 18, icon: Code, color: "from-blue-600 to-cyan-400" },
                            { title: "SaaS Dev Tools", desc: "Linear-style UI systems, local terminal environments, and custom database stacks.", count: 15, icon: Code, color: "from-purple-600 to-indigo-500" },
                            { title: "Creator Strategy", desc: "Editorial blueprint, subscriber scale engines, and high-trust platform mechanics.", count: 12, icon: Award, color: "from-emerald-600 to-teal-400" }
                        ].map((cat, idx) => (
                            <Link
                                key={idx}
                                href={`/publications?category=${encodeURIComponent(cat.title)}`}
                                className="group cursor-pointer glass-card p-6 rounded-2xl relative overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 border border-slate-100 hover:border-gold-400/20 block"
                            >
                                <div className={`absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r ${cat.color}`}></div>

                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/50 flex items-center justify-center text-slate-700 group-hover:bg-gold-500 group-hover:text-white transition-all duration-300">
                                        <cat.icon className="w-5 h-5" />
                                    </div>
                                    <span className="text-xs font-bold text-textSecondary bg-slate-100 px-2.5 py-1 rounded-full group-hover:bg-gold-50 group-hover:text-gold-600 transition-colors">
                                        {cat.count} Articles
                                    </span>
                                </div>

                                <h4 className="text-base font-bold text-textPrimary group-hover:text-gold-600 transition-colors">{cat.title}</h4>
                                <p className="text-xs text-textSecondary mt-2 leading-relaxed">{cat.desc}</p>

                                <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-gold-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Browse Library <ChevronRight className="w-3.5 h-3.5" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* EDITORIAL ASYMMETRICAL MAGAZINE GRID */}
            <section className="py-20 bg-slate-50/50 px-6 lg:px-20 border-b border-gray-100">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
                        <div>
                            <p className="text-xs uppercase tracking-widest font-bold text-gold-600 mb-2">Magazine Layout</p>
                            <h3 className="text-2xl sm:text-3xl font-bold text-textPrimary">Featured Technical Insights</h3>
                        </div>
                        <Link
                            href="/publications"
                            className="text-sm font-bold text-gold-600 hover:text-gold-500 flex items-center gap-1 group mt-3 md:mt-0"
                        >
                            View all articles
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Left Column: Big Hero Feature (Col-span 7) */}
                        <div className="lg:col-span-7 flex flex-col justify-between">
                            {INITIAL_ARTICLES.filter(a => a.id === 1).map(hero => (
                                <Link
                                    href={`/publications/${hero.slug}`}
                                    key={hero.id}
                                    className="group cursor-pointer glass-card rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between border border-slate-100 block"
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <Image width={800} height={500} src={hero.coverImage} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" alt={hero.title} />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-slate-900/95 backdrop-blur-md text-white border border-slate-700/50 text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full">
                                                {hero.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-4 text-xs font-semibold text-textSecondary">
                                                <span>{hero.publishDate}</span>
                                                <span>•</span>
                                                <span>{hero.readTime}</span>
                                            </div>
                                            <h4 className="text-2xl sm:text-3xl font-bold text-textPrimary leading-snug group-hover:text-gold-600 transition-colors">
                                                {hero.title}
                                            </h4>
                                            <p className="text-sm text-textSecondary font-normal leading-relaxed">
                                                {hero.excerpt}
                                            </p>
                                        </div>
                                        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Image width={36} height={36} src={hero.author.avatar} className="w-9 h-9 rounded-full border border-gray-100" alt="Rahul Pandey" />
                                                <div>
                                                    <p className="text-xs font-bold text-textPrimary">{hero.author.name}</p>
                                                    <p className="text-[10px] text-textSecondary">{hero.author.role}</p>
                                                </div>
                                            </div>
                                            <span className="text-xs font-bold text-gold-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                                                Read Article <ChevronRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Right Column: 2 Medium Layout Articles (Col-span 5) */}
                        <div className="lg:col-span-5 flex flex-col gap-8">
                            {INITIAL_ARTICLES.filter(a => a.id === 2 || a.id === 3).map(art => (
                                <Link
                                    href={`/publications/${art.slug}`}
                                    key={art.id}
                                    className="group cursor-pointer glass-card rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex-1 flex flex-col justify-between border border-slate-100 block"
                                >
                                    <div className="relative h-44 overflow-hidden">
                                        <Image width={600} height={200} src={art.coverImage} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" alt={art.title} />
                                        <div className="absolute top-3 left-3">
                                            <span className="bg-slate-900/90 text-white text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full">
                                                {art.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col justify-between">
                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center gap-3 text-[11px] font-semibold text-textSecondary">
                                                <span>{art.publishDate}</span>
                                                <span>•</span>
                                                <span>{art.readTime}</span>
                                            </div>
                                            <h5 className="text-lg font-bold text-textPrimary leading-snug group-hover:text-gold-600 transition-colors">
                                                {art.title}
                                            </h5>
                                        </div>
                                        <div className="flex items-center justify-between pt-4 border-t border-slate-100/50">
                                            <div className="flex items-center gap-2">
                                                <Image width={28} height={28} src={art.author.avatar} className="w-7 h-7 rounded-full" alt="Author" />
                                                <span className="text-[11px] font-semibold text-textPrimary">{art.author.name}</span>
                                            </div>
                                            <span className="text-xs font-bold text-gold-600 flex items-center gap-1">
                                                Read <ChevronRight className="w-3.5 h-3.5" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Remaining small articles */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        {INITIAL_ARTICLES.filter(a => a.id > 3 && a.id <= 6).map(art => (
                            <Link
                                href={`/publications/${art.slug}`}
                                key={art.id}
                                className="group cursor-pointer glass-card rounded-2xl p-5 shadow-sm hover:shadow-md transition-all border border-slate-100 flex flex-col justify-between block"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-gold-600 tracking-wider uppercase bg-gold-50 px-2 py-0.5 rounded border border-gold-200/50">
                                            {art.category}
                                        </span>
                                    </div>
                                    <h5 className="text-base font-bold text-textPrimary leading-snug group-hover:text-gold-600 transition-colors">
                                        {art.title}
                                    </h5>
                                    <p className="text-xs text-textSecondary line-clamp-2 leading-relaxed font-normal">
                                        {art.excerpt}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* INFINITE RUNNING SHOWER OF SYSTEM NEWS */}
            <section className="py-6 border-y border-gray-100 bg-slate-900 text-white overflow-hidden relative">
                <div className="flex whitespace-nowrap animate-marquee-infinite">
                    <div className="flex items-center gap-16 text-xs uppercase tracking-widest font-bold text-slate-300 py-2">
                        <span>⚡ TECHNOLOGY SIMPLIFIED FOR EVERYONE</span>
                        <span>🔥 NEXT-GEN REACT ARCHITECTURE OUT NOW</span>
                        <span>💎 SIMPLIFYING LOCAL QUANTIZED AI TOOLS</span>
                        <span>🚀 REDEFINING THE DEVELOPER ECOSYSTEM</span>
                        <span>💡 DETAILED FIRST-PRINCIPLES CODING PATHWAYS</span>
                    </div>
                    <div className="flex items-center gap-16 text-xs uppercase tracking-widest font-bold text-slate-300 py-2">
                        <span>⚡ TECHNOLOGY SIMPLIFIED FOR EVERYONE</span>
                        <span>🔥 NEXT-GEN REACT ARCHITECTURE OUT NOW</span>
                        <span>💎 SIMPLIFYING LOCAL QUANTIZED AI TOOLS</span>
                        <span>🚀 REDEFINING THE DEVELOPER ECOSYSTEM</span>
                        <span>💡 DETAILED FIRST-PRINCIPLES CODING PATHWAYS</span>
                    </div>
                </div>
            </section>

            {/* NETFLIX-STYLE PREMIUM VIDEO INSIGHTS GALLERY */}
            <section id="youtube-showcase" className="py-20 bg-white px-6 lg:px-20 border-b border-gray-100">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
                        <div>
                            <p className="text-xs uppercase tracking-widest font-bold text-accent-red mb-2">Visual Masterclasses</p>
                            <h3 className="text-2xl sm:text-3xl font-bold text-textPrimary">Featured Screen Guides</h3>
                        </div>
                        <p className="text-sm text-textSecondary max-w-sm mt-3 md:mt-0">
                            Visual demonstrations explaining complex computer networks, layout designs, and high-frequency deployment pipelines.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-7 relative group rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-800">
                            <div className="aspect-video w-full h-full relative">
                                <Image
                                    fill
                                    src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80"
                                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                                    alt="PlaySquare featured preview"
                                />

                                <a href="https://youtube.com/@technicalrahulpandey88?si=3A9H5kv1jDVotrpy" target="_blank" rel="noreferrer" className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-20 h-20 rounded-full bg-white text-accent-red flex items-center justify-center shadow-2xl scale-100 group-hover:scale-110 transition-transform duration-300 cursor-pointer">
                                        <Play className="w-8 h-8 fill-accent-red translate-x-0.5" />
                                    </div>
                                </a>

                                <div className="absolute bottom-4 left-6 right-6 flex items-center gap-3">
                                    <span className="text-white text-xs font-bold">12:35</span>
                                    <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                                        <div className="w-1/3 h-full bg-gold-500 rounded-full"></div>
                                    </div>
                                    <span className="text-white/80 text-[10px] font-bold">LIVE METRIC SIMULATION</span>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-5 space-y-6">
                            <div className="space-y-3">
                                <span className="text-xs font-bold text-accent-red flex items-center gap-1">
                                    <Play className="w-4 h-4" /> VIDEO GUIDE SERIES
                                </span>
                                <h4 className="text-xl sm:text-2xl font-bold text-textPrimary leading-snug">
                                    Complete Local Large Language Model Deployment Framework
                                </h4>
                                <p className="text-sm text-textSecondary font-normal leading-relaxed">
                                    Step-by-step visual roadmap breaking down parameters, local quant structures, setting up custom API inference endpoints, and running offline integrations.
                                </p>
                            </div>

                            <div className="space-y-3">
                                {[
                                    { id: "v1", title: "Configuring AWQ Quantization inside Docker Containers", length: "14:20" },
                                    { id: "v2", title: "Building next-generation UI with Container Query Hooks", length: "10:45" },
                                    { id: "v3", title: "Mastering system optimization for high frame rates", length: "18:15" }
                                ].map(item => (
                                    <a
                                        href="https://youtube.com/@technicalrahulpandey88?si=3A9H5kv1jDVotrpy"
                                        target="_blank"
                                        rel="noreferrer"
                                        key={item.id}
                                        className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-gold-300 hover:bg-gold-50/20 cursor-pointer transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-accent-red">
                                                <Play className="w-4 h-4" />
                                            </div>
                                            <span className="text-xs font-bold text-textPrimary max-w-xs truncate">{item.title}</span>
                                        </div>
                                        <span className="text-[10px] text-textSecondary font-semibold">{item.length}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CREATOR IMMERSIVE TIMELINE STORY */}
            <section className="py-20 bg-slate-50/50 px-6 lg:px-20 border-b border-gray-100">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
                        <p className="text-xs uppercase tracking-widest font-bold text-gold-600">The Journey</p>
                        <h3 className="text-2xl sm:text-3xl font-bold text-textPrimary">Deconstructing the Authority</h3>
                        <p className="text-sm text-textSecondary font-normal leading-relaxed">
                            How Rahul Pandey simplified complex computing algorithms to design an inclusive visual creator space for millions of engineers globally.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        <div className="hidden md:block absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-gold-400 via-amber-300 to-transparent z-0"></div>

                        {[
                            { year: "2018", step: "The Technical Genesis", text: "Started creating accessible technical code walk-throughs breaking down computer networks and dynamic memory management models." },
                            { year: "2022", step: "1 Million Community Reach", text: "Scaled visual content distribution frameworks across multiple platforms. Developed actionable simplified structures for real-world setups." },
                            { year: "2026", step: "The Premium Ecosystem", text: "Pioneering high-trust tech architectures, local model developments, and launching digital custom educational studios." }
                        ].map((milestone, index) => (
                            <div
                                key={index}
                                className="glass-card p-6 rounded-2xl border border-slate-100 shadow-sm relative z-10 hover:shadow-lg hover:-translate-y-1 transition-all"
                            >
                                <span className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-accent-red inline-block mb-3">
                                    {milestone.year}
                                </span>
                                <h5 className="text-base font-bold text-textPrimary mb-2">{milestone.step}</h5>
                                <p className="text-xs text-textSecondary leading-relaxed font-normal">{milestone.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Newsletter />
        </div>
    );
}
