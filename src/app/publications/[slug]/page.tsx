import dbConnect from '@/lib/db';
import { Blog } from '@/models/Blog';
import { Category } from '@/models/Category';
import { User } from '@/models/User';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ClientArticle from '@/components/ClientArticle';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await dbConnect();
  User; // Prevent tree-shaking
  const { slug } = await params;
  const blog = await Blog.findOne({ slug }).populate('author').lean() as any;
  
  if (!blog) {
    return { title: 'Article Not Found' };
  }
  
  return {
    title: blog.seoTitle || blog.title,
    description: blog.metaDescription || blog.excerpt,
    robots: blog.robots || 'index, follow',
    openGraph: {
      title: blog.seoTitle || blog.title,
      description: blog.metaDescription || blog.excerpt,
      type: 'article',
      publishedTime: blog.createdAt?.toISOString(),
      authors: ['Rahul Pandey'],
      images: [
        {
          url: blog.heroImage || '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.seoTitle || blog.title,
      description: blog.metaDescription || blog.excerpt,
      images: [blog.heroImage || '/og-image.jpg'],
    },
    alternates: {
      canonical: blog.canonicalUrl || `/publications/${slug}`,
    }
  };
}

export default async function ArticlePage({ params }: Props) {
  await dbConnect();
  // Prevent Next.js/Turbopack from tree-shaking the models since they are only used in populate
  Category; User;
  const { slug } = await params;
  const blog = await Blog.findOne({ slug })
      .populate('category')
      .populate('author')
      .lean() as any;
  
  if (!blog) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.excerpt,
    image: blog.heroImage,
    datePublished: blog.createdAt,
    author: {
      "@type": "Person",
      name: "Rahul Pandey",
      url: "https://technicalrahul.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Technical Rahul Pandey",
      logo: {
        "@type": "ImageObject",
        url: "https://technicalrahul.com/logo.png"
      }
    }
  };

  const articleFormat = {
      id: blog._id.toString(),
      title: blog.title,
      excerpt: blog.excerpt,
      category: blog.category?.name || 'Technology',
      readTime: blog.readTime || '5 min read',
      author: {
          name: "Rahul Pandey",
          role: "Founder & Technical Architect",
          avatar: "/logo.png"
      },
      publishDate: new Date(blog.createdAt).toLocaleDateString(),
      coverImage: blog.heroImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      content: blog.content,
      sections: blog.sections || [],
      likes: Math.floor(Math.random() * 500) + 100 // placeholder since likes aren't in schema
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex-grow bg-slate-50/50">
        <ClientArticle article={articleFormat} />
      </main>
    </>
  );
}
