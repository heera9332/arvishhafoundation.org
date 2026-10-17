"use client";

import React, { createContext, useContext, useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import type { AnimationVariant } from "./ScrollReveal";

interface StaggerContextType {
  isRevealed: boolean;
  baseDelay: number;
  staggerInterval: number;
  duration: number;
  variant: AnimationVariant;
  registerItem: () => number;
}

const StaggerContext = createContext<StaggerContextType>({
  isRevealed: false,
  baseDelay: 0,
  staggerInterval: 100,
  duration: 650,
  variant: "fade-up",
  registerItem: () => 0,
});

export interface StaggerGroupProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  baseDelay?: number;
  initialDelay?: number;
  staggerInterval?: number;
  staggerDelay?: number;
  duration?: number;
  variant?: AnimationVariant;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  as?: React.ElementType;
}

export function StaggerGroup({
  children,
  baseDelay = 0,
  initialDelay,
  staggerInterval = 100,
  staggerDelay,
  duration = 650,
  variant = "fade-up",
  threshold = 0.1,
  rootMargin = "0px 0px -40px 0px",
  className,
  as: Component = "div",
  ...props
}: StaggerGroupProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const itemIndexRef = useRef(0);

  const effectiveBaseDelay = initialDelay !== undefined ? initialDelay : baseDelay;
  const effectiveStaggerInterval = staggerDelay !== undefined ? staggerDelay : staggerInterval;

  // Reset index counter on each render so items get consistent indices
  itemIndexRef.current = 0;
  const registerItem = () => {
    const idx = itemIndexRef.current;
    itemIndexRef.current += 1;
    return idx;
  };

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(element);
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
  }, [threshold, rootMargin]);

  return (
    <StaggerContext.Provider
      value={{
        isRevealed,
        baseDelay: effectiveBaseDelay,
        staggerInterval: effectiveStaggerInterval,
        duration,
        variant,
        registerItem,
      }}
    >
      <Component ref={containerRef} className={className} {...props}>
        {children}
      </Component>
    </StaggerContext.Provider>
  );
}

export interface StaggerItemProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  index?: number;
  variant?: AnimationVariant;
  duration?: number;
  className?: string;
  as?: React.ElementType;
}

const variantTransforms: Record<AnimationVariant, string> = {
  "fade-up": "translate3d(0, 28px, 0)",
  "fade-down": "translate3d(0, -28px, 0)",
  "fade-left": "translate3d(28px, 0, 0)",
  "fade-right": "translate3d(-28px, 0, 0)",
  "zoom-in": "scale(0.94)",
  fade: "none",
};

export function StaggerItem({
  children,
  index,
  variant,
  duration,
  className,
  as: Component = "div",
  style,
  ...props
}: StaggerItemProps) {
  const ctx = useContext(StaggerContext);
  const [isMounted, setIsMounted] = useState(false);
  const autoIndexRef = useRef<number | null>(null);

  if (autoIndexRef.current === null) {
    autoIndexRef.current = index !== undefined ? index : ctx.registerItem();
  }

  const effectiveIndex = index !== undefined ? index : autoIndexRef.current;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const activeVariant = variant || ctx.variant;
  const activeDuration = duration || ctx.duration;
  const delay = ctx.baseDelay + effectiveIndex * ctx.staggerInterval;

  const showRevealed = !isMounted || ctx.isRevealed;

  const itemStyle: React.CSSProperties = {
    ...style,
    opacity: showRevealed ? 1 : 0,
    transform: showRevealed
      ? "translate3d(0, 0, 0) scale(1)"
      : variantTransforms[activeVariant],
    transitionDuration: `${activeDuration}ms`,
    transitionDelay: `${delay}ms`,
    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    transitionProperty: "opacity, transform",
    willChange: ctx.isRevealed ? "auto" : "opacity, transform",
  };

  return (
    <Component
      className={cn("scroll-reveal", ctx.isRevealed && "is-revealed", className)}
      style={itemStyle}
      {...props}
    >
      {children}
    </Component>
  );
}

export default StaggerGroup;
