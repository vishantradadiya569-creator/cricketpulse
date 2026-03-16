import { useState } from "react";
import type { Match } from "../backend.d";
import { MatchFormat, MatchStatus } from "../backend.d";
import { AnimatedSection } from "../components/AnimatedSection";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { sampleMatches } from "../data/sampleData";
import { useMatches } from "../hooks/useQueries";

const formatBadge: Record<MatchFormat, string> = {
  [MatchFormat.test]: "bg-chart-4/20 text-chart-4 border-chart-4/30",
  [MatchFormat.odi]: "bg-chart-2/20 text-chart-2 border-chart-2/30",
  [MatchFormat.t20]: "bg-primary/20 text-primary border-primary/30",
  [MatchFormat.ipl]: "bg-destructive/20 text-destructive border-destructive/30",
};

function formatDate(timestamp: bigint): string {
  return new Date(Number(timestamp / 1_000_000n)).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function MatchCard({ match, index }: { match: Match; index: number }) {
  const isLive = match.status === MatchStatus.live;
  const isCompleted = match.status === MatchStatus.completed;

  return (
    <AnimatedSection delay={index * 80}>
      <div
        data-ocid={`matches.item.${index + 1}`}
        className={`glass-card rounded-xl p-5 hover-lift cursor-pointer relative overflow-hidden ${
          isLive ? "border-destructive/30" : ""
        }`}
      >
        {isLive && (
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-destructive to-transparent" />
        )}

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {isLive && (
              <span className="text-xs font-700 text-destructive border border-destructive/30 bg-destructive/10 px-2 py-0.5 rounded-full live-badge uppercase">
                ● LIVE
              </span>
            )}
            <span
              className={`text-xs px-2 py-0.5 rounded-full border font-medium uppercase ${formatBadge[match.format]}`}
            >
              {match.format}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            {formatDate(match.date)}
          </span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex-1">
            <div className="font-display font-700 text-lg">{match.team1}</div>
            {(isLive || isCompleted) && match.score1 && (
              <div className="text-primary font-mono text-sm font-600 mt-0.5">
                {match.score1}
              </div>
            )}
          </div>
          <div className="px-6 text-muted-foreground font-display font-800 text-xl">
            VS
          </div>
          <div className="flex-1 text-right">
            <div className="font-display font-700 text-lg">{match.team2}</div>
            {(isLive || isCompleted) && match.score2 && (
              <div className="text-muted-foreground font-mono text-sm mt-0.5">
                {match.score2}
              </div>
            )}
          </div>
        </div>

        {isCompleted && match.result && (
          <div className="text-chart-2 text-sm font-medium text-center py-2 bg-chart-2/5 rounded-lg border border-chart-2/20">
            🏆 {match.result}
          </div>
        )}

        <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
          <span>📍</span>
          <span>{match.venue}</span>
        </div>
      </div>
    </AnimatedSection>
  );
}

export function MatchesPage() {
  const [activeTab, setActiveTab] = useState<"live" | "upcoming" | "completed">(
    "live",
  );
  const { data: matchesData, isLoading } = useMatches();
  const allMatches: Match[] =
    matchesData && matchesData.length > 0 ? matchesData : sampleMatches;

  const liveMatches = allMatches.filter((m) => m.status === MatchStatus.live);
  const upcomingMatches = allMatches.filter(
    (m) => m.status === MatchStatus.upcoming,
  );
  const completedMatches = allMatches.filter(
    (m) => m.status === MatchStatus.completed,
  );

  const tabs = [
    { id: "live" as const, label: "Live", count: liveMatches.length },
    {
      id: "upcoming" as const,
      label: "Upcoming",
      count: upcomingMatches.length,
    },
    {
      id: "completed" as const,
      label: "Completed",
      count: completedMatches.length,
    },
  ];

  const currentMatches =
    activeTab === "live"
      ? liveMatches
      : activeTab === "upcoming"
        ? upcomingMatches
        : completedMatches;

  return (
    <div
      className="container mx-auto px-4 py-8"
      style={{ paddingTop: "100px" }}
    >
      <AnimatedSection>
        <h1 className="font-display text-4xl md:text-5xl font-800 mb-2">
          Matches
        </h1>
        <p className="text-muted-foreground mb-8">
          Live scores, upcoming fixtures & completed results
        </p>
      </AnimatedSection>

      {/* Tabs */}
      <AnimatedSection delay={100}>
        <div className="flex gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab.id}
              data-ocid="matches.tab"
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {tab.id === "live" && (
                <span className="h-2 w-2 rounded-full bg-destructive live-badge inline-block" />
              )}
              {tab.label}
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.id
                    ? "bg-primary-foreground/20"
                    : "bg-muted/50"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </AnimatedSection>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {currentMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentMatches.map((match, i) => (
                <MatchCard key={Number(match.id)} match={match} index={i} />
              ))}
            </div>
          ) : (
            <div
              data-ocid="matches.empty_state"
              className="text-center py-20 text-muted-foreground"
            >
              <div className="text-5xl mb-4">
                {activeTab === "live"
                  ? "📡"
                  : activeTab === "upcoming"
                    ? "📅"
                    : "📋"}
              </div>
              <p className="text-lg font-medium">No {activeTab} matches</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
