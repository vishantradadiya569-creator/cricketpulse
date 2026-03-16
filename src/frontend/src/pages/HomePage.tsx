import type { Match, NewsArticle, Player } from "../backend.d";
import { MatchStatus, NewsCategory } from "../backend.d";
import { AnimatedCounter } from "../components/AnimatedCounter";
import { AnimatedSection } from "../components/AnimatedSection";
import { SkeletonCard } from "../components/LoadingSpinner";
import { sampleMatches, sampleNews, samplePlayers } from "../data/sampleData";
import { useMatches, useNewsArticles, usePlayers } from "../hooks/useQueries";

const playerImages = [
  "/assets/generated/player-bat.dim_400x400.jpg",
  "/assets/generated/player-india.dim_400x400.jpg",
  "/assets/generated/player-bowl.dim_400x400.jpg",
  "/assets/generated/player-ipl.dim_400x400.jpg",
];

function formatDate(timestamp: bigint): string {
  return new Date(Number(timestamp / 1_000_000n)).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function categoryColor(cat: NewsCategory): string {
  if (cat === NewsCategory.ipl)
    return "bg-chart-2/20 text-chart-2 border-chart-2/30";
  if (cat === NewsCategory.international)
    return "bg-primary/20 text-primary border-primary/30";
  return "bg-chart-4/20 text-chart-4 border-chart-4/30";
}

interface HomePageProps {
  onNavigate: (tab: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { data: newsData, isLoading: newsLoading } = useNewsArticles();
  const { data: playersData, isLoading: playersLoading } = usePlayers();
  const { data: matchesData } = useMatches();

  const news: NewsArticle[] =
    newsData && newsData.length > 0 ? newsData : sampleNews;
  const players: Player[] =
    playersData && playersData.length > 0 ? playersData : samplePlayers;
  const matches: Match[] =
    matchesData && matchesData.length > 0 ? matchesData : sampleMatches;

  const featured = news.filter((n) => n.featured).slice(0, 3);
  const liveMatches = matches.filter((m) => m.status === MatchStatus.live);
  const topPlayers = players.slice(0, 3);

  return (
    <div data-ocid="home.section">
      {/* Hero */}
      <section
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
        style={{ paddingTop: "88px" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-stadium.dim_1200x600.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="hero-text-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6">
            <span className="h-2 w-2 rounded-full bg-destructive live-badge inline-block" />
            Live Scores & Daily Updates
          </div>
          <h1 className="hero-text-2 font-display text-5xl md:text-7xl font-800 leading-tight mb-6">
            Your Daily <span className="text-gradient-gold">Cricket</span>
            <br />
            <span className="text-gradient-green">Hub</span>
          </h1>
          <p className="hero-text-3 text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8">
            International matches, IPL action, player stats, records, and
            breaking news — all in one place.
          </p>
          <div className="hero-text-4 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={() => onNavigate("news")}
              className="px-8 py-3 rounded-xl font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 glow-gold"
            >
              Latest News
            </button>
            <button
              type="button"
              onClick={() => onNavigate("matches")}
              className="px-8 py-3 rounded-xl font-semibold border border-border/50 bg-muted/30 hover:bg-muted/60 transition-all duration-200"
            >
              Live Matches
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground">
          <span className="text-xs">Scroll to explore</span>
          <div className="w-0.5 h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-10 border-y border-border/50 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "International Matches", value: 4284, suffix: "+" },
              { label: "Active Players", value: 1200, suffix: "+" },
              { label: "Records Tracked", value: 500, suffix: "+" },
              { label: "News Articles", value: 10000, suffix: "+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl md:text-4xl font-800 text-gradient-gold">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-muted-foreground text-sm mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Matches */}
      {liveMatches.length > 0 && (
        <section className="py-12 container mx-auto px-4">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-3 w-3 rounded-full bg-destructive live-badge" />
              <h2 className="font-display text-2xl font-700">Live Now</h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {liveMatches.map((match, i) => (
              <AnimatedSection key={Number(match.id)} delay={i * 100}>
                <div className="glass-card rounded-xl p-5 hover-lift cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-700 text-destructive border border-destructive/30 bg-destructive/10 px-2 py-0.5 rounded-full live-badge uppercase">
                      ● LIVE
                    </span>
                    <span className="text-xs text-muted-foreground uppercase">
                      {match.format}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-display font-700 text-lg">
                        {match.team1}
                      </div>
                      <div className="text-primary font-mono font-600 text-sm">
                        {match.score1}
                      </div>
                    </div>
                    <div className="text-muted-foreground font-display font-800 text-lg">
                      VS
                    </div>
                    <div className="text-right">
                      <div className="font-display font-700 text-lg">
                        {match.team2}
                      </div>
                      <div className="text-muted-foreground font-mono text-sm">
                        {match.score2}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground flex items-center gap-1">
                    <span>📍</span> {match.venue}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>
      )}

      {/* Featured News */}
      <section className="py-12 container mx-auto px-4">
        <AnimatedSection className="flex items-center justify-between mb-8">
          <h2 className="font-display text-3xl font-800">Featured Stories</h2>
          <button
            type="button"
            onClick={() => onNavigate("news")}
            className="text-primary text-sm hover:underline"
          >
            View all →
          </button>
        </AnimatedSection>

        {newsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((article, i) => (
              <AnimatedSection key={Number(article.id)} delay={i * 150}>
                <article
                  data-ocid={`home.card.${i + 1}`}
                  className="glass-card rounded-xl overflow-hidden hover-lift group cursor-pointer h-full flex flex-col"
                >
                  <div className="img-zoom h-52 overflow-hidden">
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
                        {article.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(article.date)}
                      </span>
                    </div>
                    <h3 className="font-display font-700 text-lg leading-snug mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-3 flex-1">
                      {article.summary}
                    </p>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        )}
      </section>

      {/* Top Players */}
      <section className="py-12 bg-muted/10 border-y border-border/50">
        <div className="container mx-auto px-4">
          <AnimatedSection className="flex items-center justify-between mb-8">
            <h2 className="font-display text-3xl font-800">Top Players</h2>
            <button
              type="button"
              onClick={() => onNavigate("players")}
              className="text-primary text-sm hover:underline"
            >
              All players →
            </button>
          </AnimatedSection>

          {playersLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topPlayers.map((player, i) => (
                <AnimatedSection key={Number(player.id)} delay={i * 150}>
                  <div className="glass-card rounded-xl overflow-hidden hover-lift cursor-pointer">
                    <div className="relative h-56 img-zoom">
                      <img
                        src={
                          player.imageUrl ||
                          playerImages[i % playerImages.length]
                        }
                        alt={player.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="font-display font-800 text-xl">
                          {player.name}
                        </div>
                        <div className="text-muted-foreground text-sm">
                          {player.country}
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs px-2 py-0.5 rounded-full border border-accent/30 bg-accent/10 text-accent font-medium capitalize">
                          {player.role}
                        </span>
                        <span className="text-primary font-display font-700">
                          {Number(player.battingStats.runs).toLocaleString()}{" "}
                          runs
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <div className="text-foreground font-700 text-sm">
                            {Number(player.battingStats.centuries)}
                          </div>
                          <div className="text-muted-foreground text-xs">
                            100s
                          </div>
                        </div>
                        <div>
                          <div className="text-foreground font-700 text-sm">
                            {player.battingStats.average.toFixed(1)}
                          </div>
                          <div className="text-muted-foreground text-xs">
                            Avg
                          </div>
                        </div>
                        <div>
                          <div className="text-foreground font-700 text-sm">
                            {Number(player.battingStats.matches)}
                          </div>
                          <div className="text-muted-foreground text-xs">
                            Matches
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
