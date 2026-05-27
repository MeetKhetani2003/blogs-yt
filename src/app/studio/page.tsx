"use client";

import React, { useState } from 'react';
import { RefreshCw, Activity, Percent, Users, Zap, Edit3, Send } from 'lucide-react';
import Image from 'next/image';

export default function Studio() {
    const [metrics] = useState({
        totalViews: 1245089,
        readRatio: 68.4,
        subscribers: 14205,
        activeReaders: 342
    });

    const [editorTitle, setEditorTitle] = useState('');
    const [editorCategory, setEditorCategory] = useState('Artificial Intelligence');
    const [editorReadTime, setEditorReadTime] = useState('');
    const [editorCoverImage, setEditorCoverImage] = useState('');
    const [editorExcerpt, setEditorExcerpt] = useState('');
    const [editorBody, setEditorBody] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handlePublishBlog = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            alert("Draft saved and compiled to workspace successfully!");
        }, 1500);
    };

    return (
        <div className="bg-slate-50 min-h-[90vh] py-10 px-6 lg:px-20 animate-fadeIn w-full flex-grow">
            <div className="max-w-7xl mx-auto w-full space-y-8">
                
                {/* Workspace Title & Live stats overview bar */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-6 mt-12">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <p className="text-xs uppercase tracking-widest font-bold text-emerald-600">Platform Studio</p>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-textPrimary">Creator Workspace</h2>
                        <p className="text-xs text-textSecondary font-medium">Control panel and real-time editorial draft studio</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => alert("Analytics database refreshed!")}
                            className="bg-white hover:bg-slate-50 border border-slate-200 text-textPrimary font-bold p-2.5 rounded-xl shadow-sm text-xs flex items-center gap-1.5 transition-colors"
                        >
                            <RefreshCw className="w-4 h-4" /> Synchronize Data
                        </button>
                    </div>
                </div>

                {/* INTERACTIVE METRICS GRID ROW */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="glass-card p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="text-[10px] uppercase font-bold text-textSecondary tracking-wider">Digital Pageviews</p>
                            <p className="text-xl sm:text-2xl font-bold text-textPrimary">{metrics.totalViews.toLocaleString()}</p>
                            <p className="text-[10px] text-emerald-600 font-semibold">Last 30 days summary</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-amber-500">
                            <Activity className="w-5 h-5" />
                        </div>
                    </div>
                    
                    <div className="glass-card p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="text-[10px] uppercase font-bold text-textSecondary tracking-wider">Average Read Ratio</p>
                            <p className="text-xl sm:text-2xl font-bold text-textPrimary">{metrics.readRatio}%</p>
                            <p className="text-[10px] text-emerald-600 font-semibold">High editorial benchmark</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-blue-500">
                            <Percent className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="glass-card p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="text-[10px] uppercase font-bold text-textSecondary tracking-wider">Subscribers Club</p>
                            <p className="text-xl sm:text-2xl font-bold text-textPrimary">{metrics.subscribers.toLocaleString()}</p>
                            <p className="text-[10px] text-emerald-600 font-semibold">Verified global audience</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-emerald-500">
                            <Users className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="glass-card p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="text-[10px] uppercase font-bold text-textSecondary tracking-wider">Active Readers Now</p>
                            <p className="text-xl sm:text-2xl font-bold text-textPrimary">{metrics.activeReaders}</p>
                            <p className="text-[10px] text-emerald-600 font-semibold">Live metric estimation</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-rose-500">
                            <Zap className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* LIVE SVG ANALYTICS GRAPH */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="text-sm font-bold text-textPrimary">Readership Expansion Traffic</h4>
                            <p className="text-[10px] text-textSecondary">Real-time dynamic traffic routing vectors</p>
                        </div>
                        <div className="flex items-center gap-3 text-[10px] font-bold text-textSecondary">
                            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-gold-400 rounded-full"></span> Direct Search</span>
                            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-slate-400 rounded-full"></span> Referrals</span>
                        </div>
                    </div>

                    {/* Premium SVG Simulated Line Chart */}
                    <div className="relative w-full h-48 bg-slate-50 rounded-2xl overflow-hidden p-4">
                        <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                            <line x1="0" y1="50" x2="800" y2="50" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="5,5" />
                            <line x1="0" y1="100" x2="800" y2="100" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="5,5" />
                            <line x1="0" y1="150" x2="800" y2="150" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="5,5" />

                            <path
                                d="M0,160 Q100,60 200,140 T400,80 T600,120 T800,40"
                                fill="none"
                                stroke="#F5B400"
                                strokeWidth="4"
                                className="animate-pulse"
                            />
                            <path
                                d="M0,160 Q100,60 200,140 T400,80 T600,120 T800,40 L800,200 L0,200 Z"
                                fill="url(#goldGrad)"
                                opacity="0.1"
                            />

                            <defs>
                                <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#F5B400" />
                                    <stop offset="100%" stopColor="#FFFFFF" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute left-4 bottom-2 text-[10px] font-bold text-textSecondary">Mon</div>
                        <div className="absolute left-1/4 bottom-2 text-[10px] font-bold text-textSecondary">Wed</div>
                        <div className="absolute left-1/2 bottom-2 text-[10px] font-bold text-textSecondary">Fri</div>
                        <div className="absolute right-4 bottom-2 text-[10px] font-bold text-textSecondary">Sun</div>
                    </div>
                </div>

                {/* SPLIT LAYOUT: WRITER STUDIO */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* WRITER INPUT PANEL (Col-span 7) */}
                    <form onSubmit={handlePublishBlog} className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                        <div className="border-b border-slate-100 pb-4">
                            <h3 className="text-lg font-bold text-textPrimary flex items-center gap-2">
                                <Edit3 className="w-5 h-5 text-gold-500" />
                                Publishing Engine
                            </h3>
                            <p className="text-xs text-textSecondary">Compile raw tech thoughts into stylized, responsive technical publications</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-textPrimary uppercase tracking-wider">Publication Title</label>
                            <input
                                type="text"
                                required
                                value={editorTitle}
                                onChange={(e) => setEditorTitle(e.target.value)}
                                placeholder="e.g. Quantizing Llama-3 Models on local workstation arrays"
                                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-textPrimary focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 focus:bg-white transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-textPrimary uppercase tracking-wider">Technical Tag</label>
                                <select
                                    value={editorCategory}
                                    onChange={(e) => setEditorCategory(e.target.value)}
                                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-textPrimary focus:outline-none focus:border-gold-400 focus:bg-white transition-all"
                                >
                                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                                    <option value="Web Development">Web Development</option>
                                    <option value="React Architecture">React Architecture</option>
                                    <option value="Productivity">Productivity</option>
                                    <option value="Creator Economy">Creator Economy</option>
                                    <option value="Web Design">Web Design</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-textPrimary uppercase tracking-wider">Read Duration Estimation</label>
                                <input
                                    type="text"
                                    required
                                    value={editorReadTime}
                                    onChange={(e) => setEditorReadTime(e.target.value)}
                                    placeholder="e.g. 5 min read"
                                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-textPrimary focus:outline-none focus:border-gold-400 focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-textPrimary uppercase tracking-wider">Curated Cover Image</label>
                            <input
                                type="text"
                                required
                                value={editorCoverImage}
                                onChange={(e) => setEditorCoverImage(e.target.value)}
                                placeholder="Unsplash high-definition tech image url..."
                                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-textPrimary focus:outline-none focus:border-gold-400 focus:bg-white transition-all"
                            />
                            <p className="text-[10px] text-textSecondary">Provide a valid high-fidelity background image URL representing your core publication topic.</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-textPrimary uppercase tracking-wider">Short Editorial Catchphrase</label>
                            <input
                                type="text"
                                required
                                value={editorExcerpt}
                                onChange={(e) => setEditorExcerpt(e.target.value)}
                                placeholder="Summarize the core engineering takeaway in 2 lines..."
                                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-textPrimary focus:outline-none focus:border-gold-400 focus:bg-white transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-bold text-textPrimary uppercase tracking-wider">Structured Content Markdown Body</label>
                                <span className="text-[10px] text-textSecondary font-semibold">Markdown supported</span>
                            </div>
                            <textarea
                                required
                                value={editorBody}
                                onChange={(e) => setEditorBody(e.target.value)}
                                rows={8}
                                placeholder="Use ### for header sections and insert python code inside ``` blocks to compile..."
                                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-textPrimary focus:outline-none focus:border-gold-400 focus:bg-white transition-all font-mono"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isSaving}
                            className="w-full bg-slate-900 hover:bg-gold-500 hover:text-slate-950 text-white font-bold p-4 rounded-xl text-xs sm:text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                        >
                            {isSaving ? (
                                <>
                                    <span className="w-4 h-4 rounded-full border-2 border-slate-300 border-t-white animate-spin"></span>
                                    Compiling Publication Assets...
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4" /> Publish Live Article
                                </>
                            )}
                        </button>
                    </form>

                    {/* WORKSPACE PREVIEW GLASS CANVAS (Col-span 5) */}
                    <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4 self-start sticky top-24">
                        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                            <div>
                                <h3 className="text-xs uppercase tracking-widest font-bold text-gold-600">Dynamic Preview Output</h3>
                                <p className="text-[10px] text-textSecondary">Real-time device compilation visualization</p>
                            </div>
                            <span className="bg-emerald-50 text-emerald-600 border border-emerald-400/20 text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                Sandbox Online
                            </span>
                        </div>

                        <div className="border border-slate-200 rounded-2xl overflow-hidden p-4 bg-slate-50 max-h-[500px] overflow-y-auto space-y-4">
                            {editorCoverImage ? (
                                <div className="relative w-full h-28">
                                    <Image fill src={editorCoverImage} alt="Cover preview" className="object-cover rounded-xl shadow-sm" />
                                </div>
                            ) : (
                                <div className="w-full h-28 bg-slate-200 rounded-xl flex items-center justify-center text-xs text-textSecondary">Cover Mock</div>
                            )}

                            <div className="space-y-2">
                                <span className="text-[9px] font-bold text-gold-600 uppercase bg-gold-50 px-2 py-0.5 rounded border border-gold-200/50">
                                    {editorCategory}
                                </span>
                                <h4 className="text-sm font-bold text-textPrimary leading-snug">
                                    {editorTitle || "Your dynamic visual article title placeholder will render here..."}
                                </h4>
                                <p className="text-[11px] text-textSecondary italic">
                                    "{editorExcerpt || "A brief informative overview catchphrase highlighting tech benefits..."}"
                                </p>
                            </div>

                            <div className="pt-3 border-t border-slate-200/50 text-[11px] text-textSecondary space-y-2 font-mono">
                                <p className="font-bold text-textPrimary text-xs uppercase">Content Compilation Preview</p>
                                {editorBody ? (
                                    <p className="whitespace-pre-wrap leading-relaxed">{editorBody.substring(0, 150)}...</p>
                                ) : (
                                    <p className="text-slate-400">Compose technical paragraphs to observe immediate responsive translation layouts.</p>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
