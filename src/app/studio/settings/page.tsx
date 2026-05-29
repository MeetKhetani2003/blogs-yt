import React from 'react';
import dbConnect from '@/lib/db';
import { User } from '@/models/User';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import SettingsForm from './SettingsForm';

export const metadata = {
    title: 'Platform Settings | Technical Rahul Studio',
};

export default async function SettingsPage() {
    const session = await auth();
    if (!session?.user?.id) redirect('/login');
    
    await dbConnect();
    const user = await User.findById(session.user.id).lean();
    if (!user) redirect('/');

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8 animate-fadeIn">
            <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">System Settings</h2>
                <p className="text-sm text-slate-500 mt-1">Manage your administrative profile and platform configurations.</p>
            </div>
            
            <SettingsForm user={JSON.parse(JSON.stringify(user))} />
        </div>
    );
}
