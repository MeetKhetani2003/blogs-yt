"use client";

import React, { useState } from 'react';
import { Edit3, X, Save, Camera } from 'lucide-react';
import { updateProfile } from '@/actions/user.actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function EditProfileModal({ user }: { user: any }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSaving(true);

        const formData = new FormData(e.currentTarget);
        
        try {
            const result = await updateProfile(formData);
            if (result?.error) {
                toast.error(result.error);
            } else {
                toast.success('Profile updated successfully!');
                setIsOpen(false);
                router.refresh();
            }
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <>
            <button 
                onClick={() => setIsOpen(true)}
                className="bg-white hover:bg-slate-50 border border-slate-200 text-textPrimary font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-colors shadow-sm"
            >
                <Edit3 className="w-3.5 h-3.5" /> Edit Profile
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-fadeIn">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-textPrimary">Edit Profile</h2>
                            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-textPrimary transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            <input type="hidden" name="userId" value={user._id} />
                            
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-textPrimary uppercase tracking-wider">Display Name</label>
                                <input 
                                    name="name"
                                    defaultValue={user.name}
                                    required 
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:bg-white transition-all" 
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-textPrimary uppercase tracking-wider">Bio</label>
                                <textarea 
                                    name="bio"
                                    defaultValue={user.bio}
                                    rows={3}
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:bg-white transition-all resize-none" 
                                ></textarea>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-textPrimary uppercase tracking-wider flex items-center gap-1.5">
                                    <Camera className="w-3.5 h-3.5" /> Profile Image URL
                                </label>
                                <input 
                                    name="image"
                                    defaultValue={user.image}
                                    placeholder="https://..."
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:bg-white transition-all" 
                                />
                                <p className="text-[10px] text-slate-400">For production, an S3 upload component would go here.</p>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-textPrimary uppercase tracking-wider flex items-center gap-1.5">
                                    <Camera className="w-3.5 h-3.5" /> Cover Banner URL
                                </label>
                                <input 
                                    name="coverImage"
                                    defaultValue={user.coverImage}
                                    placeholder="https://..."
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:bg-white transition-all" 
                                />
                            </div>

                            <div className="pt-4 flex items-center justify-end gap-3">
                                <button 
                                    type="button" 
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2 text-sm font-bold text-textSecondary hover:text-textPrimary"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={isSaving}
                                    className="bg-textPrimary hover:bg-gold-500 hover:text-slate-950 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all shadow-md active:scale-95 flex items-center gap-2 disabled:opacity-50"
                                >
                                    {isSaving ? "Saving..." : <><Save className="w-4 h-4" /> Save Changes</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
