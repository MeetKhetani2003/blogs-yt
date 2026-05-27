"use client";

import { Mail, MessageSquare, Send } from 'lucide-react';

export default function Contact() {
    return (
        <div className="bg-white min-h-[90vh] py-16 px-6 lg:px-20 animate-fadeIn w-full flex-grow">
            <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                <div className="space-y-8">
                    <div className="space-y-3">
                        <p className="text-xs uppercase tracking-widest font-bold text-accent-red">Get in touch</p>
                        <h2 className="text-3xl sm:text-5xl font-bold text-textPrimary tracking-tight">
                            Let's Build Something <br /> Extraordinary.
                        </h2>
                        <p className="text-sm text-textSecondary font-normal leading-relaxed max-w-md">
                            Whether you're looking for corporate architectural consulting, sponsorships, or just want to discuss the latest tech trends, our inbox is always open.
                        </p>
                    </div>

                    <div className="space-y-6 pt-4">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-gold-600 shadow-sm flex-shrink-0">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-textPrimary">Email Direct</h4>
                                <p className="text-xs text-textSecondary font-normal mt-1">rahulkumar913580@gmail.com</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-gold-600 shadow-sm flex-shrink-0">
                                <MessageSquare className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-textPrimary">Social DMs</h4>
                                <p className="text-xs text-textSecondary font-normal mt-1">Fastest response via Instagram or Facebook.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="glass-card p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-2xl relative overflow-hidden">
                    {/* Decorative subtle blur */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold-400/10 rounded-full blur-3xl pointer-events-none"></div>

                    <form onSubmit={(e) => { e.preventDefault(); alert("Message sent successfully! We will get back to you shortly."); }} className="relative z-10 space-y-5">
                        <h3 className="text-xl font-bold text-textPrimary mb-6">Send a Message</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-textPrimary uppercase tracking-wider">Full Name</label>
                                <input type="text" required placeholder="John Doe" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:bg-white transition-all" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-textPrimary uppercase tracking-wider">Email Address</label>
                                <input type="email" required placeholder="john@company.com" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:bg-white transition-all" />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-textPrimary uppercase tracking-wider">Subject</label>
                            <input type="text" required placeholder="How can we collaborate?" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:bg-white transition-all" />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-textPrimary uppercase tracking-wider">Message</label>
                            <textarea required rows={4} placeholder="Tell us about your project or inquiry..." className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:bg-white transition-all resize-none"></textarea>
                        </div>

                        <button type="submit" className="w-full bg-textPrimary hover:bg-gold-500 hover:text-slate-950 text-white font-bold p-4 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2">
                            <Send className="w-4 h-4" /> Send Transmission
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}
