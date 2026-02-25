import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNewsList } from "@/hooks/use-news";
import { sanityConfigured, urlFor } from "@/lib/sanity";

const NewsList = () => {
  const { data: articles = [], isLoading } = useNewsList();

  return (
    <>
      <Helmet>
        <title>Nyheter – Storbandet Fokus</title>
        <meta
          name="description"
          content="Siste nytt fra Storbandet Fokus – konserter, arrangementer og nyheter."
        />
        <meta property="og:title" content="Nyheter – Storbandet Fokus" />
        <meta
          property="og:description"
          content="Siste nytt fra Storbandet Fokus – konserter, arrangementer og nyheter."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-serif-display font-bold mb-12 text-primary">
            Nyheter
          </h1>

          {isLoading ? (
            <p className="text-muted-foreground text-lg">Laster nyheter…</p>
          ) : articles.length === 0 ? (
            <p className="text-muted-foreground text-lg">
              Ingen nyheter for øyeblikket. Kom tilbake snart!
            </p>
          ) : (
            <div className="space-y-6">
              {articles.map((article) => {
                const imageUrl = getImageUrl(article.coverImage);
                return (
                  <Link
                    key={article._id}
                    to={`/nyheter/${article.slug}`}
                    className="block group"
                  >
                    <article className="bg-card rounded-lg border border-border p-6 md:p-8 transition-shadow hover:shadow-lg">
                      <div className="flex flex-col md:flex-row gap-6">
                        {imageUrl && (
                          <div className="md:w-48 md:h-48 flex-shrink-0">
                            <img
                              src={imageUrl}
                              alt={article.title}
                              className="w-full h-40 md:h-full object-cover rounded-md"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                            <Calendar className="h-4 w-4" />
                            <time>
                              {formatDate(article.publishedAt)}
                            </time>
                          </div>
                          <h2 className="text-xl md:text-2xl font-serif-display font-bold mb-2 group-hover:text-primary transition-colors">
                            {article.title}
                          </h2>
                          <p className="text-muted-foreground line-clamp-2">
                            {article.summary}
                          </p>
                          {article.tags && article.tags.length > 0 && (
                            <div className="flex gap-2 mt-3 flex-wrap">
                              {article.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                          <span className="inline-block mt-3 text-sm text-primary font-medium">
                            Les mer →
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

function getImageUrl(coverImage: any): string | undefined {
  if (!coverImage) return undefined;
  // Static fallback: coverImage is already a string URL
  if (typeof coverImage === "string") return coverImage;
  // Sanity image reference
  if (sanityConfigured && coverImage?.asset) {
    return urlFor(coverImage).width(400).height(400).url();
  }
  return undefined;
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

export default NewsList;
