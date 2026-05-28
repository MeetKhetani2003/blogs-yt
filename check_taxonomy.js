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

const BlogSchema = new mongoose.Schema({ title: String, content: String, slug: String, category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, hashtags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hashtag' }] });
const CategorySchema = new mongoose.Schema({ name: String });
const HashtagSchema = new mongoose.Schema({ name: String });

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
const Hashtag = mongoose.models.Hashtag || mongoose.model('Hashtag', HashtagSchema);

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    const blog = await Blog.findOne({ title: /Quantum Architecture 101/i }).populate('category').populate('hashtags').lean();
    console.log("DB RESULT:");
    console.log(JSON.stringify(blog, null, 2));
    process.exit(0);
  });
