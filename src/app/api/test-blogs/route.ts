import { NextResponse } from 'next/server';
import { getBlogs } from '@/actions/blog';

export async function GET() {
    const result = await getBlogs(1, 100, { status: 'PUBLISHED' });
    return NextResponse.json(result);
}
