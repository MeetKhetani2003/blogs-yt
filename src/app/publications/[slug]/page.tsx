import { INITIAL_ARTICLES } from '@/data/articles';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ClientArticle from '@/components/ClientArticle';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = INITIAL_ARTICLES.find((a) => a.slug === slug);
  
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }
  
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishDate,
      authors: [article.author.name],
      images: [
        {
          url: article.coverImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.coverImage],
    },
    alternates: {
      canonical: `/publications/${slug}`,
    }
  };
}

export async function generateStaticParams() {
  return INITIAL_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = INITIAL_ARTICLES.find((a) => a.slug === slug);
  
  if (!article) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.coverImage,
    datePublished: article.publishDate,
    author: {
      "@type": "Person",
      name: article.author.name,
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex-grow bg-slate-50/50">
        <ClientArticle article={article} />
      </main>
    </>
  );
}
