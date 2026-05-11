interface StarRatingProps {
  rating: number;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "text-sm",
  md: "text-lg",
  lg: "text-2x1",
};

export function StarRating({
  rating,
  showValue = false,
  size = "md",
}: StarRatingProps) {
  return (
    <div className="flex items-center gap-1.5">
      <div className={`flex ${sizeClasses[size]}`}>
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < Math.floor(rating);
          const partial = !filled && i < rating;

          return (
            <span
              key={i}
              className="relative inline-block"
              style={{ color: "#94a3b8" }} // cinza base
            >
              ★
              {(filled || partial) && (
                <span
                  className="absolute inset-0 overflow-hidden text-amber-400"
                  style={{ width: filled ? "100%" : `${(rating % 1) * 100}%` }}
                >
                  ★
                </span>
              )}
            </span>
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm font-semibold text-amber-400">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
