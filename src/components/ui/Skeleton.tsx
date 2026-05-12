interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div className={`animate-pulse bg-surface-700 rounded-x1 ${className}`} />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-surface-800 rounded-2xl overflow-hidden border border-surface-700">
      <Skeleton className="aspect-square rounded-none" />
      <div className="p-4 flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-3e w-16" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-6 w-32" />
        </div>
        <Skeleton className="h-9 w-full rounded-x1" />
      </div>
    </div>
  );
}
