import { useState } from "react";
import { AnimatedSection } from "../components/AnimatedSection";

const TEAMS = [
  {
    id: 1,
    name: "India",
    flag: "🇮🇳",
    color: "#0A60AE",
    ranking: 1,
    captain: "Rohit Sharma",
    coach: "Gautam Gambhir",
    titles: "2 ODI WC, 1 T20 WC, 2 CT",
  },
  {
    id: 2,
    name: "Australia",
    flag: "🇦🇺",
    color: "#FFCD00",
    ranking: 2,
    captain: "Pat Cummins",
    coach: "Andrew McDonald",
    titles: "5 ODI WC, 1 T20 WC, 2 CT",
  },
  {
    id: 3,
    name: "England",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    color: "#CF142B",
    ranking: 3,
    captain: "Ben Stokes",
    coach: "Brendon McCullum",
    titles: "1 ODI WC, 1 T20 WC, 1 CT",
  },
  {
    id: 4,
    name: "Pakistan",
    flag: "🇵🇰",
    color: "#01411C",
    ranking: 4,
    captain: "Shan Masood",
    coach: "Jason Gillespie",
    titles: "1 ODI WC, 1 T20 WC, 1 CT",
  },
  {
    id: 5,
    name: "South Africa",
    flag: "🇿🇦",
    color: "#007A4D",
    ranking: 5,
    captain: "Temba Bavuma",
    coach: "Shukri Conrad",
    titles: "3 CT",
  },
  {
    id: 6,
    name: "New Zealand",
    flag: "🇳🇿",
    color: "#000000",
    ranking: 6,
    captain: "Tom Latham",
    coach: "Gary Stead",
    titles: "1 WTC, 1 CT",
  },
  {
    id: 7,
    name: "West Indies",
    flag: "🌴",
    color: "#7B0000",
    ranking: 7,
    captain: "Kraigg Brathwaite",
    coach: "Andre Coley",
    titles: "2 T20 WC, 2 ODI WC",
  },
  {
    id: 8,
    name: "Sri Lanka",
    flag: "🇱🇰",
    color: "#003087",
    ranking: 8,
    captain: "Dhananjaya de Silva",
    coach: "Sanath Jayasuriya",
    titles: "1 ODI WC, 1 T20 WC, 1 CT",
  },
] as const;

type Team = (typeof TEAMS)[number];

function TeamStats({ team }: { team: Team }) {
  return (
    <div>
      <div className="font-display font-700 text-sm text-muted-foreground uppercase tracking-wide mb-1">
        Captain
      </div>
      <div className="font-medium mb-3">{team.captain}</div>
      <div className="font-display font-700 text-sm text-muted-foreground uppercase tracking-wide mb-1">
        Coach
      </div>
      <div className="font-medium mb-3">{team.coach}</div>
      <div className="font-display font-700 text-sm text-muted-foreground uppercase tracking-wide mb-1">
        Major Titles
      </div>
      <div className="font-medium text-sm text-primary">{team.titles}</div>
    </div>
  );
}

