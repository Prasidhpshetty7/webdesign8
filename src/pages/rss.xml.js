import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog');
  
  // Sort posts by publish date in descending order
  const sortedPosts = blog.sort((a, b) => 
    b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
  );
  
  return rss({
    title: 'Prasidh P Shetty | Blog',
    description: 'Prasidh P Shetty, Web Designer and Full-Stack Developer passionate about building modern, visually engaging, and user-focused digital experiences.',
    site: context.site,
    items: sortedPosts.map((post) => {
      const publishDate = post.data.publishDate;
      const year = publishDate.getFullYear();
      const month = String(publishDate.getMonth() + 1).padStart(2, '0');
      const baseSlug = post.slug.replace(/^\d{4}-\d{2}-/, '');
      const postPath = `${year}/${month}/${baseSlug}`;
      
      return {
        title: post.data.title,
        pubDate: post.data.publishDate,
        description: post.data.description,
        link: `/${postPath}`,
      };
    }),
    customData: `<language>en-us</language>`,
  });
}
