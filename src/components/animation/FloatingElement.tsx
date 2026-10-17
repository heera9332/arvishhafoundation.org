"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface FloatingElementProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  animation?: "slow" | "delayed" | "reverse";
  className?: string;
}

export function FloatingElement({
  children,
  animation = "slow",
  className,
  ...props
}: FloatingElementProps) {
  const animationClass =
    animation === "delayed"
      ? "animate-float-delayed"
      : animation === "reverse"
      ? "animate-float-reverse"
      : "animate-float-slow";

  return (
    <div className={cn(animationClass, className)} {...props}>
      {children}
    </div>
  );
}

export default FloatingElement;
