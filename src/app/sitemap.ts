import { MetadataRoute } from 'next';
import dbConnect from '@/lib/db';
import { Blog } from '@/models/Blog';
import { YoutubeVideo } from '@/models/YoutubeVideo';
import { Category } from '@/models/Category';
import { Hashtag } from '@/models/Hashtag';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://technicalrahul.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await dbConnect();

  // Fetch data
  const allBlogs = await Blog.find({ status: 'PUBLISHED' }).select('slug updatedAt robots').lean();
  const blogs = allBlogs.filter((b: any) => !(b.robots && b.robots.includes('noindex')));
  const videos = await YoutubeVideo.find().select('slug updatedAt').lean();
  const categories = await Category.find().select('slug updatedAt').lean();
  const hashtags = await Hashtag.find().select('slug updatedAt').lean();

  // Static routes
  const routes = [
    '',
    '/about',
    '/contact',
    '/publications',
    '/youtube',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic Blog Routes
  const blogRoutes = blogs.map((blog: any) => ({
    url: `${BASE_URL}/publications/${blog.slug}`,
    lastModified: blog.updatedAt ? new Date(blog.updatedAt).toISOString() : new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Dynamic Video Routes
  const videoRoutes = videos.map((video: any) => ({
    url: `${BASE_URL}/youtube/${video.slug}`,
    lastModified: video.updatedAt ? new Date(video.updatedAt).toISOString() : new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Taxonomy Routes
  const categoryRoutes = categories.map((cat: any) => ({
    url: `${BASE_URL}/category/${cat.slug}`,
    lastModified: cat.updatedAt ? new Date(cat.updatedAt).toISOString() : new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const hashtagRoutes = hashtags.map((tag: any) => ({
    url: `${BASE_URL}/tag/${tag.slug}`,
    lastModified: tag.updatedAt ? new Date(tag.updatedAt).toISOString() : new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  return [...routes, ...blogRoutes, ...videoRoutes, ...categoryRoutes, ...hashtagRoutes];
}
