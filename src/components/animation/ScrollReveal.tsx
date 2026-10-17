"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export type AnimationVariant =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "zoom-in"
  | "fade";

export interface ScrollRevealProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  variant?: AnimationVariant;
  delay?: number; // in milliseconds
  duration?: number; // in milliseconds
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  className?: string;
  as?: React.ElementType;
  style?: React.CSSProperties;
}

const variantInitialTransforms: Record<AnimationVariant, string> = {
  "fade-up": "translate3d(0, 32px, 0)",
  "fade-down": "translate3d(0, -32px, 0)",
  "fade-left": "translate3d(32px, 0, 0)",
  "fade-right": "translate3d(-32px, 0, 0)",
  "zoom-in": "scale(0.94)",
  fade: "none",
};

export function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 700,
  threshold = 0.1,
  rootMargin = "0px 0px -40px 0px",
  once = true,
  className,
  as: Component = "div",
  style,
  ...props
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const element = elementRef.current;
    if (!element) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsRevealed(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once]);

  // Before mounting on client, render with opacity 1 to avoid hydration mismatch
  // and ensure content is always visible if JavaScript is slow
  const showRevealed = !isMounted || isRevealed;

  const animationStyle: React.CSSProperties = {
    ...style,
    opacity: showRevealed ? 1 : 0,
    transform: showRevealed
      ? "translate3d(0, 0, 0) scale(1)"
      : variantInitialTransforms[variant],
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    transitionProperty: "opacity, transform",
    willChange: isRevealed ? "auto" : "opacity, transform",
  };

  return (
    <Component
      ref={elementRef}
      className={cn("scroll-reveal", isRevealed && "is-revealed", className)}
      style={animationStyle}
      {...props}
    >
      {children}
    </Component>
  );
}

export default ScrollReveal;
