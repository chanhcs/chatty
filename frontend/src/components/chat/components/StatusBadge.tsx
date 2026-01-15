import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statusBadgeVariants = cva(
  "absolute -bottom-0.5 right-0.5 size-3.5 rounded-full border border-card",
  {
    variants: {
      status: {
        online: "status-online",
        offline: "status-offline",
      },
    },
    defaultVariants: {
      status: "offline",
    },
  }
);

interface StatusBadgeProps
  extends VariantProps<typeof statusBadgeVariants> {
  className?: string;
}

export const StatusBadge = ({
  status,
  className,
}: StatusBadgeProps) => {
  return (
    <div
      className={cn(statusBadgeVariants({ status }), className)}
      aria-label={`User is ${status}`}
    />
  );
};