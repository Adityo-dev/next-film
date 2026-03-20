const MovieCardSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Image Skeleton */}
      <div className="relative aspect-3/4 w-full rounded-sm bg-slate-800/50">
        <div className="skeleton-shimmer absolute inset-0 bg-linear-to-r from-transparent via-slate-700/20 to-transparent"></div>
      </div>

      {/* Text Skeleton */}
      <div className="mt-3 space-y-2">
        <div className="h-5 w-3/4 rounded bg-slate-800/50"></div>
        <div className="h-4 w-1/4 rounded bg-slate-800/30"></div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
