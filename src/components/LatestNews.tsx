import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { useLatestNews } from "@/hooks/use-news";
import { sanityConfigured, urlFor } from "@/lib/sanity";

const LatestNews = () => {
  const { data: posts = [], isLoading } = useLatestNews();

  if (isLoading || posts.length === 0) return null;

  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-serif-display font-bold text-primary mb-10 text-center">
          Siste nytt
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post) => {
            const imageUrl = getImageUrl(post.coverImage);
            return (
              <Link
                key={post._id}
                to={`/nyheter/${post.slug}`}
                className="group block"
              >
                <article className="bg-card rounded-lg border border-border overflow-hidden transition-shadow hover:shadow-lg h-full flex flex-col">
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs mb-2">
                      <Calendar className="h-3 w-3" />
                      <time>{formatDate(post.publishedAt)}</time>
                    </div>
                    <h3 className="font-serif-display font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 flex-1">
                      {post.summary}
                    </p>
                    <span className="text-sm text-primary font-medium mt-3 inline-block">
                      Les mer →
                    </span>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/nyheter"
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Se alle nyheter →
          </Link>
        </div>
      </div>
    </section>
  );
};

function getImageUrl(coverImage: any): string | undefined {
  if (!coverImage) return undefined;
  if (typeof coverImage === "string") return coverImage;
  if (sanityConfigured && coverImage?.asset) {
    return urlFor(coverImage).width(400).height(300).url();
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

export default LatestNews;
