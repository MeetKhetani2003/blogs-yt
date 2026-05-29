import { getBlogs } from './src/actions/blog';
getBlogs(1, 100, { status: 'PUBLISHED' }).then(console.log).catch(console.error);
