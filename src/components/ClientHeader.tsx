"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Menu, X, Plus, UserCircle, LogOut, LogIn } from 'lucide-react';
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function ClientHeader() {
    const { data: session, status } = useSession();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const pathname = usePathname();
    const router = useRouter();

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            router.push(`/publications?search=${encodeURIComponent(searchQuery)}`);
            setIsMobileMenuOpen(false);
        }
    };

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/about' },
        { name: 'Publications', href: '/publications' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'Contact', href: '/contact' }
    ];

    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 sm:px-6 flex justify-center pointer-events-none w-full">
                <header className="w-full max-w-7xl bg-white/95 backdrop-blur-2xl rounded-2xl border border-slate-200/80 px-4 sm:px-6 py-3 flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.08)] pointer-events-auto transition-all">
                    <Link href="/" className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative w-10 h-10 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <Image width={40} height={40} priority src="/logo.png" alt="Technical Rahul Pandey Logo" className="w-full h-full object-contain" />
                        </div>
                        <div>
                            <h1 className="text-sm font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
                                Technical Rahul Pandey
                                <span className="bg-gold-50 text-gold-600 text-[9px] font-bold px-2 py-0.5 rounded-full border border-gold-400/30">PRO</span>
                            </h1>
                            <p className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold">Architecture</p>
                        </div>
                    </Link>

                    {/* Navigation Menus with subtle micro-interactions */}
                    <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl border border-slate-200/50">
                        {navLinks.map(link => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wide transition-all duration-300 ${pathname === link.href ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/50'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/studio"
                            className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wide transition-all duration-300 flex items-center gap-1.5 ${pathname === '/studio' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/50'}`}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            Creator Studio
                        </Link>
                    </nav>

                    {/* Quick CTA Actions right */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="hidden xl:flex items-center relative">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleSearch}
                                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:bg-white transition-all w-40 focus:w-56"
                            />
                        </div>
                        <button
                            onClick={() => router.push('/publications')}
                            className="xl:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-500"
                            title="Search publications"
                        >
                            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        <Link
                            href="/studio"
                            className="hidden sm:flex items-center gap-2 bg-slate-900 text-white hover:bg-gold-500 hover:text-slate-900 px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all duration-300"
                        >
                            <Plus className="w-4 h-4" /> Write
                        </Link>

                        {/* AUTHENTICATION UI */}
                        {status === 'loading' ? (
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-200 animate-pulse border-2 border-slate-100"></div>
                        ) : session ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-slate-200 hover:border-gold-400 transition-colors focus:outline-none"
                                >
                                    {session.user?.image ? (
                                        <Image src={session.user.image} width={40} height={40} alt="Avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gold-100 text-gold-600 flex items-center justify-center font-bold text-xs sm:text-sm">
                                            {session.user?.name?.charAt(0) || 'U'}
                                        </div>
                                    )}
                                </button>

                                {/* Dropdown Profile Menu */}
                                {isProfileMenuOpen && (
                                    <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] py-2 z-50 animate-fadeIn">
                                        <div className="px-4 py-3 border-b border-slate-50 mb-2">
                                            <p className="text-sm font-bold text-slate-900 truncate">{session.user?.name}</p>
                                            <p className="text-[10px] text-slate-500 truncate">@{session.user?.username}</p>
                                        </div>
                                        <Link 
                                            href={`/u/${session.user?.username}`} 
                                            onClick={() => setIsProfileMenuOpen(false)}
                                            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-gold-600 transition-colors"
                                        >
                                            <UserCircle className="w-4 h-4" /> My Profile
                                        </Link>
                                        <button 
                                            onClick={() => { setIsProfileMenuOpen(false); signOut(); }}
                                            className="w-full flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-colors text-left mt-1"
                                        >
                                            <LogOut className="w-4 h-4" /> Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => signIn('google')}
                                className="flex items-center gap-1.5 sm:gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[10px] sm:text-xs font-bold transition-all duration-300 border border-slate-200/60"
                            >
                                <LogIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Sign In</span><span className="sm:hidden">Login</span>
                            </button>
                        )}

                        {/* Simple Mobile Menu Trigger */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-1.5 sm:p-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
                        >
                            {isMobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
                        </button>
                    </div>
                </header>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed top-[85px] left-4 right-4 bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-3xl z-40 p-4 flex flex-col gap-2 animate-fadeIn">
                    {navLinks.map(link => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`px-4 py-3 rounded-2xl text-sm font-bold tracking-wide transition-all text-left ${pathname === link.href ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/studio"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`px-4 py-3 rounded-2xl text-sm font-bold tracking-wide transition-all text-left flex items-center gap-2 ${pathname === '/studio' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Creator Studio
                    </Link>
                </div>
            )}
        </>
    );
}
