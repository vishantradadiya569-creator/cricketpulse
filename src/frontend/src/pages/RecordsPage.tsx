import type { Record_ } from "../backend.d";
import { MatchFormat, RecordCategory } from "../backend.d";
import { AnimatedCounter } from "../components/AnimatedCounter";
import { AnimatedSection } from "../components/AnimatedSection";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { cricketFacts, sampleRecords } from "../data/sampleData";
import { useRecords } from "../hooks/useQueries";

const formatBadge: Record<MatchFormat, string> = {
  [MatchFormat.test]: "bg-chart-4/20 text-chart-4 border-chart-4/30",
  [MatchFormat.odi]: "bg-chart-2/20 text-chart-2 border-chart-2/30",
  [MatchFormat.t20]: "bg-primary/20 text-primary border-primary/30",
  [MatchFormat.ipl]: "bg-destructive/20 text-destructive border-destructive/30",
};

function RecordCard({ record, index }: { record: Record_; index: number }) {
  const numericValue = Number.parseInt(record.value.replace(/[^0-9]/g, ""), 10);
  const hasNumber = !Number.isNaN(numericValue) && numericValue > 0;

  return (
    <AnimatedSection delay={index * 80}>
      <div
        data-ocid={`records.item.${index + 1}`}
        className="glass-card rounded-xl p-5 hover-lift cursor-default"
      >
        <div className="flex items-start justify-between mb-3">
          <span
            className={`text-xs px-2 py-0.5 rounded-full border font-medium uppercase ${formatBadge[record.format]}`}
          >
            {record.format}
          </span>
          <span className="text-xs text-muted-foreground">
            {Number(record.year)}
          </span>
        </div>
        <div className="mb-2">
          {hasNumber ? (
            <div className="font-display text-3xl font-800 text-gradient-gold">
              <AnimatedCounter target={numericValue} />
              {record.value.replace(String(numericValue), "")}
            </div>
          ) : (
            <div className="font-display text-3xl font-800 text-gradient-gold">
              {record.value}
            </div>
          )}
        </div>
        <h3 className="font-display font-700 text-sm leading-snug mb-1">
          {record.title}
        </h3>
        <p className="text-muted-foreground text-xs flex items-center gap-1">
          <span>🏆</span> {record.holder}
        </p>
      </div>
    </AnimatedSection>
  );
}

export function RecordsPage() {
  const { data: recordsData, isLoading } = useRecords();
  const allRecords: Record_[] =
    recordsData && recordsData.length > 0 ? recordsData : sampleRecords;

  const battingRecords = allRecords.filter(
    (r) => r.category === RecordCategory.batting,
  );
  const bowlingRecords = allRecords.filter(
    (r) => r.category === RecordCategory.bowling,
  );
  const teamRecords = allRecords.filter(
    (r) => r.category === RecordCategory.team,
  );

  return (
    <div
      className="container mx-auto px-4 py-8"
      style={{ paddingTop: "100px" }}
    >
      <AnimatedSection>
        <h1 className="font-display text-4xl md:text-5xl font-800 mb-2">
          Records & Facts
        </h1>
        <p className="text-muted-foreground mb-12">
          Cricket's greatest milestones and unforgettable achievements
        </p>
      </AnimatedSection>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div data-ocid="records.section">
          {/* Batting Records */}
          <section className="mb-14">
            <AnimatedSection>
              <h2 className="font-display text-2xl font-800 mb-6 flex items-center gap-3">
                <span className="text-primary">🏏</span> Batting Records
              </h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {battingRecords.map((record, i) => (
                <RecordCard key={Number(record.id)} record={record} index={i} />
              ))}
            </div>
          </section>

          {/* Bowling Records */}
          <section className="mb-14">
            <AnimatedSection>
              <h2 className="font-display text-2xl font-800 mb-6 flex items-center gap-3">
                <span className="text-chart-2">⚡</span> Bowling Records
              </h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {bowlingRecords.map((record, i) => (
                <RecordCard
                  key={Number(record.id)}
                  record={record}
                  index={i + 4}
                />
              ))}
            </div>
          </section>

          {/* Team Records */}
          <section className="mb-14">
            <AnimatedSection>
              <h2 className="font-display text-2xl font-800 mb-6 flex items-center gap-3">
                <span className="text-destructive">🏆</span> Team Records
              </h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamRecords.map((record, i) => (
                <RecordCard
                  key={Number(record.id)}
                  record={record}
                  index={i + 7}
                />
              ))}
            </div>
          </section>

          {/* Cricket Facts */}
          <section>
            <AnimatedSection>
              <h2 className="font-display text-2xl font-800 mb-6 flex items-center gap-3">
                <span>💫</span> Cricket Trivia & Facts
              </h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cricketFacts.map((fact, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static fact list
                <AnimatedSection key={i} delay={i * 80}>
                  <div className="glass-card rounded-xl p-5 hover-lift">
                    <div className="text-3xl mb-3">{fact.emoji}</div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {fact.fact}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
