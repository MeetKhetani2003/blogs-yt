const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

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

// Minimal Schema
const BlogSchema = new mongoose.Schema({ title: String, content: String, slug: String });
const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    const blog = await Blog.findOne({ title: /Ultimate Canvas/i }).lean();
    console.log("DB RESULT:");
    console.log(JSON.stringify(blog, null, 2));
    process.exit(0);
  });
