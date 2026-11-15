import { getCollection } from "astro:content";
import { Slugify, PostIdToSlug } from "./slug";

/**
 * Represents an archive item with a title, slug, date, and optional tags.
 */
export interface Archive {
  title: string;
  id: string;
  date: Date;
  tags?: string[];
}

/**
 * Represents a tag used to categorize content.
 */
export interface Tag {
  name: string;
  slug: string;
  posts: Archive[];
}

/**
 * Represents a category of content.
 */
export interface Category {
  name: string;
  slug: string;
  posts: Archive[];
}

/**
 * Retrieves and sorts blog posts by their published date.
 *
 * This function fetches all blog posts from the "posts" collection, filters out drafts if in production mode,
 * and sorts them in descending order by their published date. It also adds `nextSlug`, `nextTitle`, `prevSlug`,
 * and `prevTitle` properties to each post for navigation purposes.
 *
 * @returns A promise that resolves to an array of sorted blog posts with navigation properties.
 */
export async function GetSortedPosts() {
  const allBlogPosts = await getCollection("posts", ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });
  const sorted = allBlogPosts.sort((a, b) => {
    const dateA = new Date(a.data.published);
    const dateB = new Date(b.data.published);
    return dateA > dateB ? -1 : 1;
  });

  for (let i = 1; i < sorted.length; i++) {
    (sorted[i].data as any).nextSlug = (sorted[i - 1] as any).slug;
    (sorted[i].data as any).nextTitle = sorted[i - 1].data.title;
  }
  for (let i = 0; i < sorted.length - 1; i++) {
    (sorted[i].data as any).prevSlug = (sorted[i + 1] as any).slug;
    (sorted[i].data as any).prevTitle = sorted[i + 1].data.title;
  }

  return sorted;
}

/**
 * Retrieves all tags from blog posts.
 *
 * This function fetches all blog posts from the "posts" collection and extracts tags from each post.
 * It then organizes the tags into a map where each tag is associated with its metadata and the posts that have that tag.
 *
 * @returns A promise that resolves to a map of tags. Each key is a tag slug, and the value is an object containing the tag's name, slug, and associated posts.
 */
export async function GetTags() {
  const allBlogPosts = await getCollection("posts", ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });

  const tags = new Map<string, Tag>();
  allBlogPosts.forEach((post) => {
    post.data.tags?.forEach((tag: string) => {
      const tagSlug = Slugify(tag);
      if (!tags.has(tagSlug)) {
        tags.set(tagSlug, {
          name: tag,
          slug: `/tags/${tagSlug}`,
          posts: [],
        });
      }
      tags.get(tagSlug)!.posts.push({
        title: post.data.title,
        id: `/posts/${PostIdToSlug(post.id)}`,
        date: new Date(post.data.published),
        tags: post.data.tags,
      });
    });
  });

  return tags;
}

/**
 * Retrieves all blog post categories and their associated posts.
 *
 * This function fetches all blog posts from the "posts" collection and filters them based on the environment.
 * In production, it excludes drafts. It then organizes the posts into categories and returns a map of categories.
 *
 * @returns A promise that resolves to a map of categories, where each category contains its name, slug, and associated posts.
 */
export async function GetCategories() {
  const allBlogPosts = await getCollection("posts", ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });

  const categories = new Map<string, Category>();

  allBlogPosts.forEach((post) => {
    if (!post.data.category) return;
    const categorySlug = Slugify(post.data.category);

    if (!categories.has(categorySlug)) {
      categories.set(categorySlug, {
        name: post.data.category,
        slug: `/categories/${categorySlug}`,
        posts: [],
      });
    }
    categories.get(categorySlug)!.posts.push({
      title: post.data.title,
      id: `/posts/${PostIdToSlug(post.id)}`,
      date: new Date(post.data.published),
      tags: post.data.tags,
    });
  });

  return categories;
}
