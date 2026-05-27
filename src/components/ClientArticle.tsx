"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bookmark, Heart, Share, PlaySquare, ChevronRight, MessageSquare, ArrowLeft, Link as LinkIcon, Copy, Send } from 'lucide-react';

export default function ClientArticle({ article }: { article: any }) {
    const [articleComments, setArticleComments] = useState<any[]>([]);
    const [newCommentAuthor, setNewCommentAuthor] = useState('');
    const [newCommentContent, setNewCommentContent] = useState('');

    const toggleBookmark = (id: number, e: React.MouseEvent) => {
        e.preventDefault();
        alert("Bookmark feature requires authentication");
    };

    const handleCopy = (text: string, message: string = "Copied!") => {
        navigator.clipboard.writeText(text);
        alert(message);
    };

    const handleAddComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (newCommentAuthor && newCommentContent) {
            setArticleComments([...articleComments, {
                id: Date.now(),
                author: newCommentAuthor,
                content: newCommentContent,
                date: "Just now"
            }]);
            setNewCommentAuthor('');
            setNewCommentContent('');
        }
    };

    return (
        <article className="animate-fadeIn pb-20">
            {/* ARTICLE SCROLL READING PROGRESS INDICATOR */}
            <div className="fixed top-[84px] left-0 right-0 h-1 bg-slate-100 z-50">
                <div className="h-full bg-gold-500 w-1/2"></div>
            </div>

            {/* Minimal Breadcrumb */}
            <div className="bg-white border-b border-gray-100 py-3 mt-16">
                <div className="max-w-7xl mx-auto px-6 lg:px-20 w-full flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold text-textSecondary">
                    <Link href="/" className="hover:text-gold-600">Home</Link>
                    <ChevronRight className="w-3 h-3" />
                    <Link href="/publications" className="hover:text-gold-600">Publications</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-gold-600 truncate">{article.title}</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 relative pt-12">
                
                {/* LEFT SIDE: Back trigger + Float Share (Col-span 1) */}
                <div className="hidden lg:col-span-1 lg:flex lg:flex-col lg:items-center gap-4">
                    <div className="sticky top-32 flex flex-col items-center gap-4">
                        <Link
                            href="/publications"
                            className="w-10 h-10 rounded-full border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-textSecondary hover:text-textPrimary transition-colors"
                            title="Back to directory"
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </Link>
                        <button
                            onClick={(e) => toggleBookmark(article.id, e)}
                            className="w-10 h-10 rounded-full border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-textSecondary hover:text-gold-500 transition-colors"
                            title="Bookmark"
                        >
                            <Bookmark className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => handleCopy(window.location.href, "Article link saved to clipboard!")}
                            className="w-10 h-10 rounded-full border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-textSecondary hover:text-textPrimary transition-colors"
                            title="Copy link"
                        >
                            <LinkIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* MIDDLE SIDE: Prime Editorial Content View (Col-span 8) */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Main Meta Badging */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="bg-gold-50 text-gold-600 border border-gold-400/20 text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full">
                                {article.category}
                            </span>
                            <span className="text-xs text-textSecondary font-medium">{article.readTime}</span>
                        </div>

                        <h1 className="text-2xl sm:text-5xl font-bold text-textPrimary leading-[1.12] tracking-tight">
                            {article.title}
                        </h1>

                        <p className="text-lg text-textSecondary font-normal leading-relaxed italic">
                            "{article.excerpt}"
                        </p>
                    </div>

                    {/* Author card presentation */}
                    <div className="flex items-center gap-4 py-4 border-y border-slate-100">
                        <div className="relative w-11 h-11 rounded-full overflow-hidden border border-gray-100 flex-shrink-0">
                            <Image fill src={article.author.avatar} alt="Author" className="object-cover" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-textPrimary">{article.author.name}</p>
                            <p className="text-xs text-textSecondary">{article.author.role}</p>
                        </div>
                        <div className="text-right text-xs text-textSecondary">
                            <p className="font-semibold text-textPrimary">Published</p>
                            <p>{article.publishDate}</p>
                        </div>
                    </div>

                    {/* Hero Featured Image with caption */}
                    <div className="rounded-3xl overflow-hidden shadow-md relative w-full h-[300px] sm:h-[450px]">
                        <Image fill src={article.coverImage} className="object-cover" alt="Hero Cover" />
                    </div>

                    {/* CORE ARTICLE TYPOGRAPHY BODY */}
                    <div className="prose max-w-none text-textPrimary font-body text-base sm:text-lg leading-relaxed space-y-6">
                        {article.body ? (
                            article.body.split('\n\n').map((para: string, index: number) => {
                                if (para.startsWith('### ')) {
                                    return <h3 key={index} className="text-xl sm:text-2xl font-bold text-textPrimary pt-4 pb-2 border-b border-slate-100 m-0">{para.replace('### ', '')}</h3>;
                                }
                                if (para.startsWith('1. ') || para.startsWith('2. ') || para.startsWith('3. ')) {
                                    return (
                                        <div key={index} className="pl-4 border-l-2 border-gold-400 my-2 text-sm text-textSecondary space-y-1">
                                            <p className="m-0">{para}</p>
                                        </div>
                                    );
                                }
                                if (para.startsWith('```')) {
                                    const cleanCode = para.replace(/```[a-z]*/g, '').trim();
                                    return (
                                        <div key={index} className="relative bg-slate-900 text-slate-100 p-5 rounded-2xl overflow-x-auto font-mono text-xs sm:text-sm my-6 border border-slate-800 shadow-lg">
                                            <button
                                                onClick={() => handleCopy(cleanCode, "Source code copied!")}
                                                className="absolute right-3 top-3 bg-slate-800 hover:bg-slate-700 text-slate-300 p-1.5 rounded-lg border border-slate-700 transition-colors"
                                                title="Copy code"
                                            >
                                                <Copy className="w-4 h-4" />
                                            </button>
                                            <pre className="m-0">{cleanCode}</pre>
                                        </div>
                                    );
                                }
                                return <p key={index} className="font-normal text-textSecondary leading-relaxed m-0">{para}</p>;
                            })
                        ) : (
                            <p className="text-textSecondary">Content drafting in workspace progress.</p>
                        )}
                    </div>

                    {/* Like / Share Trigger Actions */}
                    <div className="flex items-center gap-4 pt-8 border-t border-slate-100">
                        <button
                            onClick={() => alert("Thank you for supporting technical education!")}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 hover:border-gold-400 text-textSecondary hover:text-gold-600 transition-colors text-xs font-bold"
                        >
                            <Heart className="w-4 h-4 text-accent-red" /> {article.likes} Appreciations
                        </button>
                        <button
                            onClick={() => handleCopy(window.location.href, "Copied share token link!")}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-textSecondary hover:text-textPrimary transition-colors text-xs font-bold"
                        >
                            <Share className="w-4 h-4" /> Share
                        </button>
                    </div>

                    {/* COMMENTS SECTION DESIGN */}
                    <section className="pt-12 space-y-6">
                        <h4 className="text-xl font-bold text-textPrimary flex items-center gap-2">
                            Discussion Board
                            <span className="bg-slate-100 text-textSecondary text-xs px-2.5 py-0.5 rounded-full font-semibold">
                                {articleComments.length} Comments
                            </span>
                        </h4>

                        <form onSubmit={handleAddComment} className="glass-card p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                            <p className="text-xs font-bold text-textPrimary">Join the tech discussion</p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <input
                                    type="text"
                                    value={newCommentAuthor}
                                    onChange={(e) => setNewCommentAuthor(e.target.value)}
                                    placeholder="Your Name"
                                    className="sm:col-span-1 p-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-textPrimary focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all"
                                />
                                <input
                                    type="text"
                                    value={newCommentContent}
                                    onChange={(e) => setNewCommentContent(e.target.value)}
                                    placeholder="Write a constructive, thoughtful comment..."
                                    className="sm:col-span-2 p-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-textPrimary focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-textPrimary hover:bg-gold-500 hover:text-slate-950 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors flex items-center gap-1.5"
                                >
                                    Publish Comment <Send className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </form>

                        <div className="space-y-4">
                            {articleComments.map(comment => (
                                <div key={comment.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-textPrimary">{comment.author}</span>
                                        <span className="text-[10px] text-textSecondary">{comment.date}</span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-textSecondary leading-relaxed font-normal">{comment.content}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* RIGHT SIDE: Dynamic sticky Table of Content (Col-span 3) */}
                <div className="hidden lg:col-span-3 lg:block">
                    <div className="sticky top-[160px] space-y-8">
                        <div className="space-y-4">
                            <p className="text-xs uppercase tracking-widest font-bold text-gold-600">Overview</p>
                            <ul className="space-y-3 text-xs font-semibold text-textSecondary border-l border-slate-100 pl-4">
                                <li className="text-gold-600 border-l border-gold-500 -ml-[17px] pl-4 cursor-pointer">Introduction</li>
                                <li className="hover:text-textPrimary cursor-pointer transition-colors">Technical Architecture</li>
                                <li className="hover:text-textPrimary cursor-pointer transition-colors">Quantization Metrics</li>
                                <li className="hover:text-textPrimary cursor-pointer transition-colors">Implementation Pipeline</li>
                                <li className="hover:text-textPrimary cursor-pointer transition-colors">Summary & Key Takeaways</li>
                            </ul>
                        </div>

                        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                            <h5 className="text-xs font-bold text-textPrimary uppercase tracking-wider">About Author</h5>
                            <p className="text-xs text-textSecondary leading-relaxed">
                                Rahul Pandey publishes simplified breakdowns covering core operating mechanisms, artificial intelligence, and structural layouts.
                            </p>
                            <div className="flex items-center gap-2 pt-2">
                                <a href="https://www.instagram.com/technicalrahulpandey88?igsh=aWwyYnhweHV1dmgx" target="_blank" rel="noreferrer" className="w-full text-center block bg-white hover:bg-gold-500 hover:text-slate-950 text-textPrimary border border-slate-200 font-bold py-1.5 rounded-lg text-[11px] transition-all">
                                    Follow
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </article>
    );
}
