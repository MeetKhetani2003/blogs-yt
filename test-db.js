const { loadEnvConfig } = require('@next/env');
loadEnvConfig(process.cwd());
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const db = mongoose.connection.db;
    const blogs = await db.collection('blogs').find({}).toArray();
    console.log(blogs.map(b => ({ title: b.title, status: b.status, isFeatured: b.isFeatured })));
    process.exit(0);
});
