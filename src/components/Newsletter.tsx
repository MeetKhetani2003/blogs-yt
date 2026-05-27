"use client";

import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';

export default function Newsletter() {
    const [subscriberEmail, setSubscriberEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (subscriberEmail) {
            setIsSubscribed(true);
            setSubscriberEmail('');
        }
    };

    return (
        <section className="py-20 bg-white px-6 lg:px-20">
            <div className="max-w-4xl mx-auto w-full">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950 p-8 sm:p-12 text-white border border-slate-800">
                    <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute -left-10 -top-10 w-60 h-60 bg-accent-red/10 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="relative z-10 max-w-xl space-y-6">
                        <span className="bg-gold-500/20 text-gold-400 border border-gold-500/30 text-[9px] tracking-widest font-bold px-3 py-1 rounded-full uppercase inline-block">
                            THE PRIVATE LIST
                        </span>
                        <h3 className="text-xl sm:text-4xl font-bold tracking-tight">
                            Stay ahead of the curve. <br />
                            Simplified technical updates.
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                            Join a collective of over 12,000+ ambitious developers, creators, and technical engineers who receive weekly high-impact breakdowns. No spam, ever.
                        </p>

                        {!isSubscribed ? (
                            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 pt-3">
                                <div className="flex-1 relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="email"
                                        value={subscriberEmail}
                                        onChange={(e) => setSubscriberEmail(e.target.value)}
                                        placeholder="Enter your personal email"
                                        className="w-full pl-11 pr-4 py-3.5 bg-slate-900/80 border border-slate-700/60 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 placeholder:text-slate-500 transition-colors"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-gold-500 hover:bg-gold-600 text-slate-950 font-bold px-6 py-3.5 rounded-xl text-xs sm:text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
                                >
                                    Subscribe <ArrowRight className="w-4 h-4" />
                                </button>
                            </form>
                        ) : (
                            <div className="p-4 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center gap-3 text-gold-400 animate-fadeIn">
                                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                <span className="text-xs font-semibold">Welcome aboard! Your verification dispatch is en route.</span>
                            </div>
                        )}

                        <p className="text-[10px] text-slate-500 font-medium">
                            🔒 Verified data privacy mechanism. Unsubscribe with 1-click at any time.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
