import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import type { Player } from "../backend.d";
import { PlayerRole } from "../backend.d";
import { AnimatedSection } from "../components/AnimatedSection";
import { SkeletonCard } from "../components/LoadingSpinner";
import { samplePlayers } from "../data/sampleData";
import { usePlayers } from "../hooks/useQueries";

const playerImages = [
  "/assets/generated/player-bat.dim_400x400.jpg",
  "/assets/generated/player-bowl.dim_400x400.jpg",
  "/assets/generated/player-india.dim_400x400.jpg",
  "/assets/generated/player-ipl.dim_400x400.jpg",
];

const roleBadge: Record<PlayerRole, string> = {
  [PlayerRole.batsman]: "bg-primary/20 text-primary border-primary/30",
  [PlayerRole.bowler]:
    "bg-destructive/20 text-destructive border-destructive/30",
  [PlayerRole.allrounder]: "bg-chart-2/20 text-chart-2 border-chart-2/30",
  [PlayerRole.wicketkeeper]: "bg-chart-4/20 text-chart-4 border-chart-4/30",
};

const countryFlag: Record<string, string> = {
  India: "🇮🇳",
  Australia: "🇦🇺",
  England: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  Pakistan: "🇵🇰",
  "South Africa": "🇿🇦",
  "New Zealand": "🇳🇿",
  "West Indies": "🌴",
  "Sri Lanka": "🇱🇰",
  Bangladesh: "🇧🇩",
  Afghanistan: "🇦🇫",
};

function StatRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-border/30">
      <span className="text-muted-foreground text-sm">{label}</span>
      <span className="font-700 text-sm">{value}</span>
    </div>
  );
}

export function PlayersPage() {
  const [search, setSearch] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const { data: playersData, isLoading } = usePlayers();

  const players: Player[] =
    playersData && playersData.length > 0 ? playersData : samplePlayers;
  const filtered = players.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.country.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div
      className="container mx-auto px-4 py-8"
      style={{ paddingTop: "100px" }}
    >
      <AnimatedSection>
        <h1 className="font-display text-4xl md:text-5xl font-800 mb-2">
          Players
        </h1>
        <p className="text-muted-foreground mb-8">
          In-depth profiles, stats, and career highlights
        </p>
      </AnimatedSection>

      {/* Search */}
      <AnimatedSection delay={100} className="mb-8">
        <div className="relative max-w-md">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            🔍
          </span>
          <input
            type="text"
            data-ocid="players.search_input"
            placeholder="Search by player name or country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border/50 bg-muted/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
          />
        </div>
      </AnimatedSection>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: loading skeleton
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filtered.slice(0, 10).map((player, i) => (
              <AnimatedSection key={Number(player.id)} delay={i * 60}>
                <button
                  type="button"
                  data-ocid={`players.item.${i + 1}`}
                  className="glass-card rounded-xl overflow-hidden hover-lift cursor-pointer group w-full text-left"
                  onClick={() => setSelectedPlayer(player)}
                >
                  <div className="relative img-zoom h-56 overflow-hidden">
                    <img
                      src={
                        player.imageUrl || playerImages[i % playerImages.length]
                      }
                      alt={player.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/10 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="font-display font-700 text-base leading-tight">
                        {player.name}
                      </div>
                      <div className="text-muted-foreground text-xs flex items-center gap-1">
                        <span>{countryFlag[player.country] || "🌍"}</span>
                        <span>{player.country}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border font-medium capitalize ${roleBadge[player.role]}`}
                    >
                      {player.role}
                    </span>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-center">
                      <div className="bg-muted/20 rounded-lg py-1.5">
                        <div className="font-700 text-sm text-primary">
                          {Number(player.battingStats.runs).toLocaleString()}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          Runs
                        </div>
                      </div>
                      <div className="bg-muted/20 rounded-lg py-1.5">
                        <div className="font-700 text-sm text-chart-2">
                          {Number(player.bowlingStats.wickets)}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          Wickets
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </AnimatedSection>
            ))}
          </div>

          {filtered.length === 0 && (
            <div
              data-ocid="players.empty_state"
              className="text-center py-20 text-muted-foreground"
            >
              <div className="text-5xl mb-4">🏏</div>
              <p className="text-lg font-medium">No players found</p>
            </div>
          )}
        </>
      )}

      {/* Player Detail Dialog */}
      <Dialog
        open={!!selectedPlayer}
        onOpenChange={(open) => !open && setSelectedPlayer(null)}
      >
        <DialogContent
          data-ocid="players.dialog"
          className="max-w-2xl bg-card border-border/50 max-h-[90vh] overflow-y-auto"
        >
          {selectedPlayer && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-4">
                  <img
                    src={selectedPlayer.imageUrl || playerImages[0]}
                    alt={selectedPlayer.name}
                    className="w-20 h-20 rounded-xl object-cover border-2 border-primary/30"
                  />
                  <div>
                    <DialogTitle className="font-display text-2xl font-800">
                      {selectedPlayer.name}
                    </DialogTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <span>{countryFlag[selectedPlayer.country] || "🌍"}</span>
                      <span className="text-muted-foreground">
                        {selectedPlayer.country}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full border font-medium capitalize ${roleBadge[selectedPlayer.role]}`}
                      >
                        {selectedPlayer.role}
                      </span>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <p className="text-muted-foreground text-sm leading-relaxed">
                {selectedPlayer.bio}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                {/* Batting */}
                <div className="glass-card rounded-xl p-4">
                  <h3 className="font-display font-700 mb-3 text-primary flex items-center gap-2">
                    🏏 Batting Stats
                  </h3>
                  <StatRow
                    label="Matches"
                    value={Number(selectedPlayer.battingStats.matches)}
                  />
                  <StatRow
                    label="Runs"
                    value={Number(
                      selectedPlayer.battingStats.runs,
                    ).toLocaleString()}
                  />
                  <StatRow
                    label="Average"
                    value={selectedPlayer.battingStats.average.toFixed(2)}
                  />
                  <StatRow
                    label="Strike Rate"
                    value={selectedPlayer.battingStats.strikeRate.toFixed(1)}
                  />
                  <StatRow
                    label="100s / 50s"
                    value={`${Number(selectedPlayer.battingStats.centuries)} / ${Number(selectedPlayer.battingStats.halfCenturies)}`}
                  />
                  <StatRow
                    label="High Score"
                    value={`${Number(selectedPlayer.battingStats.highScore)}*`}
                  />
                </div>

                {/* Bowling */}
                <div className="glass-card rounded-xl p-4">
                  <h3 className="font-display font-700 mb-3 text-chart-2 flex items-center gap-2">
                    ⚡ Bowling Stats
                  </h3>
                  <StatRow
                    label="Wickets"
                    value={Number(selectedPlayer.bowlingStats.wickets)}
                  />
                  <StatRow
                    label="Economy"
                    value={selectedPlayer.bowlingStats.economy.toFixed(2)}
                  />
                  <StatRow
                    label="Average"
                    value={selectedPlayer.bowlingStats.average.toFixed(2)}
                  />
                  <StatRow
                    label="Best Figures"
                    value={selectedPlayer.bowlingStats.bestFigures}
                  />
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
