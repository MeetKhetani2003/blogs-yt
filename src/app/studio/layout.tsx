import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, FileText, Tags, Image as ImageIcon, MessageSquare, Settings, LogOut, Video } from 'lucide-react';
import { auth, signOut } from '@/auth';
import { redirect } from 'next/navigation';

export default async function StudioLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // Protect route
  if (!session || session.user?.role !== 'ADMIN') {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gold-400 to-accent-red flex items-center justify-center text-white font-bold font-serif text-sm">
                TR
            </div>
            <div>
                <h1 className="font-bold text-sm text-textPrimary tracking-tight">Technical Rahul</h1>
                <p className="text-[10px] text-textSecondary uppercase tracking-widest font-bold">Studio</p>
            </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <NavItem href="/studio" icon={<LayoutDashboard className="w-4 h-4" />} label="Dashboard" />
          <NavItem href="/studio/blogs" icon={<FileText className="w-4 h-4" />} label="Publications" />
          <NavItem href="/studio/categories" icon={<Tags className="w-4 h-4" />} label="Taxonomy" />
          <NavItem href="/studio/media" icon={<ImageIcon className="w-4 h-4" />} label="Media Library" />
          <NavItem href="/studio/youtube" icon={<Video className="w-4 h-4" />} label="YouTube Setup" />
          <NavItem href="/studio/comments" icon={<MessageSquare className="w-4 h-4" />} label="Discussions" />
          
          <div className="pt-4 mt-4 border-t border-slate-100">
            <NavItem href="/studio/settings" icon={<Settings className="w-4 h-4" />} label="Settings" />
          </div>
        </nav>

        <div className="p-4 border-t border-slate-100">
            <form action={async () => {
                "use server";
                await signOut();
            }}>
                <button type="submit" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-50 hover:text-accent-red transition-colors w-full">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
             {/* Mobile menu trigger could go here */}
             <h2 className="text-sm font-bold text-textPrimary">Studio Administration</h2>
          </div>
          <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-textSecondary bg-slate-100 px-3 py-1.5 rounded-full flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  System Operational
              </span>
              <img src={session.user?.image || "https://ui-avatars.com/api/?name=Admin"} alt="Admin" className="w-8 h-8 rounded-full border border-slate-200" />
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

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <Link href={href} className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-50 hover:text-textPrimary transition-colors group">
            <span className="text-slate-400 group-hover:text-gold-500 transition-colors">
                {icon}
            </span>
            {label}
        </Link>
    );
}
