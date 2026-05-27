"use client";

import React from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { FacebookIcon, InstagramIcon, YoutubeIcon } from './Icons';

export default function ClientFooter() {
    return (
        <footer className="bg-slate-950 text-white pt-16 pb-12 px-6 lg:px-20 border-t border-slate-900 mt-auto w-full relative z-10">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-slate-900 pb-12 mb-8">
                {/* Left Col (Col-span 5) */}
                <div className="md:col-span-5 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-500 to-accent-red flex items-center justify-center text-white font-bold text-xl shadow-lg">
                            TR
                        </div>
                        <div>
                            <h4 className="text-base font-bold tracking-tight text-white">Technical Rahul Pandey</h4>
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Technology Simplified For Everyone</p>
                        </div>
                    </div>
                    <p className="text-xs text-slate-400 font-normal leading-relaxed max-w-sm">
                        Simplifying complex computing mechanics, local AI development pipelines, prompt architectures, and structured software frameworks for ambitious builders worldwide.
                    </p>
                    <div className="flex items-center gap-4 text-slate-400">
                        <a href="https://youtube.com/@technicalrahulpandey88?si=3A9H5kv1jDVotrpy" target="_blank" rel="noreferrer" className="hover:text-gold-500 transition-colors"><YoutubeIcon className="w-5 h-5" /></a>
                        <a href="https://www.facebook.com/share/1JHwTPsXBC/" target="_blank" rel="noreferrer" className="hover:text-gold-500 transition-colors"><FacebookIcon className="w-5 h-5" /></a>
                        <a href="https://www.instagram.com/technicalrahulpandey88?igsh=aWwyYnhweHV1dmgx" target="_blank" rel="noreferrer" className="hover:text-gold-500 transition-colors"><InstagramIcon className="w-5 h-5" /></a>
                        <a href="mailto:rahulkumar913580@gmail.com" className="hover:text-gold-500 transition-colors"><Mail className="w-5 h-5" /></a>
                    </div>
                </div>

                {/* Middle Col (Col-span 3) */}
                <div className="md:col-span-3 space-y-4">
                    <h5 className="text-xs uppercase tracking-wider font-bold text-gold-400">Content Directory</h5>
                    <ul className="space-y-2 text-xs text-slate-400 font-medium">
                        <li><Link href="/publications?category=Artificial+Intelligence" className="hover:text-white transition-colors">Artificial Intelligence</Link></li>
                        <li><Link href="/publications?category=Web+Development" className="hover:text-white transition-colors">Web Development</Link></li>
                        <li><Link href="/publications?category=React+Architecture" className="hover:text-white transition-colors">React Architecture</Link></li>
                        <li><Link href="/publications?category=Productivity" className="hover:text-white transition-colors">Productivity Systems</Link></li>
                    </ul>
                </div>

                {/* Right Col (Col-span 4) */}
                <div className="md:col-span-4 space-y-4">
                    <h5 className="text-xs uppercase tracking-wider font-bold text-gold-400">The Mission Statement</h5>
                    <p className="text-xs text-slate-400 leading-relaxed font-normal">
                        Empowering over a million engineering minds with actionable content tutorials. We believe that technology shouldn't feel complex. It should inspire builders.
                    </p>
                    <p className="text-[10px] text-slate-500">© 2026 Technical Rahul Pandey. All rights reserved. Built with extreme attention to SaaS detail.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500">
                <p>Hand-crafted with clean typography standards.</p>
                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                    <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    <Link href="/studio" className="hover:text-white transition-colors">Workspace Access</Link>
                </div>
            </div>
        </footer>
    );
}
