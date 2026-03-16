import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { MatchesPage } from "./pages/MatchesPage";
import { NewsPage } from "./pages/NewsPage";
import { PlayersPage } from "./pages/PlayersPage";
import { RecordsPage } from "./pages/RecordsPage";
import { TeamsPage } from "./pages/TeamsPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5 * 60 * 1000, retry: 2 },
  },
});

type Tab = "home" | "news" | "players" | "matches" | "records" | "teams";

const FOOTER_TABS: Tab[] = [
  "home",
  "news",
  "players",
  "matches",
  "records",
  "teams",
];

function CricketApp() {
  const [activeTab, setActiveTab] = useState<Tab>("home");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as Tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Background atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-5"
          style={{
            background:
              "radial-gradient(circle, oklch(0.78 0.18 85), transparent)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-5"
          style={{
            background:
              "radial-gradient(circle, oklch(0.60 0.18 145), transparent)",
          }}
        />
      </div>

      <Navbar activeTab={activeTab} onTabChange={handleTabChange} />

      <main>
        {activeTab === "home" && <HomePage onNavigate={handleTabChange} />}
        {activeTab === "news" && <NewsPage />}
        {activeTab === "players" && <PlayersPage />}
        {activeTab === "matches" && <MatchesPage />}
        {activeTab === "records" && <RecordsPage />}
        {activeTab === "teams" && <TeamsPage />}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-border/50 py-8 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/generated/cricket-logo-transparent.dim_200x200.png"
                alt="CricketPulse"
                className="h-8 w-8 object-contain"
              />
              <span className="font-display font-700 text-gradient-gold">
                CricketPulse
              </span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              {FOOTER_TABS.map((tab) => (
                <button
                  type="button"
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className="hover:text-primary transition-colors capitalize"
                >
                  {tab}
                </button>
              ))}
            </div>
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()}. Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CricketApp />
    </QueryClientProvider>
  );
}
