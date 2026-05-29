"use client";

import React, { useState, useRef } from 'react';
import { Mail, MessageSquare, Send } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import { submitContactForm } from '@/actions/contact';
import { toast } from 'sonner';

export default function Contact() {
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const recaptchaRef = useRef<any>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!recaptchaToken) {
            toast.error("Please verify reCAPTCHA");
            return;
        }

        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
        };

        const res = await submitContactForm(data, recaptchaToken);
        setIsSubmitting(false);

        if (res.success) {
            toast.success("Message sent successfully!");
            (e.target as HTMLFormElement).reset();
            if (recaptchaRef.current) recaptchaRef.current.reset();
            setRecaptchaToken(null);
        } else {
            toast.error(res.error || "Failed to send message");
        }
    };
    return (
        <div className="relative bg-slate-50 min-h-[90vh] py-16 lg:py-24 px-6 lg:px-20 animate-fadeIn w-full flex-grow overflow-hidden">
            {/* SUBTLE BACKDROP AMBIENT GLOW */}
            <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-gold-400/10 rounded-full blur-[100px] pointer-events-none animate-pulse-glow"></div>
            <div className="absolute top-20 left-1/4 w-[300px] h-[300px] bg-accent-red/5 rounded-full blur-[80px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }}></div>

            <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

                <div className="space-y-10">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200/60 w-fit shadow-sm">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-red opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                            <span className="text-[11px] font-bold text-slate-800 tracking-wider uppercase">Get In Touch</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1]">
                            Let's Build Something <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-amber-500">Extraordinary.</span>
                        </h2>
                        <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-md">
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

                    <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
                        <h3 className="text-xl font-bold text-textPrimary mb-6">Send a Message</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-textPrimary uppercase tracking-wider">Full Name</label>
                                <input type="text" name="name" required placeholder="John Doe" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:bg-white transition-all" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-textPrimary uppercase tracking-wider">Email Address</label>
                                <input type="email" name="email" required placeholder="john@company.com" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:bg-white transition-all" />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-textPrimary uppercase tracking-wider">Subject</label>
                            <input type="text" name="subject" required placeholder="How can we collaborate?" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:bg-white transition-all" />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-textPrimary uppercase tracking-wider">Message</label>
                            <textarea name="message" required rows={4} placeholder="Tell us about your project or inquiry..." className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:bg-white transition-all resize-none"></textarea>
                        </div>

                        <div className="pt-2">
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
                                onChange={(val) => setRecaptchaToken(val)}
                            />
                        </div>

                        <button disabled={isSubmitting} type="submit" className="w-full bg-textPrimary hover:bg-gold-500 hover:text-slate-950 text-white font-bold p-4 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50">
                            <Send className="w-4 h-4" /> {isSubmitting ? "Sending..." : "Send Transmission"}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}
