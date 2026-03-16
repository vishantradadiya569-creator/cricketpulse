import { useEffect, useState } from "react";

const NAV_TABS = [
  { id: "home", label: "Home" },
  { id: "news", label: "News" },
  { id: "players", label: "Players" },
  { id: "matches", label: "Matches" },
  { id: "records", label: "Records" },
  { id: "teams", label: "Teams" },
] as const;

const TICKER_HEADLINES = [
  "🏏 LIVE: India vs Australia — 2nd Test, Day 3 | IND 311/7",
  "⚡ Virat Kohli scores 78 in a sublime chase at MCG",
  "🏆 IPL 2025 Auction: Records broken as franchises splash the cash",
  "🎯 Jasprit Bumrah claims 5-wicket haul, ICC #1 Test Bowler again",
  "📢 England announces 16-man squad for South Africa Test Series",
  "🌟 Rohit Sharma becomes 3rd Indian to reach 10,000 Test runs",
  "🔥 CSK vs MI Opener: Dhoni fans pack Chepauk to capacity",
  "💫 Babar Azam returns to form with 134 vs New Zealand",
];

type NavTab = (typeof NAV_TABS)[number]["id"];

interface NavbarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export function Navbar({ activeTab, onTabChange }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "navbar-scrolled" : "bg-background/80 backdrop-blur-md"
      } border-b border-border/50`}
    >
      {/* Main nav */}
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/assets/generated/cricket-logo-transparent.dim_200x200.png"
            alt="CricketPulse Logo"
            className="h-10 w-10 object-contain"
          />
          <span className="font-display text-xl font-800 text-gradient-gold tracking-tight">
            CricketPulse
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_TABS.map((tab) => (
            <button
              type="button"
              key={tab.id}
              data-ocid="nav.link"
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="w-5 h-0.5 bg-current mb-1.5 transition-all" />
          <div className="w-5 h-0.5 bg-current mb-1.5 transition-all" />
          <div className="w-5 h-0.5 bg-current transition-all" />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-lg px-4 py-2">
          {NAV_TABS.map((tab) => (
            <button
              type="button"
              key={tab.id}
              data-ocid="nav.link"
              onClick={() => {
                onTabChange(tab.id);
                setMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* News ticker */}
      <div className="bg-destructive/10 border-t border-destructive/20 overflow-hidden h-8 flex items-center">
        <span className="text-destructive font-display font-700 text-xs px-3 shrink-0">
          BREAKING
        </span>
        <div className="flex-1 overflow-hidden relative">
          <div className="ticker-animation flex gap-12 text-xs text-muted-foreground">
            {TICKER_HEADLINES.concat(TICKER_HEADLINES).map((headline, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: ticker items are static
              <span key={i} className="whitespace-nowrap">
                {headline}
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
