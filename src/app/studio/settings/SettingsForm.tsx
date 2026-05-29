"use client";

import React, { useState } from 'react';
import { updateProfile } from '@/actions/user.actions';
import { toast } from 'sonner';
import { Save, UserCircle, UploadCloud } from 'lucide-react';

export default function SettingsForm({ user }: { user: any }) {
    const [isSaving, setIsSaving] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSaving(true);
        const formData = new FormData(e.currentTarget);
        formData.append('userId', user._id);
        const res = await updateProfile(formData);
        
        if (res.success) {
            toast.success("Settings updated successfully!");
        } else {
            toast.error(res.error || "Failed to update settings");
        }
        setIsSaving(false);
    }

    return (
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200/60 shadow-sm space-y-8 bg-white relative">
            <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-gold-50 flex items-center justify-center text-gold-600">
                    <UserCircle className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-900">Administrator Profile</h3>
                    <p className="text-xs text-slate-500">Update your public details used across publications.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Display Name</label>
                        <input 
                            name="name" 
                            defaultValue={user.name} 
                            required
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:bg-white transition-all text-slate-900 font-medium"
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Username</label>
                        <input 
                            name="username" 
                            defaultValue={user.username} 
                            disabled
                            className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-500 font-medium cursor-not-allowed"
                            title="Username cannot be changed"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Bio / Designation</label>
                    <textarea 
                        name="bio" 
                        defaultValue={user.bio} 
                        rows={3}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:bg-white transition-all text-slate-900 font-medium resize-none"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                            Avatar URL <UploadCloud className="w-3.5 h-3.5" />
                        </label>
                        <input 
                            name="image" 
                            defaultValue={user.image} 
                            placeholder="https://..."
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:bg-white transition-all text-slate-900 font-medium"
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                            Cover Image URL <UploadCloud className="w-3.5 h-3.5" />
                        </label>
                        <input 
                            name="coverImage" 
                            defaultValue={user.coverImage} 
                            placeholder="https://..."
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:bg-white transition-all text-slate-900 font-medium"
                        />
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-end">
                    <button 
                        type="submit" 
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-gold-500 text-white hover:text-slate-900 rounded-xl font-bold text-sm shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSaving ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        {isSaving ? 'Saving Changes...' : 'Save Settings'}
                    </button>
                </div>
            </form>
        </div>
    );
}
