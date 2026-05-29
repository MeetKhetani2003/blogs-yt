"use client";

import React, { useEffect, useState } from 'react';
import { getComments, moderateComment, pinComment } from '@/actions/comment';
import { toast } from 'sonner';
import { MessageSquare, Check, X, Pin } from 'lucide-react';
import Link from 'next/link';

export default function CommentsStudioPage() {
    const [comments, setComments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchComments = async () => {
        setLoading(true);
        // fetch all comments for admin
        const res = await getComments(); // Admin uses same function, we should pass an admin flag or update the action to fetch all if admin. Let's assume action fetches all for now.
        if (res.success) setComments(res.comments);
        setLoading(false);
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const handleModerate = async (id: string, status: 'APPROVED' | 'REJECTED') => {
        const res = await moderateComment(id, status);
        if (res.success) {
            toast.success(`Comment ${status.toLowerCase()}`);
            setComments(comments.map(c => c._id === id ? { ...c, status } : c));
        } else {
            toast.error(res.error);
        }
    };

    const handlePin = async (id: string, isPinned: boolean) => {
        const res = await pinComment(id, isPinned);
        if (res.success) {
            toast.success(`Comment ${isPinned ? 'pinned' : 'unpinned'}`);
            setComments(comments.map(c => c._id === id ? { ...c, isPinned } : c));
        } else {
            toast.error(res.error);
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6 animate-fadeIn">
            <div>
                <h1 className="text-2xl font-bold text-textPrimary flex items-center gap-2">
                    <MessageSquare className="w-6 h-6 text-blue-500" />
                    Discussions Moderation
                </h1>
                <p className="text-xs text-textSecondary">Review and approve reader comments on publications.</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500">
                                <th className="p-4 font-bold">User</th>
                                <th className="p-4 font-bold">Comment</th>
                                <th className="p-4 font-bold">Publication</th>
                                <th className="p-4 font-bold">Status</th>
                                <th className="p-4 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={5} className="p-8 text-center text-sm text-slate-500">Loading comments...</td></tr>
                            ) : comments.length === 0 ? (
                                <tr><td colSpan={5} className="p-8 text-center text-sm text-slate-500">No comments found.</td></tr>
                            ) : (
                                comments.map((comment) => (
                                    <tr key={comment._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <img src={comment.user?.image || 'https://ui-avatars.com/api/?name=User'} alt="" className="w-8 h-8 rounded-full" />
                                                <div>
                                                    <p className="font-bold text-sm text-textPrimary">{comment.user?.name}</p>
                                                    <p className="text-xs text-slate-400">@{comment.user?.username}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-sm text-slate-600 line-clamp-2 max-w-md">{comment.content}</p>
                                            {comment.isPinned && <span className="text-[10px] font-bold text-gold-600 mt-1 flex items-center gap-1"><Pin className="w-3 h-3" /> Pinned</span>}
                                        </td>
                                        <td className="p-4">
                                            <Link href={`/publications/${comment.blog?.slug}`} target="_blank" className="text-sm text-blue-600 hover:underline line-clamp-1 max-w-[200px]">
                                                {comment.blog?.title}
                                            </Link>
                                        </td>
                                        <td className="p-4">
                                            <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
                                                comment.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' : 
                                                comment.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 
                                                'bg-amber-100 text-amber-700'
                                            }`}>
                                                {comment.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => handlePin(comment._id, !comment.isPinned)} className={`p-1.5 rounded-md transition-colors ${comment.isPinned ? 'text-gold-600 bg-gold-50 hover:bg-gold-100' : 'text-slate-500 bg-slate-100 hover:bg-slate-200'}`} title={comment.isPinned ? "Unpin" : "Pin"}>
                                                    <Pin className="w-4 h-4" />
                                                </button>
                                                {comment.status !== 'APPROVED' && (
                                                    <button onClick={() => handleModerate(comment._id, 'APPROVED')} className="p-1.5 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-colors" title="Approve">
                                                        <Check className="w-4 h-4" />
                                                    </button>
                                                )}
                                                {comment.status !== 'REJECTED' && (
                                                    <button onClick={() => handleModerate(comment._id, 'REJECTED')} className="p-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors" title="Reject">
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
