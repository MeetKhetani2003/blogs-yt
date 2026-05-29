"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bookmark, Heart, Share, PlaySquare, ChevronRight, MessageSquare, ArrowLeft, Link as LinkIcon, Copy, Send, Reply, Pin } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { getComments, addComment, likeComment } from '@/actions/comment';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'sonner';

import { saveBlogAction, checkSavedStatus } from '@/actions/user.actions';

export default function ClientArticle({ article }: { article: any }) {
    const [articleComments, setArticleComments] = useState<any[]>([]);
    const [newCommentContent, setNewCommentContent] = useState('');
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
    const [isSaved, setIsSaved] = useState(false);
    const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);
    const { data: session } = useSession();
    const recaptchaRef = React.useRef<any>(null);

    React.useEffect(() => {
        fetchComments();
        checkSaved();
    }, [article.id]);

    React.useEffect(() => {
        // Extract headings for TOC
        if (article.sections && article.sections.length > 0) {
            setHeadings(article.sections);
        } else {
            const articleElement = document.querySelector('.prose');
            if (articleElement) {
                const headingElements = Array.from(articleElement.querySelectorAll('h3, h2'));
                const extractedHeadings = headingElements.map((h, index) => {
                    const id = h.id || `heading-${index}`;
                    h.id = id;
                    return { id, text: h.textContent || '' };
                });
                setHeadings(extractedHeadings);
            }
        }
    }, [article.content, article.body, article.sections]);

    const checkSaved = async () => {
        const res = await checkSavedStatus(article.id);
        if (res.success && res.isSaved !== undefined) {
            setIsSaved(res.isSaved);
        }
    };

    const fetchComments = async () => {
        const res = await getComments(article.id);
        if (res.success) {
            setArticleComments(res.comments);
        }
    };

    const toggleBookmark = async (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        if (!session) return toast.error("Bookmark feature requires authentication");
        const res = await saveBlogAction(article.id);
        if (res.success && res.isSaved !== undefined) {
            setIsSaved(res.isSaved);
            toast.success(res.isSaved ? "Blog saved to profile!" : "Blog removed from profile");
        } else {
            toast.error(res.error || "Failed to save blog");
        }
    };

    const handleCopy = (text: string, message: string = "Copied!") => {
        navigator.clipboard.writeText(text);
        toast.success(message);
    };

    const handleAddComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session) return toast.error("Please login to comment");
        if (!newCommentContent) return toast.error("Comment cannot be empty");
        if (!recaptchaToken) return toast.error("Please verify reCAPTCHA");

        const res = await addComment(article.id, newCommentContent, replyingTo || undefined, recaptchaToken);
        if (res.success) {
            toast.success("Comment posted!");
            setNewCommentContent('');
            setReplyingTo(null);
            setRecaptchaToken(null);
            if (recaptchaRef.current) recaptchaRef.current.reset();
            fetchComments();
        } else {
            toast.error(res.error || "Failed to post comment");
        }
    };

    const handleLikeComment = async (commentId: string) => {
        if (!session) return toast.error("Please login to like");
        const res = await likeComment(commentId);
        if (res.success) {
            fetchComments();
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
                            className={`w-10 h-10 rounded-full border border-slate-200 hover:bg-slate-50 flex items-center justify-center transition-colors ${isSaved ? 'text-gold-500' : 'text-textSecondary hover:text-gold-500'}`}
                            title="Bookmark"
                        >
                            <Bookmark className="w-4 h-4" fill={isSaved ? "currentColor" : "none"} />
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
                        {article.content ? (
                            <div className="tiptap-content" dangerouslySetInnerHTML={{ __html: article.content }} />
                        ) : article.body ? (
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
                    <section className="pt-12 space-y-6" id="comments">
                        <h4 className="text-xl font-bold text-textPrimary flex items-center gap-2">
                            Discussion Board
                            <span className="bg-slate-100 text-textSecondary text-xs px-2.5 py-0.5 rounded-full font-semibold">
                                {articleComments.length} Comments
                            </span>
                        </h4>

                        {/* MAIN COMMENT FORM */}
                        {!replyingTo && (
                            <form onSubmit={handleAddComment} className="glass-card p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                                <p className="text-xs font-bold text-textPrimary">Join the tech discussion</p>
                                
                                <textarea
                                    value={newCommentContent}
                                    onChange={(e) => setNewCommentContent(e.target.value)}
                                    placeholder="Write a constructive, thoughtful comment..."
                                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-textPrimary focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all resize-none min-h-[80px]"
                                />
                                
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <ReCAPTCHA
                                        ref={recaptchaRef}
                                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"} // Use dummy fallback for local if not set
                                        onChange={(val) => setRecaptchaToken(val)}
                                    />
                                    <button
                                        type="submit"
                                        className="bg-textPrimary hover:bg-gold-500 hover:text-slate-950 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors flex items-center gap-1.5 whitespace-nowrap"
                                        disabled={!session}
                                    >
                                        {session ? "Publish Comment" : "Login to Comment"} <Send className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </form>
                        )}

                        <div className="space-y-4">
                            {articleComments.filter(c => !c.parentComment).map(comment => (
                                <div key={comment._id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3 relative">
                                    {comment.isPinned && (
                                        <div className="absolute top-0 right-4 -translate-y-1/2 bg-gold-500 text-slate-900 px-2 py-0.5 rounded shadow-sm text-[10px] font-bold flex items-center gap-1">
                                            <Pin className="w-3 h-3" /> Pinned
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            {comment.user?.image ? (
                                                <Image src={comment.user.image} width={24} height={24} alt="Avatar" className="rounded-full" />
                                            ) : (
                                                <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold">{comment.user?.name?.charAt(0)}</div>
                                            )}
                                            <span className="text-xs font-bold text-textPrimary">{comment.user?.name}</span>
                                        </div>
                                        <span className="text-[10px] text-textSecondary">{new Date(comment.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-textSecondary leading-relaxed font-normal">{comment.content}</p>
                                    
                                    <div className="flex items-center gap-3 pt-2">
                                        <button onClick={() => handleLikeComment(comment._id)} className={`text-xs font-semibold flex items-center gap-1 ${session && comment.likes?.includes(session.user?.id as string) ? 'text-accent-red' : 'text-slate-500 hover:text-textPrimary'}`}>
                                            <Heart className={`w-3.5 h-3.5 ${session && comment.likes?.includes(session.user?.id as string) ? 'fill-accent-red' : ''}`} /> {comment.likes?.length || 0}
                                        </button>
                                        <button onClick={() => { setReplyingTo(comment._id); }} className="text-xs font-semibold flex items-center gap-1 text-slate-500 hover:text-textPrimary">
                                            <Reply className="w-3.5 h-3.5" /> Reply
                                        </button>
                                    </div>

                                    {/* INLINE REPLY FORM */}
                                    {replyingTo === comment._id && (
                                        <form onSubmit={handleAddComment} className="mt-4 glass-card p-4 rounded-xl border border-gold-200 shadow-sm space-y-3 bg-white">
                                            <p className="text-xs font-bold text-textPrimary flex items-center gap-2">
                                                Replying to {comment.user?.name} 
                                                <button type="button" onClick={()=>setReplyingTo(null)} className="text-xs text-slate-400 hover:text-accent-red ml-auto">Cancel</button>
                                            </p>
                                            
                                            <textarea
                                                value={newCommentContent}
                                                onChange={(e) => setNewCommentContent(e.target.value)}
                                                placeholder="Write your reply..."
                                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-textPrimary focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all resize-none min-h-[60px]"
                                            />
                                            
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                                <div className="scale-75 origin-left">
                                                    <ReCAPTCHA
                                                        ref={recaptchaRef}
                                                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
                                                        onChange={(val) => setRecaptchaToken(val)}
                                                    />
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="bg-gold-500 hover:bg-gold-600 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs transition-colors flex items-center gap-1.5 whitespace-nowrap"
                                                    disabled={!session}
                                                >
                                                    {session ? "Post Reply" : "Login"} <Send className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </form>
                                    )}

                                    {/* Nested Replies */}
                                    {articleComments.filter(r => r.parentComment === comment._id).map(reply => (
                                        <div key={reply._id} className="mt-3 ml-6 p-3 rounded-xl bg-white border border-slate-100 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    {reply.user?.image ? (
                                                        <Image src={reply.user.image} width={20} height={20} alt="Avatar" className="rounded-full" />
                                                    ) : (
                                                        <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold">{reply.user?.name?.charAt(0)}</div>
                                                    )}
                                                    <span className="text-xs font-bold text-textPrimary">{reply.user?.name}</span>
                                                </div>
                                                <span className="text-[10px] text-textSecondary">{new Date(reply.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-xs text-textSecondary leading-relaxed font-normal">{reply.content}</p>
                                        </div>
                                    ))}
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
                                {headings.length > 0 ? headings.map((heading, idx) => (
                                    <li 
                                        key={heading.id} 
                                        onClick={() => document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' })}
                                        className={`hover:text-textPrimary cursor-pointer transition-colors ${idx === 0 ? 'text-gold-600 border-l border-gold-500 -ml-[17px] pl-4' : ''}`}
                                    >
                                        {heading.text}
                                    </li>
                                )) : (
                                    <li className="text-slate-400 italic">No headings found</li>
                                )}
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
