import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

// Parse .env.local manually
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf-8');
    envConfig.split('\n').forEach(line => {
        const match = line.match(/^([^=:#]+?)[=:](.*)/);
        if (match) {
            const key = match[1].trim();
            const value = match[2].trim().replace(/['"]/g, '');
            process.env[key] = value;
        }
    });
}

// We define minimal schemas here to avoid import issues outside Next.js context
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    username: String,
    role: String
});
const User = mongoose.models.User || mongoose.model('User', UserSchema);

const CategorySchema = new mongoose.Schema({ name: String, slug: String });
const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

const HashtagSchema = new mongoose.Schema({ name: String, slug: String });
const Hashtag = mongoose.models.Hashtag || mongoose.model('Hashtag', HashtagSchema);

const BlogSchema = new mongoose.Schema({
    title: String,
    slug: String,
    excerpt: String,
    content: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    hashtags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hashtag' }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    heroImage: String,
    status: String,
    readTime: String,
    createdAt: { type: Date, default: Date.now },
});
const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("Connected to MongoDB...");

        // 1. Setup User
        let author = await User.findOne({ role: 'ADMIN' });
        if (!author) {
            author = await User.create({
                name: 'System Admin',
                email: 'admin@system.local',
                username: 'sysadmin',
                role: 'ADMIN'
            });
            console.log("Created Mock Admin User");
        }

        // 2. Setup Categories
        const cat1 = await Category.findOneAndUpdate(
            { slug: 'web-development' }, 
            { name: 'Web Development', slug: 'web-development' }, 
            { upsert: true, new: true }
        );
        const cat2 = await Category.findOneAndUpdate(
            { slug: 'artificial-intelligence' }, 
            { name: 'Artificial Intelligence', slug: 'artificial-intelligence' }, 
            { upsert: true, new: true }
        );

        // 3. Setup Hashtags
        const tag1 = await Hashtag.findOneAndUpdate({ slug: 'react' }, { name: 'React', slug: 'react' }, { upsert: true, new: true });
        const tag2 = await Hashtag.findOneAndUpdate({ slug: 'nextjs' }, { name: 'NextJS', slug: 'nextjs' }, { upsert: true, new: true });
        const tag3 = await Hashtag.findOneAndUpdate({ slug: 'llms' }, { name: 'LLMs', slug: 'llms' }, { upsert: true, new: true });

        // 4. Create Blogs
        const blogs = [
            {
                title: 'Building Scalable Architectures with Next.js 16',
                slug: 'building-scalable-architectures-with-nextjs-16',
                excerpt: 'A deep dive into server components, edge networking, and modern routing mechanisms.',
                category: cat1._id,
                hashtags: [tag1._id, tag2._id],
                author: author._id,
                heroImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
                status: 'PUBLISHED',
                readTime: '6 min read',
                content: `
                    <h2>The Paradigm Shift</h2>
                    <p>Next.js 16 fundamentally changes how we think about rendering. By heavily leaning into <strong>Server Components</strong>, we can strip away massive amounts of JavaScript from our client bundles.</p>
                    
                    <h3>Key Features Explored</h3>
                    <ul>
                        <li>Partial Prerendering for instantaneous initial loads</li>
                        <li>Advanced Edge-ready middleware</li>
                        <li>Built-in streaming boundaries</li>
                    </ul>

                    <blockquote>"The architecture of the web is moving back to the server, but with the interactivity of the client." - Industry Expert</blockquote>

                    <h3>Code Implementation</h3>
                    <p>Here is how a basic streaming boundary looks:</p>
                    <pre><code>import { Suspense } from 'react';\nimport LoadingState from './loading';\n\nexport default function Page() {\n  return (\n    &lt;Suspense fallback={&lt;LoadingState /&gt;}&gt;\n      &lt;HeavyComponent /&gt;\n    &lt;/Suspense&gt;\n  );\n}</code></pre>
                    
                    <p>Notice how simple the declarative API is. We wrap our heavy components and the framework handles the chunking.</p>
                    <p>For more details, check out the <a href="https://nextjs.org">official documentation</a>.</p>
                `
            },
            {
                title: 'Running Local LLMs for Code Generation',
                slug: 'running-local-llms-for-code-generation',
                excerpt: 'How to leverage models like Llama-3 locally to build your own pair programming assistant.',
                category: cat2._id,
                hashtags: [tag3._id],
                author: author._id,
                heroImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop',
                status: 'PUBLISHED',
                readTime: '8 min read',
                content: `
                    <h2>Why Run Locally?</h2>
                    <p>Running LLMs locally ensures complete privacy, zero latency over the wire, and gives you full control over the quantization process.</p>
                    
                    <p>In this guide, we'll set up <strong>Ollama</strong> and pull a localized Llama model.</p>

                    <h3>Steps to Success</h3>
                    <ol>
                        <li>Install Ollama runtime.</li>
                        <li>Pull your specific model variant.</li>
                        <li>Integrate with a Python API wrapper.</li>
                    </ol>

                    <p>Here is a basic script to prompt your local model:</p>
                    <pre><code>import requests\n\nresponse = requests.post('http://localhost:11434/api/generate', json={\n    "model": "llama3",\n    "prompt": "Write a python function to fetch data"\n})\nprint(response.json())</code></pre>

                    <p><img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop" alt="AI Server Rack" /></p>
                    <p>As seen above, server infrastructure is critical when scaling this beyond a local workstation.</p>
                `
            }
        ];

        for (const blogData of blogs) {
            await Blog.findOneAndUpdate(
                { slug: blogData.slug },
                blogData,
                { upsert: true, new: true }
            );
        }

        console.log("Successfully seeded 2 rich-text blogs!");
        process.exit(0);
    } catch (error) {
        console.error("Seed error:", error);
        process.exit(1);
    }
}

seed();
