"use client";

import React, { useState, useEffect } from 'react';
import TiptapEditor from '@/components/TiptapEditor';
import { createBlog, updateBlog } from '@/actions/blog';
import { getCategories } from '@/actions/category';
import { getHashtags } from '@/actions/hashtag';
import { Save, Send, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function BlogEditorPage() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [coverImage, setCoverImage] = useState('');
    
    const [categories, setCategories] = useState<any[]>([]);
    const [hashtags, setHashtags] = useState<any[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [isFeatured, setIsFeatured] = useState(false);
    const [sections, setSections] = useState<{id: string, title: string}[]>([]);

    // SEO States
    const [seoTitle, setSeoTitle] = useState('');
    const [metaDescription, setMetaDescription] = useState('');
    const [focusKeywords, setFocusKeywords] = useState('');
    const [robots, setRobots] = useState('index, follow');
    
    // Inline Taxonomy
    const [newCategoryName, setNewCategoryName] = useState('');
    const [isCreatingCategory, setIsCreatingCategory] = useState(false);

    useEffect(() => {
        async function fetchTaxonomy() {
            const catRes = await getCategories();
            if (catRes.success) setCategories(catRes.categories);
            
            const tagRes = await getHashtags();
            if (tagRes.success) setHashtags(tagRes.hashtags);
        }
        fetchTaxonomy();
    }, []);

    const handleUploadCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);
        toast.loading('Uploading cover image...', { id: 'cover' });
        try {
            const res = await fetch('/api/media/upload', { method: 'POST', body: formData });
            const data = await res.json();
            if (data.success) {
                setCoverImage(data.image.url);
                toast.success('Cover uploaded successfully', { id: 'cover' });
            } else throw new Error(data.error);
        } catch (error: any) {
            toast.error(error.message || 'Upload failed', { id: 'cover' });
        }
    };

    const handleCreateInlineCategory = async () => {
        if (!newCategoryName) return;
        setIsCreatingCategory(true);
        import('@/actions/category').then(async ({ createCategory }) => {
            const res = await createCategory({ name: newCategoryName });
            if (res.success) {
                setCategories(prev => [...prev, res.category]);
                setCategoryId(res.category._id);
                setNewCategoryName('');
                toast.success('Category created!');
            } else {
                toast.error(res.error);
            }
            setIsCreatingCategory(false);
        });
    };

    const handleSave = async (status: 'DRAFT' | 'PUBLISHED') => {
        if (!title || !content || !categoryId) {
            toast.error('Please fill required fields: Title, Category, Content');
            return;
        }

        setIsSaving(true);
        const res = await createBlog({
            title,
            excerpt,
            content,
            category: categoryId as any,
            hashtags: selectedTags as any,
            heroImage: coverImage,
            seoTitle,
            metaDescription,
            focusKeywords: focusKeywords.split(',').map(k => k.trim()).filter(Boolean),
            robots,
            isFeatured,
            sections,
            status,
        });

        setIsSaving(false);
        if (res.success) {
            toast.success(`Blog ${status.toLowerCase()} successfully!`);
            router.push('/studio/blogs');
        } else {
            toast.error(res.error || 'Failed to save blog');
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/studio/blogs" className="p-2 bg-white rounded-full hover:bg-slate-100 transition-colors border border-slate-200 shadow-sm">
                        <ArrowLeft className="w-5 h-5 text-slate-600" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-textPrimary">Create Publication</h1>
                        <p className="text-xs text-textSecondary">Craft your next engineering piece.</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <button onClick={() => handleSave('DRAFT')} disabled={isSaving} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl text-sm flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm">
                        <Save className="w-4 h-4" /> Save Draft
                    </button>
                    <button onClick={() => handleSave('PUBLISHED')} disabled={isSaving} className="px-4 py-2 bg-slate-900 text-white font-bold rounded-xl text-sm flex items-center gap-2 hover:bg-gold-500 hover:text-slate-900 transition-colors shadow-sm">
                        <Send className="w-4 h-4" /> Publish Now
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Main Editor Area */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                        <input
                            type="text"
                            placeholder="Publication Title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full text-3xl font-bold text-textPrimary placeholder:text-slate-300 focus:outline-none border-b border-transparent focus:border-slate-100 pb-2 transition-all bg-transparent"
                        />
                        <textarea
                            placeholder="Short excerpt or description..."
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            rows={2}
                            className="w-full text-sm text-textSecondary placeholder:text-slate-400 focus:outline-none resize-none bg-transparent"
                        />
                    </div>
                    
                    <TiptapEditor content={content} onChange={setContent} />
                </div>

                {/* Sidebar Metadata */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                        <h3 className="font-bold text-sm text-textPrimary uppercase tracking-wider">Publishing Settings</h3>
                        
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Category *</label>
                            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400">
                                <option value="">Select Category</option>
                                {categories.map(c => (
                                    <option key={c._id} value={c._id}>{c.name}</option>
                                ))}
                            </select>
                            <div className="flex gap-2 mt-2">
                                <input type="text" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} placeholder="Or create new..." className="flex-1 p-2 border border-slate-200 rounded-lg text-xs" />
                                <button type="button" onClick={handleCreateInlineCategory} disabled={isCreatingCategory} className="px-3 py-1 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-gold-500 hover:text-slate-900">Add</button>
                            </div>
                        </div>

                        <div className="space-y-2 border-t border-slate-100 pt-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="w-4 h-4 text-gold-500 border-slate-300 rounded focus:ring-gold-500" />
                                <span className="text-xs font-bold text-slate-500 uppercase">Featured Post</span>
                            </label>
                        </div>

                        <div className="space-y-3 border-t border-slate-100 pt-4">
                            <h4 className="text-xs font-bold text-slate-500 uppercase flex items-center justify-between">
                                Table of Contents
                                <button 
                                    type="button" 
                                    onClick={() => setSections([...sections, { id: '', title: '' }])}
                                    className="text-gold-600 hover:text-gold-700 font-bold"
                                >
                                    + Add
                                </button>
                            </h4>
                            <div className="space-y-2">
                                {sections.map((section, idx) => (
                                    <div key={idx} className="flex flex-col gap-1.5 p-2 border border-slate-100 rounded-lg bg-slate-50">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-bold text-slate-400">SECTION {idx + 1}</span>
                                            <button 
                                                type="button" 
                                                onClick={() => setSections(sections.filter((_, i) => i !== idx))}
                                                className="text-red-400 hover:text-red-500 text-[10px] font-bold"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                        <input type="text" placeholder="Title (e.g. Introduction)" value={section.title} onChange={(e) => {
                                            const newSec = [...sections];
                                            newSec[idx].title = e.target.value;
                                            setSections(newSec);
                                        }} className="w-full p-2 border border-slate-200 rounded text-xs" />
                                        <input type="text" placeholder="ID (e.g. intro)" value={section.id} onChange={(e) => {
                                            const newSec = [...sections];
                                            newSec[idx].id = e.target.value;
                                            setSections(newSec);
                                        }} className="w-full p-2 border border-slate-200 rounded text-xs" />
                                    </div>
                                ))}
                                {sections.length === 0 && <p className="text-[10px] text-slate-400 italic">No sections added yet.</p>}
                            </div>
                        </div>

                        <div className="space-y-2 border-t border-slate-100 pt-4">
                            <h4 className="text-xs font-bold text-slate-500 uppercase">SEO Configuration</h4>
                            
                            <input type="text" placeholder="SEO Title" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs" />
                            
                            <textarea placeholder="Meta Description" value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} rows={2} className="w-full p-2 border border-slate-200 rounded-lg text-xs resize-none" />
                            
                            <input type="text" placeholder="Focus Keywords (comma separated)" value={focusKeywords} onChange={(e) => setFocusKeywords(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs" />
                            
                            <select value={robots} onChange={(e) => setRobots(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-white">
                                <option value="index, follow">Index, Follow (Standard)</option>
                                <option value="noindex, follow">NoIndex, Follow</option>
                                <option value="noindex, nofollow">NoIndex, NoFollow (Hidden)</option>
                            </select>
                        </div>

                        <div className="space-y-2 border-t border-slate-100 pt-4">
                            <label className="text-xs font-bold text-slate-500 uppercase">Cover Image</label>
                            {coverImage ? (
                                <div className="relative w-full h-40 rounded-lg overflow-hidden group">
                                    <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center">
                                        <button onClick={() => setCoverImage('')} className="text-white text-xs font-bold bg-red-500 px-3 py-1 rounded">Remove</button>
                                    </div>
                                </div>
                            ) : (
                                <label className="w-full h-32 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 hover:border-gold-400 transition-colors">
                                    <ImageIcon className="w-6 h-6 text-slate-400 mb-2" />
                                    <span className="text-xs font-semibold text-slate-500">Upload Cover Image</span>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleUploadCover} />
                                </label>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Hashtags</label>
                            <div className="flex flex-wrap gap-2">
                                {hashtags.map(tag => (
                                    <button 
                                        key={tag._id} 
                                        onClick={() => setSelectedTags(prev => prev.includes(tag._id) ? prev.filter(t => t !== tag._id) : [...prev, tag._id])}
                                        className={`px-3 py-1 text-xs font-semibold rounded-full border transition-colors ${selectedTags.includes(tag._id) ? 'bg-gold-500 text-slate-900 border-gold-500' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}
                                    >
                                        #{tag.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
