"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
import { getBlogs, deleteBlog } from '@/actions/blog';
import { toast } from 'sonner';

export default function BlogsListPage() {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const fetchBlogs = async () => {
        setLoading(true);
        const res = await getBlogs(1, 50); // Pagination could be added later
        if (res.success) setBlogs(res.blogs);
        setLoading(false);
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this publication?')) return;
        const res = await deleteBlog(id);
        if (res.success) {
            toast.success('Deleted successfully');
            setBlogs(blogs.filter(b => b._id !== id));
        } else {
            toast.error(res.error || 'Failed to delete');
        }
    };

    const filteredBlogs = blogs.filter(b => b.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-textPrimary">Publications</h1>
                    <p className="text-xs text-textSecondary">Manage your tech engineering articles.</p>
                </div>
                <Link href="/studio/blogs/new" className="px-4 py-2 bg-slate-900 text-white font-bold rounded-xl text-sm flex items-center gap-2 hover:bg-gold-500 hover:text-slate-900 transition-colors shadow-sm">
                    <Plus className="w-4 h-4" /> New Publication
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center gap-2 bg-slate-50">
                    <Search className="w-4 h-4 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search publications..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-transparent text-sm w-full focus:outline-none text-textPrimary placeholder:text-slate-400"
                    />
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500">
                                <th className="p-4 font-bold">Title</th>
                                <th className="p-4 font-bold">Category</th>
                                <th className="p-4 font-bold">Status</th>
                                <th className="p-4 font-bold">Date</th>
                                <th className="p-4 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={5} className="p-8 text-center text-sm text-slate-500">Loading publications...</td></tr>
                            ) : filteredBlogs.length === 0 ? (
                                <tr><td colSpan={5} className="p-8 text-center text-sm text-slate-500">No publications found.</td></tr>
                            ) : (
                                filteredBlogs.map((blog) => (
                                    <tr key={blog._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                                        <td className="p-4">
                                            <div className="font-bold text-sm text-textPrimary truncate max-w-[300px]">{blog.title}</div>
                                            <div className="text-xs text-slate-400 truncate max-w-[300px]">{blog.slug}</div>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded-md border border-slate-200">{blog.category?.name || 'Uncategorized'}</span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${blog.status === 'PUBLISHED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                                {blog.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-xs text-slate-500">
                                            {new Date(blog.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={`/publications/${blog.slug}`} target="_blank" className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-colors">
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                <Link href={`/studio/blogs/${blog._id}/edit`} className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-md transition-colors">
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button onClick={() => handleDelete(blog._id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
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
