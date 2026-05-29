const { loadEnvConfig } = require('@next/env');
loadEnvConfig(process.cwd());
const dbConnect = require('./src/lib/db').default;
const { getBlogs } = require('./src/actions/blog');

(async () => {
    try {
        await dbConnect();
        const res = await getBlogs(1, 100, { status: 'PUBLISHED' });
        console.log(JSON.stringify(res, null, 2));
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
