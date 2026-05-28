const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

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

const BlogSchema = new mongoose.Schema({ title: String, content: String, excerpt: String, slug: String, seoTitle: String, metaDescription: String, focusKeywords: [String], robots: String, category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, hashtags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hashtag' }], author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, status: String });
const CategorySchema = new mongoose.Schema({ name: String, slug: String });
const HashtagSchema = new mongoose.Schema({ name: String, slug: String });
const UserSchema = new mongoose.Schema({ name: String, email: String });

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
const Hashtag = mongoose.models.Hashtag || mongoose.model('Hashtag', HashtagSchema);
const User = mongoose.models.User || mongoose.model('User', UserSchema);

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    // Get Admin Author
    const author = await User.findOne({ role: 'ADMIN' }) || await User.findOne();
    
    // Inline Category Creation
    const category = await Category.create({ name: 'Advanced SEO Tactics', slug: 'advanced-seo-tactics' });
    const hashtag = await Hashtag.create({ name: 'TechMarketing', slug: 'techmarketing' });

    const htmlContent = `
        <h2>1. The Dawn of Technical SEO</h2>
        <p>In the rapidly evolving landscape of digital marketing, understanding the intricacies of technical Search Engine Optimization (SEO) is paramount. Gone are the days when simply stuffing keywords into a page's content would guarantee a top spot on Google. Today, algorithms are vastly more sophisticated, relying on hundreds of ranking signals including site speed, mobile responsiveness, and schema markup.</p>
        
        <h2>2. Why Indexing Controls Matter</h2>
        <p>One of the most powerful tools in a webmaster's arsenal is the ability to dictate exactly how search engine crawlers interact with their pages. The <code>robots</code> meta tag, or X-Robots-Tag header, allows for granular control over indexation. By utilizing values like <code>index, follow</code> or <code>noindex, nofollow</code>, you can sculpt your site's PageRank flow and prevent duplicate content issues.</p>
        
        <h2>3. The Power of Rich Media</h2>
        <p>Text alone is rarely enough to fully engage a modern audience. Integrating rich media such as high-quality images, interactive tables, and embedded videos drastically increases dwell time. Dwell time is a critical, albeit unofficial, metric that search engines use to measure user satisfaction. When a user spends five minutes watching an embedded YouTube video, it signals to Google that the page is highly relevant.</p>

        <p><img src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&w=1200&q=80" alt="SEO Analysis Dashboard"></p>

        <h2>4. Structuring Data with Tables</h2>
        <p>Tables are not just for organizing data; they are a fantastic way to win Featured Snippets (Position Zero) on Google. When you present comparative data cleanly, search engines can easily parse the information and display it directly in the search results page. Below is a comparative breakdown of common robot meta tags and their behavioral impact on crawlers.</p>
        
        <table style="min-width: 75px;">
            <thead>
                <tr>
                    <th>Robots Directive</th>
                    <th>Indexing Action</th>
                    <th>Link Following</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>index, follow</code></td>
                    <td>Included in Search</td>
                    <td>Crawlers follow outbound links</td>
                </tr>
                <tr>
                    <td><code>noindex, follow</code></td>
                    <td>Hidden from Search</td>
                    <td>Crawlers follow outbound links</td>
                </tr>
                <tr>
                    <td><code>noindex, nofollow</code></td>
                    <td>Hidden from Search</td>
                    <td>Crawlers do not follow links</td>
                </tr>
            </tbody>
        </table>

        <h2>5. Video Integration and Synthesis</h2>
        <p>Finally, we synthesize these concepts by providing a multimedia learning experience. Embedded video content helps visual learners grasp complex topics faster. The following video breaks down the technical nuances of rendering JavaScript frameworks and how they interact with Googlebot's two-wave indexing process.</p>

        <div data-youtube-video>
            <iframe width="640" height="480" allowfullscreen="true" autoplay="false" disablekbcontrols="false" enableiframeapi="false" endtime="0" ivloadpolicy="0" loop="false" modestbranding="false" origin="" playlist="" src="https://www.youtube.com/embed/n3v_lEeeM8g" start="0"></iframe>
        </div>
    `;

    const blog = await Blog.create({
        title: "Mastering Next.js SEO & Rich Media",
        slug: "mastering-nextjs-seo-rich-media",
        excerpt: "Discover how to leverage granular robots indexing, rich media tables, and dynamic sitemaps in Next.js 16.",
        content: htmlContent,
        category: category._id,
        hashtags: [hashtag._id],
        author: author._id,
        status: "PUBLISHED",
        seoTitle: "Next.js 16 SEO Guide | Dynamic Sitemaps & Indexing",
        metaDescription: "Learn how to control search engine crawlers with custom robots tags, embedded media, and dynamic sitemaps.",
        focusKeywords: ["Next.js SEO", "Robots Tag", "Dynamic Sitemap", "Tech Blog"],
        robots: "index, follow"
    });

    console.log("CREATED BLOG: ", blog.slug);
    process.exit(0);
  });
