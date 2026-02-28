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
        <figure className="my-10">
          <img
            src={src}
            alt={value.alt || ""}
            className="w-full rounded-lg shadow-md"
            loading="lazy"
          />
          {value.alt && (
            <figcaption className="text-sm text-muted-foreground mt-3 text-center italic">
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
          <p className="text-muted-foreground animate-pulse">Laster nyheter...</p>
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
            <h1 className="text-4xl font-bold mb-4 font-serif-display">404</h1>
            <p className="text-muted-foreground mb-6">
              Denne nyhetssaken finnes ikke.
            </p>
            <Link
              to="/nyheter"
              className="text-primary underline hover:text-primary/90 font-medium"
            >
              Tilbake til alle nyheter
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const isSanity = isSanityPost(post);
  const title = post.title;
  const postSlug = isSanity ? post.slug : (post as any).slug;
  const summary = isSanity ? post.summary : (post as any).excerpt;
  const publishedAt = isSanity ? post.publishedAt : (post as any).date;
  const seoTitle = (isSanity && post.seoTitle) || title;
  const seoDescription = (isSanity && post.seoDescription) || summary;

  const coverImageUrl = getCoverUrl(post);
  const articleUrl = `${SITE_URL}/nyheter/${postSlug}`;

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
      toast.success("Lenke kopiert til utklippstavlen!");
    } catch {
      toast.error("Kunne ikke kopiere lenke");
    }
  };

  // Felles klasser for tekstbehandling (luft mellom avsnitt og overskrifter)
  const contentClasses = "prose prose-neutral dark:prose-invert max-w-none mb-12 " + 
    "[&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-8 " + // Mer luft mellom avsnitt
    "[&_h3]:text-2xl [&_h3]:font-serif-display [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-12 [&_h3]:mb-6 " + // Mer luft rundt overskrifter
    "[&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:my-10 " + // Finere sitater
    "[&_ul]:text-muted-foreground [&_ul]:space-y-3 [&_li]:ml-4"; // Luft i lister

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
        <link rel="canonical" href={articleUrl} />
      </Helmet>

      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <Button
            variant="ghost"
            className="mb-8 text-muted-foreground hover:text-primary pl-0"
            onClick={() => navigate("/nyheter")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Tilbake til nyheter
          </Button>

          <article className="bg-card rounded-xl border border-border p-6 md:p-12 shadow-sm">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-6">
              <Calendar className="h-4 w-4" />
              <time>{formatDate(publishedAt)}</time>
            </div>

            <h1 className="text-3xl md:text-4xl font-serif-display font-bold mb-8 leading-tight">
              {title}
            </h1>

            {coverImageUrl && (
              <div className="mb-10 flex justify-center overflow-hidden rounded-lg">
                <img
                  src={coverImageUrl}
                  alt={title}
                  className="max-h-[400px] w-full object-cover"
                />
              </div>
            )}

            {isSanity ? (
              <div className={contentClasses}>
                <PortableText
                  value={post.body}
                  components={portableTextComponents}
                />
              </div>
            ) : (
              <div
                className={contentClasses}
                dangerouslySetInnerHTML={{ __html: (post as any).content }}
              />
            )}

            {/* Deling */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-8 border-t border-border">
              <span className="text-sm font-semibold text-foreground">Del denne saken:</span>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" onClick={shareOnFacebook} className="rounded-full">
                  <Facebook className="h-4 w-4 mr-2 text-blue-600" />
                  Facebook
                </Button>
                <Button variant="outline" size="sm" onClick={copyLink} className="rounded-full">
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Kopier lenke
                </Button>
              </div>
            </div>
          </article>

          {/* Forrige / Neste navigasjon */}
          {(prevPost || nextPost) && (
            <div className="grid grid-cols-2 mt-12 gap-8 border-t border-border pt-8">
              {prevPost ? (
                <Link
                  to={`/nyheter/${prevPost.slug}`}
                  className="group flex flex-col gap-2 text-left"
                >
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Forrige</span>
                  <div className="flex items-center gap-2 group-hover:text-primary transition-colors">
                    <ChevronLeft className="h-4 w-4 shrink-0" />
                    <span className="text-sm font-medium line-clamp-2">{prevPost.title}</span>
                  </div>
                </Link>
              ) : <div />}
              
              {nextPost ? (
                <Link
                  to={`/nyheter/${nextPost.slug}`}
                  className="group flex flex-col gap-2 text-right"
                >
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Neste</span>
                  <div className="flex items-center justify-end gap-2 group-hover:text-primary transition-colors">
                    <span className="text-sm font-medium line-clamp-2">{nextPost.title}</span>
                    <ChevronRight className="h-4 w-4 shrink-0" />
                  </div>
                </Link>
              ) : <div />}
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
  return (post as any).coverImageUrl || (post as any).ogImageUrl;
}

function formatDate(dateStr: string): string {
  // Håndterer både YYYY-MM-DD og MM.DD.YYYY
  let normalizedDate = dateStr;
  if (dateStr.includes('.')) {
    const parts = dateStr.split('.');
    if (parts.length === 3) {
      // Antar MM.DD.YYYY fra fila di
      normalizedDate = `${parts[2]}-${parts[0]}-${parts[1]}`;
    }
  }
  
  const d = new Date(normalizedDate);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("nb-NO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default NewsDetail;
