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
        { name: 'Contact', href: '/contact' }
    ];

    return (
        <>
            <header className="sticky top-0 left-0 right-0 z-50 glass-card border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 cursor-pointer">
                    <div className="relative w-12 h-12 flex items-center justify-center">
                        <Image width={48} height={48} src="/logo.png" alt="Technical Rahul Pandey Logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                        <h1 className="text-base font-bold tracking-tight text-textPrimary flex items-center gap-2">
                            Technical Rahul Pandey
                            <span className="bg-gold-100 text-gold-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-gold-400/20">PRO</span>
                        </h1>
                        <p className="text-[10px] text-textSecondary uppercase tracking-widest font-semibold">Technology Simplified</p>
                    </div>
                </Link>

                {/* Navigation Menus with subtle micro-interactions */}
                <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/50">
                    {navLinks.map(link => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-300 ${pathname === link.href ? 'bg-white text-textPrimary shadow-sm' : 'text-textSecondary hover:text-textPrimary'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/studio"
                        className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-300 flex items-center gap-1.5 ${pathname === '/studio' ? 'bg-white text-textPrimary shadow-sm' : 'text-textSecondary hover:text-textPrimary'}`}
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Creator Studio
                    </Link>
                </nav>

                {/* Quick CTA Actions right */}
                <div className="flex items-center gap-1.5 sm:gap-3">
                    <div className="hidden lg:flex items-center relative">
                        <Search className="w-4 h-4 text-textSecondary absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search topics..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                            className="pl-9 pr-4 py-2 bg-slate-100 border border-slate-200/60 rounded-xl text-xs text-textPrimary placeholder:text-textSecondary focus:outline-none focus:ring-2 focus:ring-gold-400 focus:bg-white transition-all w-48 focus:w-64"
                        />
                    </div>
                    <button
                        onClick={() => router.push('/publications')}
                        className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors text-textSecondary"
                        title="Search publications"
                    >
                        <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <Link
                        href="/studio"
                        className="hidden sm:flex items-center gap-2 bg-textPrimary text-white hover:bg-gold-500 hover:text-textPrimary px-4 py-2 rounded-xl text-xs font-semibold shadow-md transition-all duration-300 border border-slate-800"
                    >
                        <Plus className="w-4 h-4" /> Write Article
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
                                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 z-50 animate-fadeIn">
                                    <div className="px-4 py-2 border-b border-slate-50 mb-2">
                                        <p className="text-sm font-bold text-textPrimary truncate">{session.user?.name}</p>
                                        <p className="text-[10px] text-textSecondary truncate">@{session.user?.username}</p>
                                    </div>
                                    <Link 
                                        href={`/u/${session.user?.username}`} 
                                        onClick={() => setIsProfileMenuOpen(false)}
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-textSecondary hover:bg-slate-50 hover:text-gold-600 transition-colors"
                                    >
                                        <UserCircle className="w-4 h-4" /> My Profile
                                    </Link>
                                    <button 
                                        onClick={() => { setIsProfileMenuOpen(false); signOut(); }}
                                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-textSecondary hover:bg-rose-50 hover:text-rose-600 transition-colors text-left"
                                    >
                                        <LogOut className="w-4 h-4" /> Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={() => signIn('google')}
                            className="flex items-center gap-1.5 sm:gap-2 bg-slate-100 hover:bg-slate-200 text-textPrimary px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[10px] sm:text-xs font-semibold shadow-sm transition-all duration-300 border border-slate-200"
                        >
                            <LogIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Sign In</span><span className="sm:hidden">Login</span>
                        </button>
                    )}

                    {/* Simple Mobile Menu Trigger */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-1.5 sm:p-2 rounded-xl border border-gray-200"
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5 text-textPrimary" /> : <Menu className="w-5 h-5 text-textPrimary" />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed top-[73px] left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-xl z-40 p-4 flex flex-col gap-2 animate-fadeIn">
                    {navLinks.map(link => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all text-left ${pathname === link.href ? 'bg-slate-100 text-textPrimary' : 'text-textSecondary hover:bg-slate-50'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/studio"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all text-left flex items-center gap-2 ${pathname === '/studio' ? 'bg-slate-100 text-textPrimary' : 'text-textSecondary hover:bg-slate-50'}`}
                    >
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Creator Studio
                    </Link>
                </div>
            )}
        </>
    );
}
