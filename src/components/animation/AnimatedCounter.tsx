"use client";

import React, { useRef, useState, useEffect } from "react";

export interface AnimatedCounterProps {
  value: string | number;
  duration?: number; // duration in ms
  className?: string;
}

function parseValue(val: string | number) {
  if (typeof val === "number") {
    return {
      prefix: "",
      target: val,
      suffix: "",
      hasCommas: false,
      isValid: true,
    };
  }

  const str = String(val).trim();
  // Regex to extract prefix, digits (with optional commas and decimals), and suffix
  const match = str.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);

  if (!match) {
    return {
      prefix: "",
      target: 0,
      suffix: str,
      hasCommas: false,
      isValid: false,
    };
  }

  const prefix = match[1] || "";
  const numPart = match[2];
  const suffix = match[3] || "";
  const hasCommas = numPart.includes(",");
  const target = parseFloat(numPart.replace(/,/g, ""));

  return {
    prefix,
    target: isNaN(target) ? 0 : target,
    suffix,
    hasCommas,
    isValid: !isNaN(target),
  };
}

function easeOutExpo(x: number): number {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

export function AnimatedCounter({
  value,
  duration = 1600,
  className,
}: AnimatedCounterProps) {
  const parsed = parseValue(value);
  const [displayNumber, setDisplayNumber] = useState<number>(parsed.isValid ? 0 : parsed.target);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!parsed.isValid) return;

    const element = elementRef.current;
    if (!element) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setDisplayNumber(parsed.target);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [parsed.isValid, parsed.target, hasStarted]);

  useEffect(() => {
    if (!hasStarted || !parsed.isValid) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const current = easedProgress * parsed.target;

      setDisplayNumber(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayNumber(parsed.target);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [hasStarted, parsed.target, parsed.isValid, duration]);

  if (!parsed.isValid) {
    return <span className={className}>{String(value)}</span>;
  }

  const rounded = Math.round(displayNumber);
  const formattedNumber = parsed.hasCommas
    ? rounded.toLocaleString("en-IN")
    : String(rounded);

  return (
    <span ref={elementRef} className={className}>
      {parsed.prefix}
      {formattedNumber}
      {parsed.suffix}
    </span>
  );
}

export default AnimatedCounter;
