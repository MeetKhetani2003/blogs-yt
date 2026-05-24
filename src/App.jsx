import { RefreshCw, Share, X, Search, Play, CheckCircle, Menu, Award, PlaySquare, Edit3, Briefcase, Bookmark, FolderOpen, ArrowRight, PlayCircle, Send, CodeXml, Link, ArrowLeft, MessageSquare, Copy, Plus, ChevronRight, Heart, Eye, Code, Mail } from 'lucide-react';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import avatar from "./assets/avatar.jpeg"
const INITIAL_ARTICLES = [
    {
        id: 1,
        title: "The Renaissance of AI: Why Local LLMs are Dominating Developer Workflows",
        slug: "renaissance-of-local-llms",
        category: "Artificial Intelligence",
        categoryColor: "bg-amber-100 text-amber-800 border-amber-200",
        excerpt: "In 2026, privacy and localized compute have shifted the balance of power. Learn why engineers are deploying custom quantized language models locally instead of relying on high-latency cloud architectures.",
        body: "### Introduction to the Edge Shift\n\nFor years, cloud-hosted API models have dominated the artificial intelligence landscaoe. But a quiet revolution has taken place inside local terminal shells, lightweight docker containers, and custom neural processors on our workstations.\n\nToday, modern technology architecture is shifting drastically towards edge efficiency. Developers realize that paying round-trip server latency, subscription premiums, and risking sensitive workspace data with centralized engines isn't always the smart move.\n\n### Why Local Quantization Matters\n\nQuantization techniques (such as GGUF and AWQ formats) allow massive models with billions of variables to run with high throughput on local hardware without compromising output depth. A modern workstation with unified memory can effortlessly stream 4-bit or 8-bit quantized iterations of top models.\n\n```python\n# Instantiating a local neural pipeline with high quantization compression\nfrom transformers import AutoModelForCausalLM, AutoTokenizer\n\nmodel_id = \"technical-rahul-pandey/local-titanium-8b-instruct\"\ntokenizer = AutoTokenizer.from_pretrained(model_id)\nmodel = AutoModelForCausalLM.from_pretrained(\n    model_id,\n    device_map=\"auto\",\n    load_in_4bit=True\n)\n\nquery = \"Simplify modern quantum decryption mechanisms for developers\"\ninputs = tokenizer(query, return_tensors=\"pt\").to(\"cuda\")\noutputs = model.generate(**inputs, max_new_tokens=150)\nprint(tokenizer.decode(outputs[0], skip_special_tokens=True))\n```\n\n### The Operational and Financial Benefits\n\nLet us break down why this architectural pattern is extremely effective:\n1. **Zero Marginal Costs**: Run continuous development operations without API billing shock.\n2. **Extreme Data Isolation**: Compliance, code signatures, and personal databases never leave your physical workstation.\n3. **Network Independence**: Code seamlessly during flight layovers, field locations, or remote workspace getaways.\n\nWe are only starting to see the profound implications of local offline tooling. By simplifying technology mechanics, we enable every enthusiast to experiment and deploy state-of-the-art platforms securely.",
        readTime: "7 min read",
        author: {
            name: "Rahul Pandey",
            role: "Chief Content Architect",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
        },
        publishDate: "May 20, 2026",
        coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
        likes: 342,
        isFeatured: true,
        layoutType: "hero"
    },
    {
        id: 2,
        title: "Mastering Next-Gen Layouts: Container Queries & Fluid Space Architectures",
        slug: "container-queries-fluid-space",
        category: "Web Development",
        categoryColor: "bg-blue-100 text-blue-800 border-blue-200",
        excerpt: "Move beyond standard responsive viewports. Learn how container-relative sizing allows modern designers to build fluid digital components that adapt seamlessly inside complex Bento grids.",
        body: "### Redefining Component Responsiveness\n\nHistorically, responsive web design meant listening to the total screen width via `@media` media queries. However, this approach broke down when building modular design systems where the same card component needs to adapt cleanly within a large main page container, a narrow side navigation panel, or a multi-column dashboard grid.\n\n```css\n/* Designing responsive cards that listen directly to their parent dimensions */\n.grid-item-container {\n  container-type: inline-size;\n  container-name: product-card;\n}\n\n@container product-card (min-width: 450px) {\n  .card-layout {\n    display: flex;\n    gap: 2rem;\n    align-items: center;\n  }\n  .card-excerpt {\n    display: block;\n  }\n}\n```\n\n### The Golden Rules of Fluid Typography\n\nCombining container queries with clamp rules creates robust visual harmony. Typography dynamically scales in direct relationship to its micro-environment, preventing layout breaks and ensuring beautiful spacing regardless of user screen density.",
        readTime: "5 min read",
        author: {
            name: "Rahul Pandey",
            role: "Chief Content Architect",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
        },
        publishDate: "May 18, 2026",
        coverImage: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80",
        likes: 198,
        isFeatured: false,
        layoutType: "medium"
    },
    {
        id: 3,
        title: "How to Build a High-Trust Tech Platform: The Creator Blueprint",
        slug: "high-trust-tech-platform-creator",
        category: "Creator Economy",
        categoryColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
        excerpt: "In an era of generic AI content, authentic authority is the ultimate competitive advantage. This blueprint breaks down content-structuring systems that establish deep credibility.",
        body: "### Credibility as the Ultimate Tech Currency\n\nWhen standard articles can be mass-produced in mere seconds, why do readers return to premium publications? The answer is simple: **High-Trust Technical Curation**.\n\n### The Core Content Pillars\n1. **First-Principles Simplification**: Stripping away technical jargon to explain concepts via intuitive real-world metaphors.\n2. **Hands-On Failure Reports**: Highlighting developer mistakes and visual architectural failures.\n3. **Direct Actionability**: Ensuring readers can implement your tutorials on their own setups with zero friction.",
        readTime: "6 min read",
        author: {
            name: "Rahul Pandey",
            role: "Chief Content Architect",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
        },
        publishDate: "May 15, 2026",
        coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
        likes: 275,
        isFeatured: false,
        layoutType: "medium"
    },
    {
        id: 4,
        title: "Optimizing Client-Side Performance in React: Beyond useMemo",
        slug: "optimizing-react-performance-beyond-usememo",
        category: "React Architecture",
        categoryColor: "bg-purple-100 text-purple-800 border-purple-200",
        excerpt: "Discover modern DOM virtualization strategies, state partitioning tricks, and light-weight rendering engines to achieve smooth 60 FPS performance on complex interfaces.",
        body: "React's reactivity model is powerful, but over-optimizing with memoization everywhere can degrade script parsing performance. Focus on DOM virtualization and keeping state close to consumers for optimal visual responsiveness.",
        readTime: "4 min read",
        author: {
            name: "Rahul Pandey",
            role: "Chief Content Architect",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
        },
        publishDate: "May 12, 2026",
        coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=400&q=80",
        likes: 154,
        isFeatured: false,
        layoutType: "small"
    },
    {
        id: 5,
        title: "The Ultimate Developer Workspace Setups for Cognitive Focus",
        slug: "ultimate-developer-workspace-cognitive-focus",
        category: "Productivity",
        categoryColor: "bg-rose-100 text-rose-800 border-rose-200",
        excerpt: "Analyze physical workspace configurations, ergonomic desk frameworks, dynamic lighting, and digital workspace layouts that reduce daily cognitive load.",
        body: "Physical environments directly impact creative performance. Optimize your workspace with task-oriented lighting and ergonomic sit-to-stand intervals for better cognitive flow.",
        readTime: "8 min read",
        author: {
            name: "Rahul Pandey",
            role: "Chief Content Architect",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
        },
        publishDate: "May 10, 2026",
        coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=400&q=80",
        likes: 220,
        isFeatured: false,
        layoutType: "small"
    },
    {
        id: 6,
        title: "Unveiling Modern CSS Scroll-Driven Interactive Animations",
        slug: "modern-css-scroll-driven-animations",
        category: "Web Design",
        categoryColor: "bg-cyan-100 text-cyan-800 border-cyan-200",
        excerpt: "Explore the new native CSS scroll-driven animation specifications. Animate visual components purely using browser rendering logic without relying on external libraries.",
        body: "Native scroll-driven animations unlock incredible UI performance by bypassing the main JS thread, allowing high-fidelity page scroll behaviors at a smooth 120Hz.",
        readTime: "5 min read",
        author: {
            name: "Rahul Pandey",
            role: "Chief Content Architect",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
        },
        publishDate: "May 08, 2026",
        coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80",
        likes: 310,
        isFeatured: false,
        layoutType: "small"
    },
    {
        id: 7,
        title: "Deconstructing the Apple Ecosystem Sync Engineering Protocol",
        slug: "apple-ecosystem-sync-engineering-protocol",
        category: "Product Architecture",
        categoryColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
        excerpt: "Analyze the technical mechanics of Universal Control and dynamic device discovery across the Apple network. Simplifying multi-screen interactions.",
        body: "Apple's seamless handoff operations rely on a beautifully integrated blend of Bluetooth Low Energy, Wi-Fi Direct Peer-to-Peer protocols, and cryptographically verified iCloud tokens.",
        readTime: "9 min read",
        author: {
            name: "Rahul Pandey",
            role: "Chief Content Architect",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
        },
        publishDate: "May 05, 2026",
        coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
        likes: 187,
        isFeatured: false,
        layoutType: "small"
    }
];

