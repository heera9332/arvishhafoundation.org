import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-emerald-100 text-emerald-900 border border-emerald-200/50",
        primary:
          "bg-[#03452c] text-white",
        secondary:
          "bg-slate-100 text-slate-800 border border-slate-200",
        accent:
          "bg-amber-100 text-amber-900 border border-amber-200/60 font-semibold",
        outline:
          "border border-slate-200 text-slate-700",
        outlineGreen:
          "border border-emerald-800 text-emerald-900 bg-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
