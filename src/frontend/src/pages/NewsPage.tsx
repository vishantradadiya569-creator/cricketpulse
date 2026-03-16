import { useState } from "react";
import type { NewsArticle } from "../backend.d";
import { NewsCategory } from "../backend.d";
import { AnimatedSection } from "../components/AnimatedSection";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { sampleNews } from "../data/sampleData";
import { useNewsArticles } from "../hooks/useQueries";

const playerImages = [
  "/assets/generated/hero-stadium.dim_1200x600.jpg",
  "/assets/generated/player-bat.dim_400x400.jpg",
  "/assets/generated/player-india.dim_400x400.jpg",
  "/assets/generated/player-ipl.dim_400x400.jpg",
  "/assets/generated/player-bowl.dim_400x400.jpg",
];

function formatDate(timestamp: bigint): string {
  return new Date(Number(timestamp / 1_000_000n)).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function categoryLabel(cat: NewsCategory): string {
  if (cat === NewsCategory.ipl) return "IPL";
  if (cat === NewsCategory.international) return "International";
  return "Domestic";
}

function categoryColor(cat: NewsCategory): string {
  if (cat === NewsCategory.ipl)
    return "bg-chart-2/20 text-chart-2 border-chart-2/30";
  if (cat === NewsCategory.international)
    return "bg-primary/20 text-primary border-primary/30";
  return "bg-chart-4/20 text-chart-4 border-chart-4/30";
}

export function NewsPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | NewsCategory>("all");
  const { data: newsData, isLoading } = useNewsArticles();
  const allNews: NewsArticle[] =
    newsData && newsData.length > 0 ? newsData : sampleNews;

  const filtered =
    activeFilter === "all"
      ? allNews
      : allNews.filter((n) => n.category === activeFilter);

  const featured = filtered.find((n) => n.featured) || filtered[0];
  const rest = featured
    ? filtered.filter((n) => n.id !== featured.id)
    : filtered;

  const filters = [
    { id: "all", label: "All" },
    { id: NewsCategory.international, label: "International" },
    { id: NewsCategory.ipl, label: "IPL" },
    { id: NewsCategory.domestic, label: "Domestic" },
  ] as const;

  return (
    <div
      className="container mx-auto px-4 py-8"
      style={{ paddingTop: "100px" }}
    >
      <AnimatedSection>
        <h1 className="font-display text-4xl md:text-5xl font-800 mb-2">
          Cricket News
        </h1>
        <p className="text-muted-foreground mb-8">
          Latest breaking news from around the cricket world
        </p>
      </AnimatedSection>

      {/* Filter tabs */}
      <AnimatedSection delay={100}>
        <div className="flex gap-2 mb-8 flex-wrap">
          {filters.map((f) => (
            <button
              type="button"
              key={f.id}
              data-ocid="news.tab"
              onClick={() => setActiveFilter(f.id as "all" | NewsCategory)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === f.id
                  ? "bg-primary text-primary-foreground"
                  : "border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </AnimatedSection>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* Featured article */}
          {featured && (
            <AnimatedSection className="mb-10">
              <article className="glass-card rounded-2xl overflow-hidden hover-lift cursor-pointer group">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="img-zoom h-72 lg:h-auto overflow-hidden">
                    <img
                      src={featured.imageUrl || playerImages[0]}
                      alt={featured.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className={`text-xs px-3 py-1 rounded-full border font-medium uppercase ${categoryColor(featured.category)}`}
                      >
                        {categoryLabel(featured.category)}
                      </span>
                      <span className="px-2 py-0.5 rounded text-xs bg-primary/10 text-primary border border-primary/20 font-medium">
                        Featured
                      </span>
                    </div>
                    <h2 className="font-display font-800 text-2xl md:text-3xl leading-tight mb-4 group-hover:text-primary transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {featured.summary}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(featured.date)}
                    </span>
                  </div>
                </div>
              </article>
            </AnimatedSection>
          )}

          {/* News grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.slice(0, 8).map((article, i) => (
              <AnimatedSection key={Number(article.id)} delay={i * 80}>
                <article
                  data-ocid={`news.item.${i + 1}`}
                  className="glass-card rounded-xl overflow-hidden hover-lift cursor-pointer group h-full flex flex-col"
                >
                  <div className="img-zoom h-48 overflow-hidden">
                    <img
                      src={
                        article.imageUrl ||
                        playerImages[i % playerImages.length]
                      }
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full border font-medium uppercase ${categoryColor(article.category)}`}
                      >
                        {categoryLabel(article.category)}
                      </span>
                      <span className="text-xs text-muted-foreground ml-auto">
                        {formatDate(article.date)}
                      </span>
                    </div>
                    <h3 className="font-display font-700 text-base leading-snug mb-2 group-hover:text-primary transition-colors flex-1">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {article.summary}
                    </p>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>

          {rest.length === 0 && !featured && (
            <div
              data-ocid="news.empty_state"
              className="text-center py-20 text-muted-foreground"
            >
              <div className="text-5xl mb-4">🏏</div>
              <p className="text-lg font-medium">No articles found</p>
              <p className="text-sm">Try a different filter</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
