import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-emerald-900 text-white hover:bg-emerald-800 shadow-sm hover:shadow",
        primary:
          "bg-[#03452c] text-white hover:bg-[#023320] shadow-sm hover:shadow",
        accent:
          "bg-[#f59e0b] text-slate-950 font-semibold hover:bg-[#d97706] hover:text-white shadow-sm",
        outline:
          "border border-slate-200 bg-white hover:bg-slate-50 text-slate-900",
        outlinePrimary:
          "border-2 border-[#03452c] bg-transparent text-[#03452c] hover:bg-[#03452c] hover:text-white",
        outlineLight:
          "border border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-xs",
        secondary:
          "bg-emerald-50 text-emerald-900 hover:bg-emerald-100",
        ghost:
          "hover:bg-slate-100 text-slate-800",
        link:
          "text-[#03452c] underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 rounded-full px-4 text-xs",
        lg: "h-13 rounded-full px-8 text-base font-semibold",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
