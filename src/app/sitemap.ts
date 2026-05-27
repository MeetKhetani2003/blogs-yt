import { MetadataRoute } from 'next';
import { INITIAL_ARTICLES } from '@/data/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://technicalrahul.com';
  
  const routes = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${siteUrl}/publications`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  const posts = INITIAL_ARTICLES.map((article) => ({
    url: `${siteUrl}/publications/${article.slug}`,
    lastModified: new Date(article.publishDate),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...routes, ...posts];
}
