import React from "react";
import { CMSLink } from "@/components/common/CMSLink";

export interface LexicalNode {
  type?: string;
  tag?: string;
  text?: string;
  format?: number | string;
  listType?: string;
  fields?: {
    url?: string;
    newTab?: boolean;
  };
  children?: LexicalNode[];
}

/**
 * Recursive Lexical rich text AST renderer.
 */
export function LexicalRenderer({
  node,
}: {
  node?: LexicalNode | null;
}): React.ReactNode {
  if (!node) return null;

  if (node.type === "text") {
    let content: React.ReactNode = node.text || "";
    const format = typeof node.format === "number" ? node.format : 0;
    if (format & 1) content = <strong>{content}</strong>;
    if (format & 2) content = <em>{content}</em>;
    if (format & 4) content = <del>{content}</del>;
    if (format & 8) content = <u>{content}</u>;
    if (format & 16) {
      content = (
        <code className="bg-slate-100 text-emerald-800 text-xs px-1.5 py-0.5 rounded font-mono">
          {content}
        </code>
      );
    }
    return content;
  }

  if (node.type === "linebreak") return <br />;
  if (node.type === "horizontalrule") return <hr className="my-6 border-slate-200" />;

  const children = Array.isArray(node.children)
    ? node.children.map((child: LexicalNode, idx: number) => (
        <LexicalRenderer key={idx} node={child} />
      ))
    : null;

  switch (node.type) {
    case "paragraph": {
      const alignClass =
        node.format === "center"
          ? "text-center"
          : node.format === "right"
            ? "text-right"
            : node.format === "justify"
              ? "text-justify"
              : "";
      return (
        <p className={`mb-4 text-slate-700 leading-relaxed ${alignClass}`}>
          {children}
        </p>
      );
    }
    case "heading": {
      const tag = (node.tag || "h2").toLowerCase();
      if (tag === "h1") {
        return (
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-8 mb-4 tracking-tight">
            {children}
          </h1>
        );
      }
      if (tag === "h3") {
        return (
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-6 mb-2 tracking-tight">
            {children}
          </h3>
        );
      }
      if (tag === "h4") {
        return (
          <h4 className="text-lg font-bold text-slate-900 mt-5 mb-2 tracking-tight">
            {children}
          </h4>
        );
      }
      return (
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-7 mb-3 tracking-tight">
          {children}
        </h2>
      );
    }
    case "list":
      if (node.listType === "number") {
        return <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>;
      }
      return <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>;
    case "listitem":
      return <li className="text-slate-700 leading-relaxed">{children}</li>;
    case "quote":
      return (
        <blockquote className="border-l-4 border-emerald-600 pl-4 py-2 my-5 italic text-slate-800 bg-slate-50 rounded-r-lg">
          {children}
        </blockquote>
      );
    case "link":
      return (
        <CMSLink
          href={node.fields?.url || "#"}
          newTab={node.fields?.newTab}
          className="text-[#03452c] underline hover:text-emerald-700 font-semibold transition-colors"
        >
          {children}
        </CMSLink>
      );
    default:
      return children;
  }
}

export default LexicalRenderer;
