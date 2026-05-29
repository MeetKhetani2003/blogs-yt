import React from 'react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import StudioLayoutShell from './StudioLayoutShell';

export default async function StudioLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // Protect route
  if (!session || session.user?.role !== 'ADMIN') {
    redirect('/');
  }

  return (
    <StudioLayoutShell user={session.user}>
        {children}
    </StudioLayoutShell>
  );
}
