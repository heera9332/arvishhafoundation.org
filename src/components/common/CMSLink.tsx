import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface CMSLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href?: string | null;
  newTab?: boolean | null;
  active?: boolean;
  activeClassName?: string;
  children: React.ReactNode;
}

/**
 * Reusable dynamic link component that handles internal Next.js routing,
 * external URLs, protocol links (tel:, mailto:), and newTab security attributes.
 */
export const CMSLink = React.forwardRef<HTMLAnchorElement, CMSLinkProps>(
  (
    {
      href = "/",
      newTab = false,
      active = false,
      className,
      activeClassName,
      children,
      target,
      rel,
      ...rest
    },
    ref
  ) => {
    const destination = href || "/";
    const opensNewTab = Boolean(newTab || target === "_blank");
    const isExternal =
      opensNewTab ||
      destination.startsWith("http://") ||
      destination.startsWith("https://") ||
      destination.startsWith("mailto:") ||
      destination.startsWith("tel:");

    const combinedClassName = cn(className, active && activeClassName);

    if (isExternal) {
      return (
        <a
          ref={ref}
          href={destination}
          target={opensNewTab ? "_blank" : target}
          rel={opensNewTab ? "noopener noreferrer" : rel}
          className={combinedClassName}
          {...rest}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        ref={ref}
        href={destination}
        className={combinedClassName}
        {...rest}
      >
        {children}
      </Link>
    );
  }
);

CMSLink.displayName = "CMSLink";
