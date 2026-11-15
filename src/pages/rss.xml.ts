import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import YukinaConfig from "../../yukina.config";
import { GetSortedPosts } from "../utils/content";
import { IdToSlug } from "../utils/hash";

export async function GET(context: APIContext) {
  // Newest first, drafts excluded.
  const posts = await GetSortedPosts();

  return rss({
    title: YukinaConfig.title,
    description: YukinaConfig.description,
    site: context.site ?? YukinaConfig.site,
    customData: `<language>${YukinaConfig.locale}</language>`,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description ?? post.data.subtitle,
      pubDate: post.data.published,
      link: `/posts/${IdToSlug(post.id)}`,
      categories: post.data.tags,
      author: post.data.author,
    })),
  });
}
