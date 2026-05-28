import React from 'react';
import dbConnect from '@/lib/db';
import { YoutubeVideo } from '@/models/YoutubeVideo';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    await dbConnect();
    const { slug } = await params;
    const video = await YoutubeVideo.findOne({ slug }).lean() as any;
    if (!video) return { title: 'Not Found' };

    return {
        title: `${video.title} | Technical Rahul`,
        description: video.description || `Watch ${video.title} on Technical Rahul.`,
        openGraph: {
            title: video.title,
            description: video.description || `Watch ${video.title} on Technical Rahul.`,
            images: [video.thumbnail],
        },
        twitter: {
            card: 'summary_large_image',
            title: video.title,
            images: [video.thumbnail],
        }
    };
}

export default async function YoutubeVideoPage({ params }: { params: Promise<{ slug: string }> }) {
    await dbConnect();
    const { slug } = await params;
    const video = await YoutubeVideo.findOne({ slug }).lean() as any;
    
    if (!video) return notFound();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: video.title,
        description: video.description || video.title,
        thumbnailUrl: [video.thumbnail],
        uploadDate: new Date(video.createdAt).toISOString(),
        contentUrl: video.url,
        embedUrl: `https://www.youtube.com/embed/${video.youtubeId}`
    };

    return (
        <main className="min-h-screen bg-slate-50 py-12 px-6 lg:px-20 animate-fadeIn">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            
            <div className="max-w-5xl mx-auto space-y-8">
                <Link href="/youtube" className="inline-flex items-center gap-2 text-sm font-bold text-textSecondary hover:text-textPrimary transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Vault
                </Link>

                <div className="space-y-6">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-textPrimary tracking-tight">{video.title}</h1>
                    
                    <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-black">
                        <iframe 
                            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`} 
                            title={video.title} 
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        ></iframe>
                    </div>

                    {video.description && (
                        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-lg mb-4">Video Description</h3>
                            <p className="text-slate-600 whitespace-pre-wrap text-sm leading-relaxed">{video.description}</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
