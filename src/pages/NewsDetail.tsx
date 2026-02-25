import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  Calendar,
  Facebook,
  LinkIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PortableText } from "@portabletext/react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNewsDetail, useNewsList, isSanityPost } from "@/hooks/use-news";
import { sanityConfigured, urlFor } from "@/lib/sanity";
import { toast } from "sonner";

const SITE_URL = "https://www.storbandetfokus.no";

const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null;
      const src = sanityConfigured
        ? urlFor(value).width(800).url()
        : undefined;
      if (!src) return null;
      return (
        <figure className="my-6">
          <img
            src={src}
            alt={value.alt || ""}
            className="w-full rounded-lg"
            loading="lazy"
          />
          {value.alt && (
            <figcaption className="text-sm text-muted-foreground mt-2 text-center">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

const NewsDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: post, isLoading } = useNewsDetail(slug);
  const { data: allPosts = [] } = useNewsList();

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
          <p className="text-muted-foreground">Laster…</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-muted-foreground mb-6">
              Denne nyhetssaken finnes ikke.
            </p>
            <Link
              to="/nyheter"
              className="text-primary underline hover:text-primary/90"
            >
              Tilbake til nyheter
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Determine fields depending on source (Sanity vs static)
  const isSanity = isSanityPost(post);
  const title = post.title;
  const postSlug = isSanity ? post.slug : (post as any).slug;
  const summary = isSanity ? post.summary : (post as any).excerpt;
  const publishedAt = isSanity ? post.publishedAt : (post as any).date;
  const seoTitle = (isSanity && post.seoTitle) || title;
  const seoDescription = (isSanity && post.seoDescription) || summary;

  const coverImageUrl = getCoverUrl(post);
  const articleUrl = `${SITE_URL}/nyheter/${postSlug}`;

  // Prev / next
  const currentIndex = allPosts.findIndex((a) => a.slug === postSlug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      toast.success("Lenke kopiert!");
    } catch {
      toast.error("Kunne ikke kopiere lenke");
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: summary,
    datePublished: publishedAt,
    url: articleUrl,
    ...(coverImageUrl ? { image: coverImageUrl } : {}),
    publisher: { "@type": "Organization", name: "Storbandet Fokus" },
  };

  return (
    <>
      <Helmet>
        <title>{seoTitle} – Storbandet Fokus</title>
        <meta name="description" content={seoDescription} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={articleUrl} />
        {coverImageUrl && <meta property="og:image" content={coverImageUrl} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        {coverImageUrl && <meta name="twitter:image" content={coverImageUrl} />}
        <link rel="canonical" href={articleUrl} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <Button
            variant="ghost"
            className="mb-8 text-muted-foreground hover:text-primary"
            onClick={() => navigate("/nyheter")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Tilbake til nyheter
          </Button>

          <article className="bg-card rounded-lg border border-border p-6 md:p-10">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
              <Calendar className="h-4 w-4" />
              <time>{formatDate(publishedAt)}</time>
            </div>

            <h1 className="text-2xl md:text-3xl font-serif-display font-bold mb-6">
              {title}
            </h1>

            {coverImageUrl && (
              <div className="flex justify-center mb-8">
                <img
                  src={coverImageUrl}
                  alt={title}
                  className="max-h-64 rounded-lg object-contain"
                />
              </div>
            )}

            {/* Body: Portable Text (Sanity) or HTML (static fallback) */}
            {isSanity ? (
              <div className="prose prose-neutral dark:prose-invert max-w-none mb-8 [&_h3]:text-xl [&_h3]:font-serif-display [&_h3]:font-semibold [&_h3]:text-foreground [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_ul]:text-muted-foreground [&_li]:mb-1">
                <PortableText
                  value={post.body}
                  components={portableTextComponents}
                />
              </div>
            ) : (
              <div
                className="prose prose-neutral dark:prose-invert max-w-none mb-8 [&_h3]:text-xl [&_h3]:font-serif-display [&_h3]:font-semibold [&_h3]:text-foreground [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_ul]:text-muted-foreground [&_li]:mb-1"
                dangerouslySetInnerHTML={{ __html: (post as any).content }}
              />
            )}

            {/* Gallery */}
            {isSanity && post.gallery && post.gallery.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {post.gallery.map((img, i) => (
                  <img
                    key={i}
                    src={urlFor(img).width(400).url()}
                    alt={img.alt || `Bilde ${i + 1}`}
                    className="w-full rounded-lg object-cover aspect-square"
                    loading="lazy"
                  />
                ))}
              </div>
            )}

            {/* Tags */}
            {isSanity && post.tags && post.tags.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Share */}
            <div className="flex items-center gap-3 pt-6 border-t border-border">
              <span className="text-sm text-muted-foreground">Del:</span>
              <Button variant="outline" size="sm" onClick={shareOnFacebook}>
                <Facebook className="h-4 w-4 mr-2" />
                Facebook
              </Button>
              <Button variant="outline" size="sm" onClick={copyLink}>
                <LinkIcon className="h-4 w-4 mr-2" />
                Kopier lenke
              </Button>
            </div>
          </article>

          {/* Prev / Next */}
          {(prevPost || nextPost) && (
            <div className="flex justify-between mt-8 gap-4">
              {prevPost ? (
                <Link
                  to={`/nyheter/${prevPost.slug}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="line-clamp-1">{prevPost.title}</span>
                </Link>
              ) : (
                <div />
              )}
              {nextPost ? (
                <Link
                  to={`/nyheter/${nextPost.slug}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors text-right"
                >
                  <span className="line-clamp-1">{nextPost.title}</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ) : (
                <div />
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

function getCoverUrl(post: any): string | undefined {
  if (isSanityPost(post) && post.coverImage?.asset) {
    return sanityConfigured ? urlFor(post.coverImage).width(800).url() : undefined;
  }
  // Static fallback
  return (post as any).coverImageUrl || (post as any).ogImageUrl;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("nb-NO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default NewsDetail;