export function TeamsPage() {
  const [compareTeam1, setCompareTeam1] = useState<Team | null>(null);
  const [compareTeam2, setCompareTeam2] = useState<Team | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  const handleTeamClick = (team: Team) => {
    if (!compareTeam1) {
      setCompareTeam1(team);
    } else if (!compareTeam2 && team.id !== compareTeam1.id) {
      setCompareTeam2(team);
    } else {
      setCompareTeam1(team);
      setCompareTeam2(null);
      setShowComparison(false);
    }
  };

  const canCompare = compareTeam1 && compareTeam2;

  return (
    <div
      className="container mx-auto px-4 py-8"
      style={{ paddingTop: "100px" }}
    >
      <AnimatedSection>
        <h1 className="font-display text-4xl md:text-5xl font-800 mb-2">
          International Teams
        </h1>
        <p className="text-muted-foreground mb-4">
          World's top cricket nations — profiles, rankings, and comparisons
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          💡 Click two teams to compare them side-by-side
        </p>
      </AnimatedSection>

      {/* Selection indicators */}
      {(compareTeam1 || compareTeam2) && (
        <AnimatedSection className="mb-6">
          <div className="flex items-center gap-4 p-4 glass-card rounded-xl border border-primary/20">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">Comparing:</span>
              {compareTeam1 && (
                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium border border-primary/30">
                  {compareTeam1.flag} {compareTeam1.name}
                </span>
              )}
              {compareTeam1 && (
                <span className="text-muted-foreground">vs</span>
              )}
              {compareTeam2 ? (
                <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium border border-accent/30">
                  {compareTeam2.flag} {compareTeam2.name}
                </span>
              ) : (
                <span className="text-muted-foreground text-sm italic">
                  Select second team...
                </span>
              )}
            </div>
            <div className="ml-auto flex gap-2">
              {canCompare && (
                <button
                  type="button"
                  data-ocid="teams.compare_button"
                  onClick={() => setShowComparison(true)}
                  className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all glow-gold"
                >
                  Compare
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setCompareTeam1(null);
                  setCompareTeam2(null);
                  setShowComparison(false);
                }}
                className="px-3 py-1.5 rounded-lg border border-border/50 text-sm text-muted-foreground hover:text-foreground transition-all"
              >
                Clear
              </button>
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Comparison Panel */}
      {showComparison && compareTeam1 && compareTeam2 && (
        <AnimatedSection className="mb-10">
          <div
            data-ocid="teams.panel"
            className="glass-card rounded-2xl p-6 border border-primary/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-800">
                Team Comparison
              </h2>
              <button
                type="button"
                onClick={() => setShowComparison(false)}
                className="text-muted-foreground hover:text-foreground text-xl"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-6xl mb-3">{compareTeam1.flag}</div>
                <h3 className="font-display text-2xl font-800 text-primary mb-4">
                  {compareTeam1.name}
                </h3>
                <div className="text-left">
                  <TeamStats team={compareTeam1} />
                </div>
              </div>
              <div className="text-center">
                <div className="text-6xl mb-3">{compareTeam2.flag}</div>
                <h3 className="font-display text-2xl font-800 text-accent mb-4">
                  {compareTeam2.name}
                </h3>
                <div className="text-left">
                  <TeamStats team={compareTeam2} />
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Teams Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {TEAMS.map((team, i) => {
          const isSelected =
            compareTeam1?.id === team.id || compareTeam2?.id === team.id;
          return (
            <AnimatedSection key={team.id} delay={i * 80}>
              <button
                type="button"
                data-ocid={`teams.item.${i + 1}`}
                onClick={() => handleTeamClick(team)}
                className={`glass-card rounded-xl p-6 hover-lift cursor-pointer transition-all w-full text-left ${
                  isSelected ? "border-primary/50 glow-gold" : ""
                }`}
              >
                <div className="text-center mb-4">
                  <div className="text-5xl mb-3">{team.flag}</div>
                  <h3 className="font-display font-800 text-xl">{team.name}</h3>
                  <div className="text-muted-foreground text-sm">
                    ICC Rank #{team.ranking}
                  </div>
                </div>
                <div
                  className="h-1 rounded-full mb-4"
                  style={{
                    background: `linear-gradient(90deg, ${team.color}88, ${team.color})`,
                  }}
                />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Captain</span>
                    <span className="font-medium text-xs text-right">
                      {team.captain}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Titles</span>
                    <span className="text-primary text-xs font-medium text-right">
                      {team.titles.split(",")[0]}
                    </span>
                  </div>
                </div>
                {isSelected && (
                  <div className="mt-3 text-center text-xs text-primary font-medium">
                    ✓ Selected
                  </div>
                )}
              </button>
            </AnimatedSection>
          );
        })}
      </div>
    </div>
  );
}