function App() {
    // Main Navigation States: 'home' | 'articles' | 'article-view' | 'admin'
    const [activeTab, setActiveTab] = useState('home');
    const [selectedArticleId, setSelectedArticleId] = useState(1);
    const [articles, setArticles] = useState(INITIAL_ARTICLES);

    // Search & Filter state for 'articles' section
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [bookmarks, setBookmarks] = useState([1, 3]);

    // Custom Notification System state
    const [notifications, setNotifications] = useState([]);

    // Newsletter subscription state
    const [subscriberEmail, setSubscriberEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    // Dashboard & Writer state
    const [editorTitle, setEditorTitle] = useState('');
    const [editorExcerpt, setEditorExcerpt] = useState('');
    const [editorBody, setEditorBody] = useState('');
    const [editorCategory, setEditorCategory] = useState('Technology');
    const [editorCoverImage, setEditorCoverImage] = useState('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80');
    const [editorReadTime, setEditorReadTime] = useState('5 min read');
    const [isSaving, setIsSaving] = useState(false);

    // Mock Interactive Analytics states
    const [metrics, setMetrics] = useState({
        totalViews: 142830,
        readRatio: 74.2,
        subscribers: 12480,
        activeReaders: 42
    });

    // Comments system state
    const [articleComments, setArticleComments] = useState({
        1: [
            { id: 101, author: "Vikram Malhotra", content: "This is a masterpiece breakdown of quantized models. Running Llama-3 locally has saved our dev team over $1200 a month in subscription costs.", date: "2 days ago" },
            { id: 102, author: "Sania Sen", content: "The python code snippet worked perfectly on my RTX 4090 station. Extremely clear explanation of AWQ quant techniques!", date: "1 day ago" }
        ],
        2: [
            { id: 201, author: "Devon Lane", content: "Container queries completely solve standard micro-layout issues in complex web dashboards. Phenomenal writing!", date: "5 days ago" }
        ]
    });

    const [newCommentAuthor, setNewCommentAuthor] = useState('');
    const [newCommentContent, setNewCommentContent] = useState('');

    useEffect(() => {
        const cursorDot = document.getElementById('cursor-dot');
        const cursorGlow = document.getElementById('cursor-glow');

        const handleMouseMove = (e) => {
            if (cursorDot && cursorGlow) {
                cursorDot.style.left = `${e.clientX}px`;
                cursorDot.style.top = `${e.clientY}px`;

                cursorGlow.style.left = `${e.clientX}px`;
                cursorGlow.style.top = `${e.clientY}px`;
            }
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            // Check if hovering interactive elements for custom expansion state
            if (target.closest('button') || target.closest('a') || target.closest('.interactive-card')) {
                if (cursorDot) {
                    cursorDot.style.width = '40px';
                    cursorDot.style.height = '40px';
                    cursorDot.style.backgroundColor = 'rgba(245, 180, 0, 0.15)';
                    cursorDot.style.borderColor = '#F5B400';
                    cursorDot.style.borderWidth = '2px';
                }
            }
        };

        const handleMouseOut = (e) => {
            const target = e.target;
            if (target.closest('button') || target.closest('a') || target.closest('.interactive-card')) {
                if (cursorDot) {
                    cursorDot.style.width = '20px';
                    cursorDot.style.height = '20px';
                    cursorDot.style.backgroundColor = 'rgba(245, 180, 0, 0.3)';
                    cursorDot.style.borderWidth = '0px';
                }
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mouseout', handleMouseOut);

        // Setup dynamic metrics tick simulation
        const interval = setInterval(() => {
            setMetrics(prev => ({
                ...prev,
                activeReaders: Math.max(28, Math.min(65, prev.activeReaders + (Math.random() > 0.5 ? 2 : -2)))
            }));
        }, 5000);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mouseout', handleMouseOut);
            clearInterval(interval);
        };
    }, []);

    // Helper to trigger floating notifications
    const triggerNotification = (message, type = 'success') => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setNotifications(prev => prev.filter(item => item.id !== id));
        }, 4000);
    };

    const toggleBookmark = (id, event) => {
        event.stopPropagation();
        if (bookmarks.includes(id)) {
            setBookmarks(prev => prev.filter(bId => bId !== id));
            triggerNotification("Removed from reading list", "info");
        } else {
            setBookmarks(prev => [...prev, id]);
            triggerNotification("Added to reading list", "success");
        }
    };

    const selectedArticle = useMemo(() => {
        return articles.find(art => art.id === selectedArticleId) || articles[0];
    }, [articles, selectedArticleId]);

    const categories = ['All', 'Artificial Intelligence', 'Web Development', 'React Architecture', 'Productivity', 'Creator Economy', 'Web Design'];

    // Filter logic
    const filteredArticles = useMemo(() => {
        return articles.filter(art => {
            const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [articles, searchQuery, selectedCategory]);

    // Handle newsletter form subscription
    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!subscriberEmail || !subscriberEmail.includes('@')) {
            triggerNotification("Please enter a valid email address.", "error");
            return;
        }
        setIsSubscribed(true);
        setMetrics(prev => ({ ...prev, subscribers: prev.subscribers + 1 }));
        triggerNotification("Successfully joined the inner circle!", "success");
    };

    // Publishing a new blog from workspace
    const handlePublishBlog = (e) => {
        e.preventDefault();
        if (!editorTitle || !editorExcerpt || !editorBody) {
            triggerNotification("Please complete all article fields.", "error");
            return;
        }

        setIsSaving(true);

        setTimeout(() => {
            const newArticle = {
                id: articles.length + 1,
                title: editorTitle,
                slug: editorTitle.toLowerCase().replace(/[^a-z0-8 ]/g, '').replace(/\s+/g, '-'),
                category: editorCategory,
                categoryColor: "bg-amber-100 text-amber-800 border-amber-200",
                excerpt: editorExcerpt,
                body: editorBody,
                readTime: editorReadTime,
                author: {
                    name: "Rahul Pandey",
                    role: "Chief Content Architect",
                    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                },
                publishDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                coverImage: editorCoverImage,
                likes: 12,
                isFeatured: false,
                layoutType: "small"
            };

            setArticles(prev => [newArticle, ...prev]);

            // Increment workspace numbers dynamically
            setMetrics(prev => ({
                ...prev,
                totalViews: prev.totalViews + 500
            }));

            setIsSaving(false);
            // Clear inputs
            setEditorTitle('');
            setEditorExcerpt('');
            setEditorBody('');

            triggerNotification("Your new article was successfully published!", "success");
            // Route to newly added blog instantly
            setSelectedArticleId(newArticle.id);
            setActiveTab('article-view');
        }, 1500);
    };

    const handleAddComment = (e) => {
        e.preventDefault();
        if (!newCommentAuthor.trim() || !newCommentContent.trim()) {
            triggerNotification("Please fill in both name and comment.", "error");
            return;
        }

        const newCommentObj = {
            id: Date.now(),
            author: newCommentAuthor,
            content: newCommentContent,
            date: "Just now"
        };

        setArticleComments(prev => ({
            ...prev,
            [selectedArticleId]: [newCommentObj, ...(prev[selectedArticleId] || [])]
        }));

        setNewCommentAuthor('');
        setNewCommentContent('');
        triggerNotification("Comment published!", "success");
    };

    return (
        <div className="min-h-screen flex flex-col relative selection:bg-gold-500 selection:text-white">

            {/* Floating Premium Dynamic Notifications */}
            <div className="fixed top-24 right-6 z-[10000] flex flex-col gap-3 pointer-events-none max-w-sm w-full">
                {notifications.map(n => (
                    <div key={n.id} className="pointer-events-auto flex items-center gap-3 p-4 rounded-xl shadow-xl glass-card border-l-4 border-l-gold-500 transform animate-bounce transition-all">
                        <span className="flex-1 text-sm font-medium text-textPrimary">{n.message}</span>
                        <button onClick={() => setNotifications(prev => prev.filter(item => item.id !== n.id))} className="text-gray-400 hover:text-gray-900">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>

            {/* Top Premium Sticky Header navigation */}
            <header className="sticky top-0 left-0 right-0 z-50 glass-card border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
                    {/* Logo Icon with accent rings */}
                    <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-gold-500 to-accent-red flex items-center justify-center text-white font-extrabold text-xl shadow-lg">
                        TR
                        <div className="absolute -inset-1 rounded-xl border border-gold-400/30 animate-ping pointer-events-none"></div>
                    </div>
                    <div>
                        <h1 className="text-base font-bold tracking-tight text-textPrimary flex items-center gap-2">
                            Technical Rahul Pandey
                            <span className="bg-gold-100 text-gold-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-gold-400/20">PRO</span>
                        </h1>
                        <p className="text-[10px] text-textSecondary uppercase tracking-widest font-semibold">Technology Simplified</p>
                    </div>
                </div>

                {/* Navigation Menus with subtle micro-interactions */}
                <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/50">
                    <button
                        onClick={() => setActiveTab('home')}
                        className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-300 ${activeTab === 'home' ? 'bg-white text-textPrimary shadow-sm' : 'text-textSecondary hover:text-textPrimary'}`}
                    >
                        Home
                    </button>
                    <button
                        onClick={() => setActiveTab('articles')}
                        className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-300 ${activeTab === 'articles' || activeTab === 'article-view' ? 'bg-white text-textPrimary shadow-sm' : 'text-textSecondary hover:text-textPrimary'}`}
                    >
                        Publications
                    </button>
                    <button
                        onClick={() => setActiveTab('admin')}
                        className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-300 flex items-center gap-1.5 ${activeTab === 'admin' ? 'bg-white text-textPrimary shadow-sm' : 'text-textSecondary hover:text-textPrimary'}`}
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Creator Studio
                    </button>
                </nav>

                {/* Quick CTA Actions right */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => { setActiveTab('articles'); setSearchQuery(''); }}
                        className="p-2.5 rounded-xl hover:bg-slate-100 transition-colors text-textSecondary"
                        title="Search publications"
                    >
                        <Search className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setActiveTab('admin')}
                        className="hidden sm:flex items-center gap-2 bg-textPrimary text-white hover:bg-gold-500 hover:text-textPrimary px-4 py-2 rounded-xl text-xs font-semibold shadow-md transition-all duration-300 border border-slate-800"
                    >
                        <Plus className="w-4 h-4" /> Write Article
                    </button>
                    {/* Simple Mobile Menu Trigger */}
                    <button
                        onClick={() => setActiveTab(activeTab === 'home' ? 'articles' : 'home')}
                        className="md:hidden p-2 rounded-xl border border-gray-200"
                    >
                        <Menu className="w-5 h-5 text-textPrimary" />
                    </button>
                </div>
            </header>

            {/* Rendering Lucide icons after state change */}


            {/* MAIN PORTFOLIO/HUB CONTENT */}
            <main className="flex-grow">
                {activeTab === 'home' && (
                    <div className="animate-fadeIn">
                        {/* SUBTLE BACKDROP AMBIENT GLOW */}
                        <div className="absolute top-24 left-1/4 w-[500px] h-[500px] bg-gold-400/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow"></div>
                        <div className="absolute top-[80vh] right-1/4 w-[600px] h-[600px] bg-accent-red/5 rounded-full blur-[150px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }}></div>

                        {/* HERO HEROIC SECTION */}
                        <section className="relative min-h-[90vh] flex items-center px-6 lg:px-20 py-12 lg:py-0 border-b border-gray-100 bg-gradient-to-b from-white to-slate-50/50">
                            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                                {/* LEFT HERO METRICS AND ACTION HEADLINE */}
                                <div className="lg:col-span-7 flex flex-col justify-center space-y-8">

                                    {/* Beautiful Editorial Badge */}
                                    <div className="inline-flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200/60 w-fit">
                                        <span className="flex h-2 w-2 relative">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
                                        </span>
                                        <span className="text-[11px] font-bold text-textPrimary tracking-wider uppercase">Simplifying Complex Systems</span>
                                    </div>

                                    {/* Huge Masterful Typography Headline */}
                                    <div className="space-y-4">
                                        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-textPrimary">
                                            Learn Technology <br />
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 via-gold-400 to-accent-red">Like Never Before</span>
                                        </h2>
                                        <p className="text-base sm:text-lg text-textSecondary font-light leading-relaxed max-w-xl">
                                            Discover simplified engineering breakdowns, hands-on tutorials, cutting-edge AI architecture guides, and modern software reviews curated specifically for the modern builder.
                                        </p>
                                    </div>

                                    {/* Elite Call-To-Action buttons with liquid gradient effects */}
                                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                                        <button
                                            onClick={() => setActiveTab('articles')}
                                            className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-600 hover:to-amber-600 text-white shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 gold-border-gradient"
                                        >
                                            Explore Publications <ArrowRight className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => {
                                                const el = document.getElementById('youtube-showcase');
                                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                                            }}
                                            className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold bg-white hover:bg-slate-50 text-textPrimary border border-gray-200 shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                                        >
                                            <Play className="w-4 h-4 text-accent-red fill-accent-red" /> Watch Tutorials
                                        </button>
                                    </div>

                                    {/* Micro-Social Proof badges */}
                                    <div className="flex items-center gap-6 pt-6 border-t border-slate-100">
                                        <div>
                                            <p className="text-2xl font-black text-textPrimary">1.5M+</p>
                                            <p className="text-xs text-textSecondary uppercase tracking-widest font-semibold">Digital Reach</p>
                                        </div>
                                        <div className="w-[1px] h-10 bg-gray-200"></div>
                                        <div>
                                            <p className="text-2xl font-black text-textPrimary">100k+</p>
                                            <p className="text-xs text-textSecondary uppercase tracking-widest font-semibold">Subscribers</p>
                                        </div>
                                        <div className="w-[1px] h-10 bg-gray-200"></div>
                                        <div className="flex -space-x-2">
                                            <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Avatar" />
                                            <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Avatar" />
                                            <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Avatar" />
                                            <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-textPrimary">+12k</div>
                                        </div>
                                    </div>

                                </div>

                                {/* RIGHT HERO INTERACTIVE FLOATING PORTRAIT & BADGES */}
                                <div className="lg:col-span-5 relative flex justify-center items-center">
                                    {/* Complex Circular Orbit Background Lines */}
                                    <div className="absolute w-[360px] h-[360px] sm:w-[450px] sm:h-[450px] border border-dashed border-slate-200 rounded-full animate-spin" style={{ animationDuration: '40s' }}></div>
                                    <div className="absolute w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] border border-slate-100 rounded-full"></div>

                                    {/* Creator Showcase Main Portrait Component */}
                                    <div className="relative z-10 w-[260px] h-[360px] sm:w-[310px] sm:h-[430px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-tr from-gold-500 to-amber-300 p-1 group">
                                        <div className="w-full h-full rounded-[22px] overflow-hidden bg-slate-900 relative">
                                            {/* Custom Avatar Placeholder - Luxury Corporate Stylized Portrait */}
                                            <img
                                                src={avatar}
                                                alt="Technical Rahul Pandey Creator Portrait"
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-95"
                                            />

                                            {/* Dark Vignette Overlay with textual typography branding */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-6">
                                                <h4 className="text-white text-lg font-bold">Rahul Pandey</h4>
                                                <p className="text-gold-400 text-xs font-medium">Founder & Technical Architect</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* FLOATING SAAS METRICS AND LIVE BADGES ON 3D DEEP HOVER */}

                                    {/* Floating Badge Left: Live Visitor count */}
                                    <div className="absolute left-[-10px] top-[15%] z-20 glass-card p-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-200/50 animate-float-slow hover:scale-105 transition-transform">
                                        <div className="w-9 h-9 rounded-xl bg-gold-100 flex items-center justify-center text-gold-600">
                                            <Eye className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-textSecondary tracking-wider">Active Viewers</p>
                                            <p className="text-sm font-black text-textPrimary flex items-center gap-1.5">
                                                {metrics.activeReaders}0
                                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block"></span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Floating Badge Right: Tech Tools Coverage */}
                                    <div className="absolute right-[-15px] bottom-[25%] z-20 glass-card p-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-200/50 animate-float-medium hover:scale-105 transition-transform" style={{ animationDelay: '1s' }}>
                                        <div className="w-9 h-9 rounded-xl bg-accent-red/10 flex items-center justify-center text-accent-red">
                                            <Code className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-textSecondary tracking-wider">Simplifications</p>
                                            <p className="text-sm font-black text-textPrimary">200+ Guides</p>
                                        </div>
                                    </div>

                                    {/* Floating Badge Top Right: Excellence Badge */}
                                    <div className="absolute right-6 top-[5%] z-20 bg-slate-900 text-white p-2.5 rounded-full shadow-lg border border-slate-700 flex items-center justify-center animate-bounce">
                                        <Award className="w-5 h-5 text-gold-400" />
                                    </div>

                                </div>

                            </div>
                        </section>

                        { }
                        {/* LUXURY INTERACTIVE CATEGORIES */}
                        <section className="py-16 bg-white px-6 lg:px-20 border-b border-gray-100">
                            <div className="max-w-7xl mx-auto w-full">
                                <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
                                    <div>
                                        <p className="text-xs uppercase tracking-widest font-bold text-gold-600 mb-2">Curated Frameworks</p>
                                        <h3 className="text-3xl font-extrabold text-textPrimary">Targeted Content Centers</h3>
                                    </div>
                                    <p className="text-sm text-textSecondary max-w-sm mt-3 md:mt-0">
                                        Unlock detailed structured insights divided by strategic development topics. Designed to minimize searching and maximize deep understanding.
                                    </p>
                                </div>

                                {/* Category Bento Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {[
                                        { title: "Artificial Intelligence", desc: "Quantized Local LLMs, Neural pipelines, prompt systems, and fine-tuning engineering.", count: 24, icon: "cpu", color: "from-amber-500 to-gold-400" },
                                        { title: "Web Architecture", desc: "High-throughput React components, CSS layouts, and modern rendering engines.", count: 18, icon: "layers", color: "from-blue-600 to-cyan-400" },
                                        { title: "SaaS Dev Tools", desc: "Linear-style UI systems, local terminal environments, and custom database stacks.", count: 15, icon: "terminal", color: "from-purple-600 to-indigo-500" },
                                        { title: "Creator Strategy", desc: "Editorial blueprint, subscriber scale engines, and high-trust platform mechanics.", count: 12, icon: "sparkles", color: "from-emerald-600 to-teal-400" }
                                    ].map((cat, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => {
                                                setSelectedCategory(cat.title);
                                                setActiveTab('articles');
                                            }}
                                            className="group cursor-pointer glass-card p-6 rounded-2xl relative overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 border border-slate-100 hover:border-gold-400/20"
                                        >
                                            {/* Top colored accent line */}
                                            <div className={`absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r ${cat.color}`}></div>

                                            <div className="flex items-center justify-between mb-4">
                                                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/50 flex items-center justify-center text-slate-700 group-hover:bg-gold-500 group-hover:text-white transition-all duration-300">
                                                    <i data-lucide={cat.icon} className="w-5 h-5"></i>
                                                </div>
                                                <span className="text-xs font-bold text-textSecondary bg-slate-100 px-2.5 py-1 rounded-full group-hover:bg-gold-50 group-hover:text-gold-600 transition-colors">
                                                    {cat.count} Articles
                                                </span>
                                            </div>

                                            <h4 className="text-base font-bold text-textPrimary group-hover:text-gold-600 transition-colors">{cat.title}</h4>
                                            <p className="text-xs text-textSecondary mt-2 leading-relaxed">{cat.desc}</p>

                                            <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-gold-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                Browse Library <ChevronRight className="w-3.5 h-3.5" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        { }
                        {/* EDITORIAL ASYMMETRICAL MAGAZINE GRID */}
                        <section className="py-20 bg-slate-50/50 px-6 lg:px-20 border-b border-gray-100">
                            <div className="max-w-7xl mx-auto w-full">

                                <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
                                    <div>
                                        <p className="text-xs uppercase tracking-widest font-bold text-gold-600 mb-2">Magazine Layout</p>
                                        <h3 className="text-3xl font-extrabold text-textPrimary">Featured Technical Insights</h3>
                                    </div>
                                    <button
                                        onClick={() => { setSelectedCategory('All'); setActiveTab('articles'); }}
                                        className="text-sm font-bold text-gold-600 hover:text-gold-500 flex items-center gap-1 group mt-3 md:mt-0"
                                    >
                                        View all articles
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>

                                {/* Editorial Grid mapping */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                                    {/* Left Column: Big Hero Feature (Col-span 7) */}
                                    <div className="lg:col-span-7 flex flex-col justify-between">
                                        {articles.filter(a => a.id === 1).map(hero => (
                                            <div
                                                key={hero.id}
                                                onClick={() => { setSelectedArticleId(hero.id); setActiveTab('article-view'); }}
                                                className="group cursor-pointer glass-card rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between border border-slate-100"
                                            >
                                                <div className="relative aspect-[16/10] overflow-hidden">
                                                    <img
                                                        src={hero.coverImage}
                                                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                                                        alt={hero.title}
                                                    />
                                                    <div className="absolute top-4 left-4">
                                                        <span className="bg-slate-900/95 backdrop-blur-md text-white border border-slate-700/50 text-[10px] uppercase tracking-wider font-extrabold px-3 py-1.5 rounded-full">
                                                            {hero.category}
                                                        </span>
                                                    </div>
                                                    <button
                                                        onClick={(e) => toggleBookmark(hero.id, e)}
                                                        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-textSecondary hover:text-gold-500 shadow transition-colors"
                                                    >
                                                        <Bookmark />
                                                    </button>
                                                </div>

                                                <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                                                    <div className="space-y-3">
                                                        <div className="flex items-center gap-4 text-xs font-semibold text-textSecondary">
                                                            <span>{hero.publishDate}</span>
                                                            <span>•</span>
                                                            <span>{hero.readTime}</span>
                                                        </div>
                                                        <h4 className="text-2xl sm:text-3xl font-bold text-textPrimary leading-snug group-hover:text-gold-600 transition-colors">
                                                            {hero.title}
                                                        </h4>
                                                        <p className="text-sm text-textSecondary font-light leading-relaxed">
                                                            {hero.excerpt}
                                                        </p>
                                                    </div>

                                                    <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <img src={hero.author.avatar} className="w-9 h-9 rounded-full border border-gray-100" alt="Rahul Pandey" />
                                                            <div>
                                                                <p className="text-xs font-bold text-textPrimary">{hero.author.name}</p>
                                                                <p className="text-[10px] text-textSecondary">{hero.author.role}</p>
                                                            </div>
                                                        </div>
                                                        <span className="text-xs font-bold text-gold-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                                                            Read Article <ChevronRight className="w-4 h-4" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Right Column: 2 Medium Layout Articles (Col-span 5) */}
                                    <div className="lg:col-span-5 flex flex-col gap-8">
                                        {articles.filter(a => a.id === 2 || a.id === 3).map(art => (
                                            <div
                                                key={art.id}
                                                onClick={() => { setSelectedArticleId(art.id); setActiveTab('article-view'); }}
                                                className="group cursor-pointer glass-card rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex-1 flex flex-col justify-between border border-slate-100"
                                            >
                                                <div className="relative h-44 overflow-hidden">
                                                    <img
                                                        src={art.coverImage}
                                                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                                                        alt={art.title}
                                                    />
                                                    <div className="absolute top-3 left-3">
                                                        <span className="bg-slate-900/90 text-white text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full">
                                                            {art.category}
                                                        </span>
                                                    </div>
                                                    <button
                                                        onClick={(e) => toggleBookmark(art.id, e)}
                                                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-textSecondary hover:text-gold-500 shadow transition-colors"
                                                    >
                                                        <Bookmark />
                                                    </button>
                                                </div>

                                                <div className="p-6 flex-1 flex flex-col justify-between">
                                                    <div className="space-y-2 mb-4">
                                                        <div className="flex items-center gap-3 text-[11px] font-semibold text-textSecondary">
                                                            <span>{art.publishDate}</span>
                                                            <span>•</span>
                                                            <span>{art.readTime}</span>
                                                        </div>
                                                        <h5 className="text-lg font-bold text-textPrimary leading-snug group-hover:text-gold-600 transition-colors">
                                                            {art.title}
                                                        </h5>
                                                    </div>

                                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100/50">
                                                        <div className="flex items-center gap-2">
                                                            <img src={art.author.avatar} className="w-7 h-7 rounded-full" alt="Author" />
                                                            <span className="text-[11px] font-semibold text-textPrimary">{art.author.name}</span>
                                                        </div>
                                                        <span className="text-xs font-bold text-gold-600 flex items-center gap-1">
                                                            Read <ChevronRight className="w-3.5 h-3.5" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </div>

                                { }
                                {/* Remaining small articles (Row of 3 items) */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                                    {articles.filter(a => a.id > 3 && a.id <= 6).map(art => (
                                        <div
                                            key={art.id}
                                            onClick={() => { setSelectedArticleId(art.id); setActiveTab('article-view'); }}
                                            className="group cursor-pointer glass-card rounded-2xl p-5 shadow-sm hover:shadow-md transition-all border border-slate-100 flex flex-col justify-between"
                                        >
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[10px] font-extrabold text-gold-600 tracking-wider uppercase bg-gold-50 px-2 py-0.5 rounded border border-gold-200/50">
                                                        {art.category}
                                                    </span>
                                                    <button
                                                        onClick={(e) => toggleBookmark(art.id, e)}
                                                        className="text-textSecondary hover:text-gold-500"
                                                    >
                                                        <Bookmark />
                                                    </button>
                                                </div>
                                                <h5 className="text-base font-bold text-textPrimary leading-snug group-hover:text-gold-600 transition-colors">
                                                    {art.title}
                                                </h5>
                                                <p className="text-xs text-textSecondary line-clamp-2 leading-relaxed font-light">
                                                    {art.excerpt}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between pt-4 border-t border-slate-100/60 mt-4">
                                                <span className="text-[11px] text-textSecondary font-semibold">{art.publishDate}</span>
                                                <span className="text-[11px] text-gold-600 font-bold flex items-center gap-0.5">
                                                    View Guide <ChevronRight className="w-3 h-3" />
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </section>

                        { }
                        {/* INFINITE RUNNING SHOWER OF SYSTEM NEWS */}
                        <section className="py-6 border-y border-gray-100 bg-slate-900 text-white overflow-hidden relative">
                            <div className="flex whitespace-nowrap animate-marquee-infinite">
                                <div className="flex items-center gap-16 text-xs uppercase tracking-widest font-black text-slate-300 py-2">
                                    <span>⚡ TECHNOLOGY SIMPLIFIED FOR EVERYONE</span>
                                    <span>🔥 NEXT-GEN REACT ARCHITECTURE OUT NOW</span>
                                    <span>💎 SIMPLIFYING LOCAL QUANTIZED AI TOOLS</span>
                                    <span>🚀 REDEFINING THE DEVELOPER ECOSYSTEM</span>
                                    <span>💡 DETAILED FIRST-PRINCIPLES CODING PATHWAYS</span>
                                </div>
                                <div className="flex items-center gap-16 text-xs uppercase tracking-widest font-black text-slate-300 py-2">
                                    <span>⚡ TECHNOLOGY SIMPLIFIED FOR EVERYONE</span>
                                    <span>🔥 NEXT-GEN REACT ARCHITECTURE OUT NOW</span>
                                    <span>💎 SIMPLIFYING LOCAL QUANTIZED AI TOOLS</span>
                                    <span>🚀 REDEFINING THE DEVELOPER ECOSYSTEM</span>
                                    <span>💡 DETAILED FIRST-PRINCIPLES CODING PATHWAYS</span>
                                </div>
                            </div>
                        </section>

                        { }
                        {/* NETFLIX-STYLE PREMIUM VIDEO INSIGHTS GALLERY */}
                        <section id="youtube-showcase" className="py-20 bg-white px-6 lg:px-20 border-b border-gray-100">
                            <div className="max-w-7xl mx-auto w-full">

                                <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
                                    <div>
                                        <p className="text-xs uppercase tracking-widest font-bold text-accent-red mb-2">Visual Masterclasses</p>
                                        <h3 className="text-3xl font-extrabold text-textPrimary">Featured Screen Guides</h3>
                                    </div>
                                    <p className="text-sm text-textSecondary max-w-sm mt-3 md:mt-0">
                                        Visual demonstrations explaining complex computer networks, layout designs, and high-frequency deployment pipelines.
                                    </p>
                                </div>

                                {/* Large featured video card layout */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                                    {/* Big Video Showcase Screen (Col-span 7) */}
                                    <div className="lg:col-span-7 relative group rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-800">
                                        {/* Simulated custom high-end player mockup */}
                                        <div className="aspect-video w-full h-full relative">
                                            <img
                                                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80"
                                                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                                                alt="PlaySquare featured preview"
                                            />

                                            {/* Central Hover Play Button Trigger */}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-20 h-20 rounded-full bg-white text-accent-red flex items-center justify-center shadow-2xl scale-100 group-hover:scale-110 transition-transform duration-300 cursor-pointer">
                                                    <Play className="w-8 h-8 fill-accent-red translate-x-0.5" />
                                                </div>
                                            </div>

                                            {/* Custom Player Timeline bar overlays */}
                                            <div className="absolute bottom-4 left-6 right-6 flex items-center gap-3">
                                                <span className="text-white text-xs font-bold">12:35</span>
                                                <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                                                    <div className="w-1/3 h-full bg-gold-500 rounded-full"></div>
                                                </div>
                                                <span className="text-white/80 text-[10px] font-bold">LIVE METRIC SIMULATION</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Video Metadata / Video playlists (Col-span 5) */}
                                    <div className="lg:col-span-5 space-y-6">
                                        <div className="space-y-3">
                                            <span className="text-xs font-bold text-accent-red flex items-center gap-1">
                                                <PlaySquare className="w-4 h-4" /> VIDEO GUIDE SERIES
                                            </span>
                                            <h4 className="text-2xl font-black text-textPrimary leading-snug">
                                                Complete Local Large Language Model Deployment Framework
                                            </h4>
                                            <p className="text-sm text-textSecondary font-light leading-relaxed">
                                                Step-by-step visual roadmap breaking down parameters, local quant structures, setting up custom API inference endpoints, and running offline integrations.
                                            </p>
                                        </div>

                                        {/* Playlist items stack */}
                                        <div className="space-y-3">
                                            {[
                                                { id: "v1", title: "Configuring AWQ Quantization inside Docker Containers", length: "14:20" },
                                                { id: "v2", title: "Building next-generation UI with Container Query Hooks", length: "10:45" },
                                                { id: "v3", title: "Mastering system optimization for high frame rates", length: "18:15" }
                                            ].map(item => (
                                                <div
                                                    key={item.id}
                                                    className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-gold-300 hover:bg-gold-50/20 cursor-pointer transition-all"
                                                    onClick={() => triggerNotification(`Simulated launching course: ${item.title}`, "info")}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-accent-red">
                                                            <PlayCircle className="w-4 h-4" />
                                                        </div>
                                                        <span className="text-xs font-bold text-textPrimary max-w-xs truncate">{item.title}</span>
                                                    </div>
                                                    <span className="text-[10px] text-textSecondary font-semibold">{item.length}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </section>

                        { }
                        {/* CREATOR IMMERSIVE TIMELINE STORY */}
                        <section className="py-20 bg-slate-50/50 px-6 lg:px-20 border-b border-gray-100">
                            <div className="max-w-7xl mx-auto w-full">

                                <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
                                    <p className="text-xs uppercase tracking-widest font-bold text-gold-600">The Journey</p>
                                    <h3 className="text-3xl font-extrabold text-textPrimary">Deconstructing the Authority</h3>
                                    <p className="text-sm text-textSecondary font-light leading-relaxed">
                                        How Rahul Pandey simplified complex computing algorithms to design an inclusive visual creator space for millions of engineers globally.
                                    </p>
                                </div>

                                {/* Chronological Grid Pathway */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                                    {/* Absolute connector line */}
                                    <div className="hidden md:block absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-gold-400 via-amber-300 to-transparent z-0"></div>

                                    {[
                                        { year: "2018", step: "The Technical Genesis", text: "Started creating accessible technical code walk-throughs breaking down computer networks and dynamic memory management models." },
                                        { year: "2022", step: "1 Million Community Reach", text: "Scaled visual content distribution frameworks across multiple platforms. Developed actionable simplified structures for real-world setups." },
                                        { year: "2026", step: "The Premium Ecosystem", text: "Pioneering high-trust tech architectures, local model developments, and launching digital custom educational studios." }
                                    ].map((milestone, index) => (
                                        <div
                                            key={index}
                                            className="glass-card p-6 rounded-2xl border border-slate-100 shadow-sm relative z-10 hover:shadow-lg hover:-translate-y-1 transition-all"
                                        >
                                            <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-accent-red inline-block mb-3">
                                                {milestone.year}
                                            </span>
                                            <h5 className="text-base font-bold text-textPrimary mb-2">{milestone.step}</h5>
                                            <p className="text-xs text-textSecondary leading-relaxed font-light">{milestone.text}</p>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </section>

                        { }
                        {/* PREMIUM SaaS LANDING NEWSLETTER CARD */}
                        <section className="py-20 bg-white px-6 lg:px-20">
                            <div className="max-w-4xl mx-auto w-full">
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950 p-8 sm:p-12 text-white border border-slate-800">

                                    {/* Subdued ambient glowing visual balls in card */}
                                    <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>
                                    <div className="absolute -left-10 -top-10 w-60 h-60 bg-accent-red/10 rounded-full blur-3xl pointer-events-none"></div>

                                    <div className="relative z-10 max-w-xl space-y-6">
                                        <span className="bg-gold-500/20 text-gold-400 border border-gold-500/30 text-[9px] tracking-widest font-bold px-3 py-1 rounded-full uppercase inline-block">
                                            THE PRIVATE LIST
                                        </span>
                                        <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                                            Stay ahead of the curve. <br />
                                            Simplified technical updates.
                                        </h3>
                                        <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                                            Join a collective of over 12,000+ ambitious developers, creators, and technical engineers who receive weekly high-impact breakdowns. No spam, ever.
                                        </p>

                                        {!isSubscribed ? (
                                            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 pt-3">
                                                <div className="flex-1 relative">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                    <input
                                                        type="email"
                                                        value={subscriberEmail}
                                                        onChange={(e) => setSubscriberEmail(e.target.value)}
                                                        placeholder="Enter your personal email"
                                                        className="w-full pl-11 pr-4 py-3.5 bg-slate-900/80 border border-slate-700/60 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 placeholder:text-slate-500 transition-colors"
                                                    />
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="bg-gold-500 hover:bg-gold-600 text-slate-950 font-bold px-6 py-3.5 rounded-xl text-xs sm:text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
                                                >
                                                    Subscribe <ArrowRight className="w-4 h-4" />
                                                </button>
                                            </form>
                                        ) : (
                                            <div className="p-4 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center gap-3 text-gold-400 animate-fadeIn">
                                                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                                <span className="text-xs font-semibold">Welcome aboard! Your verification dispatch is en route.</span>
                                            </div>
                                        )}

                                        <p className="text-[10px] text-slate-500 font-medium">
                                            🔒 Verified data privacy mechanism. Unsubscribe with 1-click at any time.
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </section>
                    </div>
                )}

                {activeTab === 'articles' && (
                    <div className="py-12 bg-slate-50/50 min-h-[85vh] px-6 lg:px-20 animate-fadeIn">
                        <div className="max-w-7xl mx-auto w-full space-y-8">

                            {/* Header Info */}
                            <div className="space-y-3">
                                <p className="text-xs uppercase tracking-widest font-bold text-gold-600">The Directory</p>
                                <h2 className="text-3xl sm:text-5xl font-extrabold text-textPrimary tracking-tight">Technical Publications</h2>
                                <p className="text-sm text-textSecondary max-w-lg font-light leading-relaxed">
                                    Search and filter our complete technical collection of simplified tutorials and architectural insights in real time.
                                </p>
                            </div>

                            {/* STICKY SEARCH BAR & CATEGORY SELECTOR */}
                            <div className="glass-card p-4 rounded-2xl border border-slate-100 shadow-sm space-y-4 md:space-y-0 md:flex md:items-center md:gap-4 justify-between sticky top-[92px] z-30">

                                {/* Left Side: Input filter */}
                                <div className="relative flex-1 max-w-md">
                                    <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 w-4 h-4 text-textSecondary" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search by keyword, tag, or topic..."
                                        className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-textPrimary placeholder:text-textSecondary focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all"
                                    />
                                    {searchQuery && (
                                        <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary hover:text-textPrimary">
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>

                                {/* Right Side: Horizontal category scroll */}
                                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none max-w-full">
                                    {categories.map((cat, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${selectedCategory === cat ? 'bg-gold-500 text-slate-950 shadow-md' : 'bg-white hover:bg-slate-100 text-textSecondary border border-slate-200/60'}`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>

                            </div>

                            {/* SEARCH RESULTS METRICS */}
                            <div className="flex items-center justify-between text-xs text-textSecondary">
                                <span>Showing <strong className="text-textPrimary font-semibold">{filteredArticles.length}</strong> publications</span>
                                {selectedCategory !== 'All' && (
                                    <button
                                        onClick={() => setSelectedCategory('All')}
                                        className="text-gold-600 hover:text-gold-500 font-bold"
                                    >
                                        Clear Category Filter
                                    </button>
                                )}
                            </div>

                            {/* ARTICLES ARCHITECTURE LIST GRID */}
                            {filteredArticles.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {filteredArticles.map(art => (
                                        <div
                                            key={art.id}
                                            onClick={() => { setSelectedArticleId(art.id); setActiveTab('article-view'); }}
                                            className="group cursor-pointer glass-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-slate-100 flex flex-col justify-between"
                                        >
                                            <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                                                <img
                                                    src={art.coverImage}
                                                    alt={art.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                />
                                                <div className="absolute top-3 left-3">
                                                    <span className="bg-slate-900/90 text-white text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full">
                                                        {art.category}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={(e) => toggleBookmark(art.id, e)}
                                                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-textSecondary hover:text-gold-500 shadow transition-colors"
                                                >
                                                    <Bookmark />
                                                </button>
                                            </div>

                                            <div className="p-6 flex-1 flex flex-col justify-between">
                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-3 text-[10px] font-semibold text-textSecondary">
                                                        <span>{art.publishDate}</span>
                                                        <span>•</span>
                                                        <span>{art.readTime}</span>
                                                    </div>
                                                    <h3 className="text-lg font-bold text-textPrimary leading-snug group-hover:text-gold-600 transition-colors line-clamp-2">
                                                        {art.title}
                                                    </h3>
                                                    <p className="text-xs text-textSecondary font-light leading-relaxed line-clamp-3">
                                                        {art.excerpt}
                                                    </p>
                                                </div>

                                                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-6">
                                                    <div className="flex items-center gap-2">
                                                        <img src={art.author.avatar} className="w-6.5 h-6.5 rounded-full" alt="Author" />
                                                        <span className="text-[11px] font-semibold text-textPrimary">{art.author.name}</span>
                                                    </div>
                                                    <span className="text-xs font-bold text-gold-600 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                                                        Read Guide <ChevronRight className="w-3.5 h-3.5" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 space-y-4">
                                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto text-slate-400">
                                        <FolderOpen className="w-8 h-8" />
                                    </div>
                                    <h4 className="text-base font-bold text-textPrimary">No results found for your search</h4>
                                    <p className="text-xs text-textSecondary max-w-sm mx-auto">
                                        Try double-checking the spelling or toggle categories to browse general simplifications instead.
                                    </p>
                                    <button
                                        onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                                        className="bg-gold-500 hover:bg-gold-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-all"
                                    >
                                        Reset Filters
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>
                )}

                {activeTab === 'article-view' && (
                    <div className="bg-white min-h-[90vh] py-12 animate-fadeIn">

                        {/* ARTICLE SCROLL READING PROGRESS INDICATOR */}
                        <div className="fixed top-[84px] left-0 right-0 h-1 bg-slate-100 z-50">
                            <div className="h-full bg-gold-500 w-1/2"></div>
                        </div>

                        <div className="max-w-7xl mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 relative">

                            {/* LEFT SIDE: Back trigger + Float Share (Col-span 1) */}
                            <div className="lg:col-span-1 flex lg:flex-col lg:items-center gap-4 lg:pt-16">
                                <button
                                    onClick={() => setActiveTab('articles')}
                                    className="w-10 h-10 rounded-full border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-textSecondary hover:text-textPrimary transition-colors"
                                    title="Back to directory"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={(e) => toggleBookmark(selectedArticle.id, e)}
                                    className="w-10 h-10 rounded-full border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-textSecondary hover:text-gold-500 transition-colors"
                                    title="Bookmark"
                                >
                                    <Bookmark />
                                </button>
                                <button
                                    onClick={() => {
                                        document.execCommand('copy');
                                        triggerNotification("Article link saved to clipboard!", "success");
                                    }}
                                    className="w-10 h-10 rounded-full border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-textSecondary hover:text-textPrimary transition-colors"
                                    title="Copy link"
                                >
                                    <Link className="w-4 h-4" />
                                </button>
                            </div>

                            {/* MIDDLE SIDE: Prime Editorial Content View (Col-span 8) */}
                            <div className="lg:col-span-8 space-y-8">

                                {/* Main Meta Badging */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className="bg-gold-50 text-gold-600 border border-gold-400/20 text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full">
                                            {selectedArticle.category}
                                        </span>
                                        <span className="text-xs text-textSecondary font-medium">{selectedArticle.readTime}</span>
                                    </div>

                                    <h1 className="text-3xl sm:text-5xl font-extrabold text-textPrimary leading-[1.12] tracking-tight">
                                        {selectedArticle.title}
                                    </h1>

                                    <p className="text-lg text-textSecondary font-light leading-relaxed italic">
                                        "{selectedArticle.excerpt}"
                                    </p>
                                </div>

                                {/* Author card presentation */}
                                <div className="flex items-center gap-4 py-4 border-y border-slate-100">
                                    <img src={selectedArticle.author.avatar} className="w-11 h-11 rounded-full border border-gray-100" alt="Rahul Pandey" />
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-textPrimary">{selectedArticle.author.name}</p>
                                        <p className="text-xs text-textSecondary">{selectedArticle.author.role}</p>
                                    </div>
                                    <div className="text-right text-xs text-textSecondary">
                                        <p className="font-semibold text-textPrimary">Published</p>
                                        <p>{selectedArticle.publishDate}</p>
                                    </div>
                                </div>

                                {/* Hero Featured Image with caption */}
                                <div className="rounded-3xl overflow-hidden shadow-md">
                                    <img src={selectedArticle.coverImage} className="w-full h-auto object-cover max-h-[450px]" alt="Hero Cover" />
                                </div>

                                { }
                                {/* CORE ARTICLE TYPOGRAPHY BODY */}
                                <article className="prose max-w-none text-textPrimary font-body text-base sm:text-lg leading-relaxed space-y-6">
                                    {selectedArticle.body ? (
                                        selectedArticle.body.split('\n\n').map((para, index) => {
                                            // Simple headers rendering
                                            if (para.startsWith('### ')) {
                                                return <h3 key={index} className="text-xl sm:text-2xl font-bold text-textPrimary pt-4 pb-2 border-b border-slate-100">{para.replace('### ', '')}</h3>;
                                            }
                                            // Simple lists rendering
                                            if (para.startsWith('1. ') || para.startsWith('2. ') || para.startsWith('3. ')) {
                                                return (
                                                    <div key={index} className="pl-4 border-l-2 border-gold-400 my-2 text-sm text-textSecondary space-y-1">
                                                        <p>{para}</p>
                                                    </div>
                                                );
                                            }
                                            // Simple Code Blocks parser
                                            if (para.startsWith('```')) {
                                                const cleanCode = para.replace(/```[a-z]*/g, '').trim();
                                                return (
                                                    <div key={index} className="relative bg-slate-900 text-slate-100 p-5 rounded-2xl overflow-x-auto font-mono text-xs sm:text-sm my-6 border border-slate-800 shadow-lg">
                                                        <button
                                                            onClick={() => {
                                                                document.execCommand('copy');
                                                                triggerNotification("Source code copied!", "success");
                                                            }}
                                                            className="absolute right-3 top-3 bg-slate-800 hover:bg-slate-700 text-slate-300 p-1.5 rounded-lg border border-slate-700 transition-colors"
                                                            title="Copy code"
                                                        >
                                                            <Copy className="w-4.5 h-4.5" />
                                                        </button>
                                                        <pre>{cleanCode}</pre>
                                                    </div>
                                                );
                                            }
                                            // Paragraph
                                            return <p key={index} className="font-light text-textSecondary leading-relaxed">{para}</p>;
                                        })
                                    ) : (
                                        <p className="text-textSecondary">Content drafting in workspace progress.</p>
                                    )}
                                </article>

                                {/* Like / Share Trigger Actions */}
                                <div className="flex items-center gap-4 pt-8 border-t border-slate-100">
                                    <button
                                        onClick={() => triggerNotification("Thank you for supporting technical education!", "success")}
                                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 hover:border-gold-400 text-textSecondary hover:text-gold-600 transition-colors text-xs font-bold"
                                    >
                                        <Heart className="w-4 h-4 text-accent-red" /> {selectedArticle.likes} Appreciations
                                    </button>
                                    <button
                                        onClick={() => triggerNotification("Copied share token link!", "info")}
                                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-textSecondary hover:text-textPrimary transition-colors text-xs font-bold"
                                    >
                                        <Share className="w-4 h-4" /> Share
                                    </button>
                                </div>

                                { }
                                {/* COMMENTS SECTION DESIGN */}
                                <section className="pt-12 space-y-6">
                                    <h4 className="text-xl font-bold text-textPrimary flex items-center gap-2">
                                        Discussion Board
                                        <span className="bg-slate-100 text-textSecondary text-xs px-2.5 py-0.5 rounded-full font-semibold">
                                            {(articleComments[selectedArticle.id] || []).length} Comments
                                        </span>
                                    </h4>

                                    {/* Publish new comment form */}
                                    <form onSubmit={handleAddComment} className="glass-card p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                                        <p className="text-xs font-bold text-textPrimary">Join the tech discussion</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            <input
                                                type="text"
                                                value={newCommentAuthor}
                                                onChange={(e) => setNewCommentAuthor(e.target.value)}
                                                placeholder="Your Name"
                                                className="sm:col-span-1 p-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-textPrimary focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all"
                                            />
                                            <input
                                                type="text"
                                                value={newCommentContent}
                                                onChange={(e) => setNewCommentContent(e.target.value)}
                                                placeholder="Write a constructive, thoughtful comment..."
                                                className="sm:col-span-2 p-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-textPrimary focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all"
                                            />
                                        </div>
                                        <div className="flex justify-end">
                                            <button
                                                type="submit"
                                                className="bg-textPrimary hover:bg-gold-500 hover:text-slate-950 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors flex items-center gap-1.5"
                                            >
                                                Publish Comment <Send className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </form>

                                    {/* Comment Feed */}
                                    <div className="space-y-4">
                                        {(articleComments[selectedArticle.id] || []).map(comment => (
                                            <div key={comment.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs font-bold text-textPrimary">{comment.author}</span>
                                                    <span className="text-[10px] text-textSecondary">{comment.date}</span>
                                                </div>
                                                <p className="text-xs sm:text-sm text-textSecondary leading-relaxed font-light">{comment.content}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                            </div>

                            {/* RIGHT SIDE: Dynamic sticky Table of Content (Col-span 3) */}
                            <div className="hidden lg:col-span-3 lg:block">
                                <div className="sticky top-[160px] space-y-8">

                                    {/* Table of Content Links */}
                                    <div className="space-y-4">
                                        <p className="text-xs uppercase tracking-widest font-extrabold text-gold-600">Overview</p>
                                        <ul className="space-y-3 text-xs font-semibold text-textSecondary border-l border-slate-100 pl-4">
                                            <li className="text-gold-600 border-l border-gold-500 -ml-[17px] pl-4 cursor-pointer">Introduction</li>
                                            <li className="hover:text-textPrimary cursor-pointer transition-colors">Technical Architecture</li>
                                            <li className="hover:text-textPrimary cursor-pointer transition-colors">Quantization Metrics</li>
                                            <li className="hover:text-textPrimary cursor-pointer transition-colors">Implementation Pipeline</li>
                                            <li className="hover:text-textPrimary cursor-pointer transition-colors">Summary & Key Takeaways</li>
                                        </ul>
                                    </div>

                                    {/* Compact Author details card */}
                                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                                        <h5 className="text-xs font-extrabold text-textPrimary uppercase tracking-wider">About Author</h5>
                                        <p className="text-xs text-textSecondary leading-relaxed">
                                            Rahul Pandey publishes simplified breakdowns covering core operating mechanisms, artificial intelligence, and structural layouts.
                                        </p>
                                        <div className="flex items-center gap-2 pt-2">
                                            <button onClick={() => triggerNotification("Follow registered!", "success")} className="w-full bg-white hover:bg-gold-500 hover:text-slate-950 text-textPrimary border border-slate-200 font-bold py-1.5 rounded-lg text-[11px] transition-all">
                                                Follow
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                )}

                {activeTab === 'admin' && (
                    <div className="bg-slate-50 min-h-[90vh] py-10 px-6 lg:px-20 animate-fadeIn">
                        <div className="max-w-7xl mx-auto w-full space-y-8">

                            {/* Workspace Title & Live stats overview bar */}
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                        <p className="text-xs uppercase tracking-widest font-extrabold text-emerald-600">Platform Studio</p>
                                    </div>
                                    <h2 className="text-3xl font-black text-textPrimary">Creator Workspace</h2>
                                    <p className="text-xs text-textSecondary font-medium">Control panel and real-time editorial draft studio</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => triggerNotification("Analytics database refreshed!", "info")}
                                        className="bg-white hover:bg-slate-50 border border-slate-200 text-textPrimary font-bold p-2.5 rounded-xl shadow-sm text-xs flex items-center gap-1.5 transition-colors"
                                    >
                                        <RefreshCw className="w-4 h-4" /> Synchronize Data
                                    </button>
                                </div>
                            </div>

                            {/* INTERACTIVE METRICS GRID ROW */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    { title: "Digital Pageviews", count: metrics.totalViews.toLocaleString(), sub: "Last 30 days summary", icon: "activity", color: "text-amber-500" },
                                    { title: "Average Read Ratio", count: `${metrics.readRatio}%`, sub: "High editorial benchmark", icon: "percent", color: "text-blue-500" },
                                    { title: "Subscribers Club", count: metrics.subscribers.toLocaleString(), sub: "Verified global audience", icon: "users", color: "text-emerald-500" },
                                    { title: "Active Readers Now", count: metrics.activeReaders, sub: "Live metric estimation", icon: "zap", color: "text-rose-500" }
                                ].map((card, idx) => (
                                    <div key={idx} className="glass-card p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                                        <div className="space-y-1">
                                            <p className="text-[10px] uppercase font-bold text-textSecondary tracking-wider">{card.title}</p>
                                            <p className="text-2xl font-black text-textPrimary">{card.count}</p>
                                            <p className="text-[10px] text-emerald-600 font-semibold">{card.sub}</p>
                                        </div>
                                        <div className={`w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center ${card.color}`}>
                                            <i data-lucide={card.icon} className="w-5 h-5"></i>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            { }
                            {/* LIVE SVG ANALYTICS GRAPH */}
                            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="text-sm font-bold text-textPrimary">Readership Expansion Traffic</h4>
                                        <p className="text-[10px] text-textSecondary">Real-time dynamic traffic routing vectors</p>
                                    </div>
                                    <div className="flex items-center gap-3 text-[10px] font-bold text-textSecondary">
                                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-gold-400 rounded-full"></span> Direct Search</span>
                                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-slate-400 rounded-full"></span> Referrals</span>
                                    </div>
                                </div>

                                {/* Premium SVG Simulated Line Chart */}
                                <div className="relative w-full h-48 bg-slate-50 rounded-2xl overflow-hidden p-4">
                                    <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                                        {/* Grid Horizontal Guide Lines */}
                                        <line x1="0" y1="50" x2="800" y2="50" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="5,5" />
                                        <line x1="0" y1="100" x2="800" y2="100" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="5,5" />
                                        <line x1="0" y1="150" x2="800" y2="150" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="5,5" />

                                        {/* Smooth Vector Chart Path */}
                                        <path
                                            d="M0,160 Q100,60 200,140 T400,80 T600,120 T800,40"
                                            fill="none"
                                            stroke="#F5B400"
                                            strokeWidth="4"
                                            className="animate-pulse"
                                        />
                                        <path
                                            d="M0,160 Q100,60 200,140 T400,80 T600,120 T800,40 L800,200 L0,200 Z"
                                            fill="url(#goldGrad)"
                                            opacity="0.1"
                                        />

                                        <defs>
                                            <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#F5B400" />
                                                <stop offset="100%" stopColor="#FFFFFF" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <div className="absolute left-4 bottom-2 text-[10px] font-bold text-textSecondary">Mon</div>
                                    <div className="absolute left-1/4 bottom-2 text-[10px] font-bold text-textSecondary">Wed</div>
                                    <div className="absolute left-1/2 bottom-2 text-[10px] font-bold text-textSecondary">Fri</div>
                                    <div className="absolute right-4 bottom-2 text-[10px] font-bold text-textSecondary">Sun</div>
                                </div>
                            </div>

                            {/* SPLIT LAYOUT: WRITER STUDIO (LEFT: INPUTS, RIGHT: LIVE PREVIEW) */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                                {/* WRITER INPUT PANEL (Col-span 7) */}
                                <form onSubmit={handlePublishBlog} className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                                    <div className="border-b border-slate-100 pb-4">
                                        <h3 className="text-lg font-bold text-textPrimary flex items-center gap-2">
                                            <Edit3 className="w-5 h-5 text-gold-500" />
                                            Publishing Engine
                                        </h3>
                                        <p className="text-xs text-textSecondary">Compile raw tech thoughts into stylized, responsive technical publications</p>
                                    </div>

                                    {/* Title block */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-textPrimary uppercase tracking-wider">Publication Title</label>
                                        <input
                                            type="text"
                                            required
                                            value={editorTitle}
                                            onChange={(e) => setEditorTitle(e.target.value)}
                                            placeholder="e.g. Quantizing Llama-3 Models on local workstation arrays"
                                            className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-textPrimary focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 focus:bg-white transition-all"
                                        />
                                    </div>

                                    {/* Category & Read Time Selection */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-textPrimary uppercase tracking-wider">Technical Tag</label>
                                            <select
                                                value={editorCategory}
                                                onChange={(e) => setEditorCategory(e.target.value)}
                                                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-textPrimary focus:outline-none focus:border-gold-400 focus:bg-white transition-all"
                                            >
                                                <option value="Artificial Intelligence">Artificial Intelligence</option>
                                                <option value="Web Development">Web Development</option>
                                                <option value="React Architecture">React Architecture</option>
                                                <option value="Productivity">Productivity</option>
                                                <option value="Creator Economy">Creator Economy</option>
                                                <option value="Web Design">Web Design</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-textPrimary uppercase tracking-wider">Read Duration Estimation</label>
                                            <input
                                                type="text"
                                                required
                                                value={editorReadTime}
                                                onChange={(e) => setEditorReadTime(e.target.value)}
                                                placeholder="e.g. 5 min read"
                                                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-textPrimary focus:outline-none focus:border-gold-400 focus:bg-white transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Cover image string selection */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-textPrimary uppercase tracking-wider">Curated Cover Image</label>
                                        <input
                                            type="text"
                                            required
                                            value={editorCoverImage}
                                            onChange={(e) => setEditorCoverImage(e.target.value)}
                                            placeholder="Unsplash high-definition tech image url..."
                                            className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-textPrimary focus:outline-none focus:border-gold-400 focus:bg-white transition-all"
                                        />
                                        <p className="text-[10px] text-textSecondary">Provide a valid high-fidelity background image URL representing your core publication topic.</p>
                                    </div>

                                    {/* Excerpt block */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-textPrimary uppercase tracking-wider">Short Editorial Catchphrase</label>
                                        <input
                                            type="text"
                                            required
                                            value={editorExcerpt}
                                            onChange={(e) => setEditorExcerpt(e.target.value)}
                                            placeholder="Summarize the core engineering takeaway in 2 lines..."
                                            className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-textPrimary focus:outline-none focus:border-gold-400 focus:bg-white transition-all"
                                        />
                                    </div>

                                    {/* Body text block */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <label className="text-xs font-bold text-textPrimary uppercase tracking-wider">Structured Content Markdown Body</label>
                                            <span className="text-[10px] text-textSecondary font-semibold">Markdown supported</span>
                                        </div>
                                        <textarea
                                            required
                                            value={editorBody}
                                            onChange={(e) => setEditorBody(e.target.value)}
                                            rows="8"
                                            placeholder="Use ### for header sections and insert python code inside ``` blocks to compile..."
                                            className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-textPrimary focus:outline-none focus:border-gold-400 focus:bg-white transition-all font-mono"
                                        ></textarea>
                                    </div>

                                    {/* Submit publisher button */}
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="w-full bg-slate-900 hover:bg-gold-500 hover:text-slate-950 text-white font-bold p-4 rounded-xl text-xs sm:text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        {isSaving ? (
                                            <>
                                                <span className="w-4 h-4 rounded-full border-2 border-slate-300 border-t-white animate-spin"></span>
                                                Compiling Publication Assets...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4" /> Publish Live Article
                                            </>
                                        )}
                                    </button>

                                </form>

                                { }
                                {/* WORKSPACE PREVIEW GLASS CANVAS (Col-span 5) */}
                                <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4 self-start">
                                    <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                                        <div>
                                            <h3 className="text-xs uppercase tracking-widest font-extrabold text-gold-600">Dynamic Preview Output</h3>
                                            <p className="text-[10px] text-textSecondary">Real-time device compilation visualization</p>
                                        </div>
                                        <span className="bg-emerald-50 text-emerald-600 border border-emerald-400/20 text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                            Sandbox Online
                                        </span>
                                    </div>

                                    {/* Mock Mobile frame with reactive contents */}
                                    <div className="border border-slate-200 rounded-2xl overflow-hidden p-4 bg-slate-50 max-h-[500px] overflow-y-auto space-y-4">
                                        {editorCoverImage ? (
                                            <img src={editorCoverImage} alt="Cover preview" className="w-full h-28 object-cover rounded-xl shadow-sm" />
                                        ) : (
                                            <div className="w-full h-28 bg-slate-200 rounded-xl flex items-center justify-center text-xs text-textSecondary">Cover Mock</div>
                                        )}

                                        <div className="space-y-2">
                                            <span className="text-[9px] font-bold text-gold-600 uppercase bg-gold-50 px-2 py-0.5 rounded border border-gold-200/50">
                                                {editorCategory}
                                            </span>
                                            <h4 className="text-sm font-black text-textPrimary leading-snug">
                                                {editorTitle || "Your dynamic visual article title placeholder will render here..."}
                                            </h4>
                                            <p className="text-[11px] text-textSecondary italic">
                                                "{editorExcerpt || "A brief informative overview catchphrase highlighting tech benefits..."}"
                                            </p>
                                        </div>

                                        <div className="pt-3 border-t border-slate-200/50 text-[11px] text-textSecondary space-y-2 font-mono">
                                            <p className="font-bold text-textPrimary text-xs uppercase">Content Compilation Preview</p>
                                            {editorBody ? (
                                                <p className="whitespace-pre-wrap leading-relaxed">{editorBody.substring(0, 150)}...</p>
                                            ) : (
                                                <p className="text-slate-400">Compose technical paragraphs to observe immediate responsive translation layouts.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                )}
            </main>

            { }
            {/* GLOBAL LUXURY EDITORIAL FOOTER */}
            <footer className="bg-slate-950 text-white pt-16 pb-12 px-6 lg:px-20 border-t border-slate-900 mt-auto">
                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-slate-900 pb-12 mb-8">

                    {/* Left Col (Col-span 5) */}
                    <div className="md:col-span-5 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-500 to-accent-red flex items-center justify-center text-white font-extrabold text-xl shadow-lg">
                                TR
                            </div>
                            <div>
                                <h4 className="text-base font-bold tracking-tight text-white">Technical Rahul Pandey</h4>
                                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Technology Simplified For Everyone</p>
                            </div>
                        </div>
                        <p className="text-xs text-slate-400 font-light leading-relaxed max-w-sm">
                            Simplifying complex computing mechanics, local AI development pipelines, prompt architectures, and structured software frameworks for ambitious builders worldwide.
                        </p>
                        <div className="flex items-center gap-4 text-slate-400">
                            <a href="#" className="hover:text-gold-500 transition-colors"><PlaySquare className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-gold-500 transition-colors"><MessageSquare className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-gold-500 transition-colors"><CodeXml className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-gold-500 transition-colors"><Briefcase className="w-5 h-5" /></a>
                        </div>
                    </div>

                    {/* Middle Col (Col-span 3) */}
                    <div className="md:col-span-3 space-y-4">
                        <h5 className="text-xs uppercase tracking-wider font-extrabold text-gold-400">Content Directory</h5>
                        <ul className="space-y-2 text-xs text-slate-400 font-medium">
                            <li><button onClick={() => { setSelectedCategory('Artificial Intelligence'); setActiveTab('articles'); }} className="hover:text-white transition-colors">Artificial Intelligence</button></li>
                            <li><button onClick={() => { setSelectedCategory('Web Development'); setActiveTab('articles'); }} className="hover:text-white transition-colors">Web Development</button></li>
                            <li><button onClick={() => { setSelectedCategory('React Architecture'); setActiveTab('articles'); }} className="hover:text-white transition-colors">React Architecture</button></li>
                            <li><button onClick={() => { setSelectedCategory('Productivity'); setActiveTab('articles'); }} className="hover:text-white transition-colors">Productivity Systems</button></li>
                        </ul>
                    </div>

                    {/* Right Col (Col-span 4) */}
                    <div className="md:col-span-4 space-y-4">
                        <h5 className="text-xs uppercase tracking-wider font-extrabold text-gold-400">The Mission Statement</h5>
                        <p className="text-xs text-slate-400 leading-relaxed font-light">
                            Empowering over a million engineering minds with actionable content tutorials. We believe that technology shouldn't feel complex. It should inspire builders.
                        </p>
                        <p className="text-[10px] text-slate-500">© 2026 Technical Rahul Pandey. All rights reserved. Built with extreme attention to SaaS detail.</p>
                    </div>

                </div>

                <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500">
                    <p>Hand-crafted with clean typography standards.</p>
                    <div className="flex items-center gap-4 mt-4 sm:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Workspace Access</a>
                    </div>
                </div>
            </footer>

        </div>
    );
}



export default App;
