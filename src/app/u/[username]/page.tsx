import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/db';
import { User, IUser } from '@/models/User';
import { Calendar, Award, BookOpen, MessageSquare, Star } from 'lucide-react';
import { INITIAL_ARTICLES } from '@/data/articles'; // Using mock data for rendering saved/commented blogs
import Link from 'next/link';
import { auth } from '@/auth';
import EditProfileModal from './EditProfileModal';

interface Props {
  params: Promise<{ username: string }>;
}

async function getUser(username: string) {
  await dbConnect();
  const user = await User.findOne({ username }).lean() as IUser;
  return user;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const user = await getUser(username);

  if (!user) {
    return { title: 'User Not Found' };
  }

  return {
    title: `${user.name} (@${user.username}) | Technical Rahul Pandey`,
    description: user.bio,
    openGraph: {
      title: `${user.name} (@${user.username})`,
      description: user.bio,
      images: [user.coverImage || ''],
    },
    alternates: {
      canonical: `https://yourdomain.com/u/${user.username}`,
    }
  };
}

export default async function UserProfilePage({ params }: Props) {
  const { username } = await params;
  const user = await getUser(username);
  
  if (!user) {
    notFound();
  }

  const session = await auth();
  const isOwner = session?.user?.username === user.username;

  // Mock mapped blogs for UI purposes
  const savedBlogs = INITIAL_ARTICLES.slice(0, 2);
  const reviewedBlogs = INITIAL_ARTICLES.slice(2, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: user.name,
    alternateName: user.username,
    description: user.bio,
    image: user.image,
    url: `https://yourdomain.com/u/${user.username}`
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex-grow bg-slate-50 min-h-screen">
        {/* Cover Banner */}
        <div className="relative w-full h-56 md:h-72 lg:h-80 bg-slate-900 overflow-hidden">
          {user.coverImage ? (
            <Image 
              src={user.coverImage} 
              fill 
              alt="Cover Banner" 
              className="object-cover opacity-90 transition-transform duration-1000 hover:scale-105" 
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-900"></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent"></div>
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full -mt-20 md:-mt-28 relative z-10 pb-24">
          {/* Profile Header Card */}
          <div className="glass-card p-6 md:p-10 rounded-[2rem] border border-white/40 shadow-2xl bg-white/80 backdrop-blur-xl flex flex-col md:flex-row gap-6 md:gap-8 items-start justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-400/5 rounded-full blur-3xl -z-10"></div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start w-full z-10">
              <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-[1.5rem] overflow-hidden border-4 border-white shadow-xl bg-slate-100 flex-shrink-0 ring-4 ring-slate-900/5">
                {user.image ? (
                  <Image src={user.image} fill alt={user.name} className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-slate-400 bg-gradient-to-br from-slate-100 to-slate-200">
                    {user.name.charAt(0)}
                  </div>
                )}
              </div>
              
              <div className="space-y-4 flex-1 w-full pt-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                      {user.name}
                      {user.role === 'ADMIN' && (
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gold-50 text-gold-500 shadow-sm border border-gold-100" title="Admin / Author">
                           <Award className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </h1>
                    <p className="text-sm font-semibold text-gold-600 tracking-wide mt-0.5">@{user.username}</p>
                  </div>
                  
                  {isOwner && (
                    <EditProfileModal user={JSON.parse(JSON.stringify(user))} />
                  )}
                </div>

                <p className="text-base text-slate-600 leading-relaxed max-w-3xl font-medium">
                  {user.bio || "This user prefers to keep an air of mystery about them. No biography provided yet."}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-500 pt-4 border-t border-slate-200/60 w-full">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    Joined {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </div>
                  <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-slate-400" />
                    {user.savedBlogs.length} Saved
                  </div>
                  <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-slate-400" />
                    {user.commentedBlogs.length} Contributions
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Layout */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Col: Activity Stream */}
            <div className="lg:col-span-8 space-y-6">
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-gold-500" /> Reading List
              </h3>
              
              <div className="space-y-4">
                {savedBlogs.length > 0 ? savedBlogs.map((blog) => (
                  <Link href={`/publications/${blog.slug}`} key={blog.id} className="block bg-white p-5 rounded-[1.5rem] border border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                    <div className="flex flex-col sm:flex-row gap-5">
                      <div className="relative w-full sm:w-40 h-40 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                        <Image src={blog.coverImage} fill alt={blog.title} className="object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="flex flex-col justify-between py-1">
                        <div className="space-y-1.5">
                            <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-gold-600 transition-colors line-clamp-2 leading-snug">
                            {blog.title}
                            </h4>
                            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed hidden sm:block">{blog.excerpt}</p>
                        </div>
                        <div className="flex items-center gap-3 text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-4 sm:mt-0">
                          <span className="bg-slate-100 px-2 py-1 rounded-md">{blog.category}</span>
                          <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-gold-500" /> Saved Item</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )) : (
                  <div className="p-10 bg-white rounded-[1.5rem] border border-slate-200/60 text-center space-y-3 shadow-sm">
                      <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                          <BookOpen className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-bold text-slate-900">No saved publications yet</p>
                      <p className="text-xs text-slate-500">Articles you save while browsing will appear here.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Col: Reviews / Stats */}
            <div className="lg:col-span-4 space-y-6">
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-500" /> Recent Activity
              </h3>
              <div className="space-y-4">
                {reviewedBlogs.length > 0 ? reviewedBlogs.map((blog) => (
                  <div key={blog.id} className="bg-white p-5 rounded-[1.5rem] border border-slate-200/60 shadow-sm space-y-3 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-1 text-gold-400">
                      <Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" />
                    </div>
                    <Link href={`/publications/${blog.slug}`} className="block text-sm font-bold text-slate-900 hover:text-gold-600 line-clamp-2 leading-snug">
                      {blog.title}
                    </Link>
                    <p className="text-xs text-slate-600 italic bg-slate-50 p-3 rounded-xl border border-slate-100 relative">
                        <span className="absolute -top-2 left-3 text-2xl text-slate-300 font-serif">"</span>
                        <span className="relative z-10">Excellent breakdown of the architecture, this saved me hours of debugging and research.</span>
                    </p>
                  </div>
                )) : (
                    <div className="p-8 bg-white rounded-[1.5rem] border border-slate-200/60 text-center space-y-3 shadow-sm">
                        <p className="text-sm font-bold text-slate-900">No recent activity</p>
                        <p className="text-xs text-slate-500">Comments and reviews will be displayed here.</p>
                    </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
