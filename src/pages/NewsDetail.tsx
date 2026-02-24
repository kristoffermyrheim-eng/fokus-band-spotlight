import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Calendar, Facebook, LinkIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getNewsArticles, getNewsArticleBySlug } from "@/data/news";
import { toast } from "sonner";

const SITE_URL = "https://www.storbandetfokus.no";

const NewsDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const article = slug ? getNewsArticleBySlug(slug) : undefined;

  if (!article) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-muted-foreground mb-6">
              Denne nyhetssaken finnes ikke.
            </p>
            <Link to="/nyheter" className="text-primary underline hover:text-primary/90">
              Tilbake til nyheter
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const articles = getNewsArticles();
  const currentIndex = articles.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;
  const nextArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;

  const articleUrl = `${SITE_URL}/nyheter/${article.slug}`;
  const ogImage = article.ogImageUrl || article.coverImageUrl;

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
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    url: articleUrl,
    ...(ogImage ? { image: ogImage } : {}),
    publisher: {
      "@type": "Organization",
      name: "Storbandet Fokus",
    },
  };

  return (
    <>
      <Helmet>
        <title>{article.title} – Storbandet Fokus</title>
        <meta name="description" content={article.excerpt} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={articleUrl} />
        {ogImage && <meta property="og:image" content={ogImage} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.excerpt} />
        {ogImage && <meta name="twitter:image" content={ogImage} />}
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
              <time>
                {new Date(article.date).toLocaleDateString("nb-NO", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            <h1 className="text-2xl md:text-3xl font-serif-display font-bold mb-6">
              {article.title}
            </h1>

            {article.coverImageUrl && (
              <div className="flex justify-center mb-8">
                <img
                  src={article.coverImageUrl}
                  alt={article.title}
                  className="max-h-64 rounded-lg object-contain"
                />
              </div>
            )}

            <div
              className="prose prose-neutral dark:prose-invert max-w-none mb-8
                [&_h3]:text-xl [&_h3]:font-serif-display [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:pt-2 [&_h3]:mb-2
                [&_p]:text-muted-foreground [&_p]:leading-relaxed
                [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground
                [&_ul]:text-muted-foreground [&_li]:mb-1"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Share buttons */}
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

          {/* Prev / Next navigation */}
          {(prevArticle || nextArticle) && (
            <div className="flex justify-between mt-8 gap-4">
              {prevArticle ? (
                <Link
                  to={`/nyheter/${prevArticle.slug}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="line-clamp-1">{prevArticle.title}</span>
                </Link>
              ) : (
                <div />
              )}
              {nextArticle ? (
                <Link
                  to={`/nyheter/${nextArticle.slug}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors text-right"
                >
                  <span className="line-clamp-1">{nextArticle.title}</span>
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

export default NewsDetail;
