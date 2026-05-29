"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Tags, Image as ImageIcon, MessageSquare, Settings, LogOut, Video, Menu, X } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function StudioLayoutShell({ children, user }: { children: React.ReactNode, user: any }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { href: "/studio", icon: <LayoutDashboard className="w-4 h-4" />, label: "Dashboard" },
        { href: "/studio/blogs", icon: <FileText className="w-4 h-4" />, label: "Publications" },
        { href: "/studio/categories", icon: <Tags className="w-4 h-4" />, label: "Taxonomy" },
        { href: "/studio/media", icon: <ImageIcon className="w-4 h-4" />, label: "Media Library" },
        { href: "/studio/youtube", icon: <Video className="w-4 h-4" />, label: "YouTube Setup" },
        { href: "/studio/comments", icon: <MessageSquare className="w-4 h-4" />, label: "Discussions" }
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/50 z-40 md:hidden transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar Navigation */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6 border-b border-slate-100 flex items-center justify-between md:justify-start gap-3 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gold-400 to-accent-red flex items-center justify-center text-white font-bold font-serif text-sm">
                            TR
                        </div>
                        <div>
                            <h1 className="font-bold text-sm text-textPrimary tracking-tight">Technical Rahul</h1>
                            <p className="text-[10px] text-textSecondary uppercase tracking-widest font-bold">Studio</p>
                        </div>
                    </div>
                    <button 
                        className="md:hidden text-slate-500 hover:text-slate-700"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link 
                                key={item.href} 
                                href={item.href}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors group ${isActive ? 'bg-gold-50 text-gold-700' : 'text-slate-600 hover:bg-slate-50 hover:text-textPrimary'}`}
                            >
                                <span className={isActive ? 'text-gold-600' : 'text-slate-400 group-hover:text-gold-500 transition-colors'}>
                                    {item.icon}
                                </span>
                                {item.label}
                            </Link>
                        );
                    })}
                    
                    <div className="pt-4 mt-4 border-t border-slate-100">
                        <Link 
                            href="/studio/settings"
                            onClick={() => setIsSidebarOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors group ${pathname === '/studio/settings' ? 'bg-gold-50 text-gold-700' : 'text-slate-600 hover:bg-slate-50 hover:text-textPrimary'}`}
                        >
                            <span className={pathname === '/studio/settings' ? 'text-gold-600' : 'text-slate-400 group-hover:text-gold-500 transition-colors'}>
                                <Settings className="w-4 h-4" />
                            </span>
                            Settings
                        </Link>
                    </div>
                </nav>

                <div className="p-4 border-t border-slate-100 shrink-0">
                    <button 
                        onClick={() => signOut({ callbackUrl: '/' })} 
                        className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-50 hover:text-accent-red transition-colors w-full"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                {/* Topbar */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 shrink-0">
                    <div className="flex items-center gap-3">
                        <button 
                            className="md:hidden p-2 -ml-2 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <h2 className="text-sm font-bold text-textPrimary hidden sm:block">Studio Administration</h2>
                        <h2 className="text-sm font-bold text-textPrimary sm:hidden">Studio</h2>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                        <span className="hidden sm:flex text-xs font-semibold text-textSecondary bg-slate-100 px-3 py-1.5 rounded-full items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            System Operational
                        </span>
                        <span className="sm:hidden text-xs font-semibold text-textSecondary bg-slate-100 px-2 py-1 rounded-full flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            Live
                        </span>
                        <img src={user?.image || "https://ui-avatars.com/api/?name=Admin"} alt="Admin" className="w-8 h-8 rounded-full border border-slate-200 object-cover" />
                    </div>
                </header>
                
                {/* Scrollable Content */}
                <div className="flex-1 overflow-auto bg-slate-50 relative">
                    {children}
                </div>
            </main>
        </div>
    );
}
