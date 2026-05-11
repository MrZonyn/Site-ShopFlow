type BadgeVariant = "default" | "success" | "warning" | "danger" | "brand";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-surface-700 text-gray-300",
  success: "bg-green-500/15 text-green-400",
  warning: "bg-amber-500/15 text-amber-400",
  danger: "bg-red-500/15 text-red-400",
  brand: "bg-brand-500/15 text-brand-400",
};

export function Badge({ variant = "default", children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full ${variantClasses[variant]}
    `}
    >
      {children}
    </span>
  );
}
