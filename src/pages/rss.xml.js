import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt();
const blogPosts = (await getCollection('blog', ({ data }) => {
  return import.meta.env.PROD ? !data.draft : true;
})).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf()).map((post) => {
    return {
        title: post.data.title,
        description: post.data.description,
        content: sanitizeHtml(parser.render(post.body), {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
        }),
    }
});

export function GET(context) {
  return rss({
    title: "CorgoDev's RSS Feed",
    description: 'Mostly game dev and game related but sometimes general dev stuff may sneak in.',
    site: context.site,
    items: blogPosts,
    customData: `<language>en-us</language>`,
  });
}