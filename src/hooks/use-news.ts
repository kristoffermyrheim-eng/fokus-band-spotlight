import { useQuery } from "@tanstack/react-query";
import { sanityClient, sanityConfigured } from "@/lib/sanity";
import type { SanityNewsPost, NewsListItem } from "@/lib/sanity-types";
import { getNewsArticles, getNewsArticleBySlug, type NewsArticle } from "@/data/news";

// GROQ queries
const LIST_QUERY = `*[_type=="newsPost" && isPublished==true] | order(publishedAt desc){
  _id, title, "slug": slug.current, summary, publishedAt, tags, coverImage
}`;

const DETAIL_QUERY = `*[_type=="newsPost" && slug.current==$slug && isPublished==true][0]{
  ..., "slug": slug.current
}`;

const LATEST_QUERY = `*[_type=="newsPost" && isPublished==true] | order(publishedAt desc)[0..2]{
  _id, title, "slug": slug.current, summary, publishedAt, tags, coverImage
}`;

// ---- Hooks that fall back to static data when Sanity is not configured ----

export function useNewsList() {
  return useQuery<NewsListItem[]>({
    queryKey: ["news", "list"],
    queryFn: async () => {
      if (!sanityConfigured) {
        // Fallback: map static articles to the same shape
        return getNewsArticles().map(mapStaticToListItem);
      }
      return sanityClient.fetch<NewsListItem[]>(LIST_QUERY);
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useNewsDetail(slug: string | undefined) {
  return useQuery<SanityNewsPost | NewsArticle | null>({
    queryKey: ["news", "detail", slug],
    queryFn: async () => {
      if (!slug) return null;
      if (!sanityConfigured) {
        return getNewsArticleBySlug(slug) ?? null;
      }
      return sanityClient.fetch<SanityNewsPost | null>(DETAIL_QUERY, { slug });
    },
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 5,
  });
}

export function useLatestNews() {
  return useQuery<NewsListItem[]>({
    queryKey: ["news", "latest"],
    queryFn: async () => {
      if (!sanityConfigured) {
        return getNewsArticles().slice(0, 3).map(mapStaticToListItem);
      }
      return sanityClient.fetch<NewsListItem[]>(LATEST_QUERY);
    },
    staleTime: 1000 * 60 * 5,
  });
}

// Helper: is this a Sanity post (has body as PortableText)?
export function isSanityPost(post: any): post is SanityNewsPost {
  return post && Array.isArray(post.body);
}

// Map static NewsArticle → NewsListItem shape
function mapStaticToListItem(a: NewsArticle): NewsListItem {
  return {
    _id: a.id,
    title: a.title,
    slug: a.slug,
    summary: a.excerpt,
    publishedAt: a.date,
    tags: undefined,
    coverImage: a.coverImageUrl as any, // will be a string URL for fallback rendering
  };
}
