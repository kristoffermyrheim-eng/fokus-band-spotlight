import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getNewsArticles } from "@/data/news";

const NewsList = () => {
  const articles = getNewsArticles();

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

          {articles.length === 0 ? (
            <p className="text-muted-foreground text-lg">
              Ingen nyheter for øyeblikket. Kom tilbake snart!
            </p>
          ) : (
            <div className="space-y-6">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  to={`/nyheter/${article.slug}`}
                  className="block group"
                >
                  <article className="bg-card rounded-lg border border-border p-6 md:p-8 transition-shadow hover:shadow-lg">
                    <div className="flex flex-col md:flex-row gap-6">
                      {article.coverImageUrl && (
                        <div className="md:w-48 md:h-48 flex-shrink-0">
                          <img
                            src={article.coverImageUrl}
                            alt={article.title}
                            className="w-full h-40 md:h-full object-cover rounded-md"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                          <Calendar className="h-4 w-4" />
                          <time>
                            {new Date(article.date).toLocaleDateString("nb-NO", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </time>
                        </div>
                        <h2 className="text-xl md:text-2xl font-serif-display font-bold mb-2 group-hover:text-primary transition-colors">
                          {article.title}
                        </h2>
                        <p className="text-muted-foreground line-clamp-2">
                          {article.excerpt}
                        </p>
                        <span className="inline-block mt-3 text-sm text-primary font-medium">
                          Les mer →
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NewsList;
