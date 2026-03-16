export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="cricket-loader" />
      <p className="text-muted-foreground text-sm animate-pulse">Loading...</p>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="skeleton h-48" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-4 rounded w-3/4" />
        <div className="skeleton h-3 rounded w-full" />
        <div className="skeleton h-3 rounded w-5/6" />
      </div>
    </div>
  );
}
