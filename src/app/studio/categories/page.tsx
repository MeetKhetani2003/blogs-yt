"use client";

import React, { useEffect, useState } from 'react';
import { getCategories, createCategory } from '@/actions/category';
import { getHashtags, createHashtag } from '@/actions/hashtag';
import { toast } from 'sonner';
import { Plus, Tag, Folder } from 'lucide-react';

export default function TaxonomyPage() {
    const [categories, setCategories] = useState<any[]>([]);
    const [hashtags, setHashtags] = useState<any[]>([]);
    const [newCatName, setNewCatName] = useState('');
    const [newCatDesc, setNewCatDesc] = useState('');
    const [newTagName, setNewTagName] = useState('');

    const fetchData = async () => {
        const catRes = await getCategories();
        if (catRes.success) setCategories(catRes.categories);
        
        const tagRes = await getHashtags();
        if (tagRes.success) setHashtags(tagRes.hashtags);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreateCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCatName) return;
        const res = await createCategory({ name: newCatName, description: newCatDesc });
        if (res.success) {
            toast.success("Category created!");
            setNewCatName('');
            setNewCatDesc('');
            fetchData();
        } else {
            toast.error(res.error);
        }
    };

    const handleCreateHashtag = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTagName) return;
        // Optional: remove # if user types it
        const cleanName = newTagName.startsWith('#') ? newTagName.substring(1) : newTagName;
        const res = await createHashtag(cleanName);
        if (res.success) {
            toast.success("Hashtag created!");
            setNewTagName('');
            fetchData();
        } else {
            toast.error(res.error);
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8 animate-fadeIn">
            <div>
                <h1 className="text-2xl font-bold text-textPrimary">Taxonomy</h1>
                <p className="text-xs text-textSecondary">Manage Categories and Hashtags to organize your content.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Categories Section */}
                <div className="space-y-4">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                        <div className="flex items-center gap-2 text-textPrimary font-bold pb-2 border-b border-slate-100">
                            <Folder className="w-5 h-5 text-gold-500" />
                            Categories
                        </div>
                        
                        <form onSubmit={handleCreateCategory} className="flex flex-col gap-3">
                            <input type="text" value={newCatName} onChange={e => setNewCatName(e.target.value)} placeholder="Category Name (e.g. AI Architecture)" className="p-2 border border-slate-200 rounded-lg text-sm" required />
                            <input type="text" value={newCatDesc} onChange={e => setNewCatDesc(e.target.value)} placeholder="Short description..." className="p-2 border border-slate-200 rounded-lg text-sm" />
                            <button type="submit" className="bg-slate-900 text-white font-bold py-2 rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-gold-500 hover:text-slate-900 transition-colors">
                                <Plus className="w-4 h-4" /> Add Category
                            </button>
                        </form>

                        <div className="mt-4 space-y-2">
                            {categories.map(c => (
                                <div key={c._id} className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-between">
                                    <div>
                                        <p className="font-bold text-sm text-textPrimary">{c.name}</p>
                                        <p className="text-xs text-slate-500">{c.slug}</p>
                                    </div>
                                    <span className="text-xs font-semibold bg-white border border-slate-200 px-2 py-1 rounded">0 Blogs</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Hashtags Section */}
                <div className="space-y-4">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                        <div className="flex items-center gap-2 text-textPrimary font-bold pb-2 border-b border-slate-100">
                            <Tag className="w-5 h-5 text-gold-500" />
                            Hashtags
                        </div>
                        
                        <form onSubmit={handleCreateHashtag} className="flex gap-2">
                            <input type="text" value={newTagName} onChange={e => setNewTagName(e.target.value)} placeholder="Tag name (e.g. reactjs)" className="p-2 border border-slate-200 rounded-lg text-sm flex-1" required />
                            <button type="submit" className="bg-slate-900 text-white font-bold px-4 rounded-lg text-sm flex items-center justify-center hover:bg-gold-500 hover:text-slate-900 transition-colors">
                                <Plus className="w-4 h-4" /> Add
                            </button>
                        </form>

                        <div className="mt-4 flex flex-wrap gap-2">
                            {hashtags.map(t => (
                                <span key={t._id} className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 rounded-full hover:bg-slate-100 cursor-default">
                                    #{t.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
