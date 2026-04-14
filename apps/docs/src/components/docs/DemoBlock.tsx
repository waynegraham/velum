"use client";

import type { ReactNode } from "react";

interface DemoBlockProps {
  children: ReactNode;
  label?: string;
  className?: string;
}

/**
 * DemoBlock provides a structured, minimal container for component demonstrations.
 * It follows the Velum editorial design language: generous whitespace, 
 * subtle borders, and a prioritize the content over the UI chrome.
 */
export function DemoBlock({ children, label, className = "" }: DemoBlockProps) {
  return (
    <div className={`demo-block editorial-stack relative my-16 ${className}`}>
      {label && (
        <div className="flex items-center gap-4">
          <span className="text-label opacity-60">{label}</span>
          <div className="h-px flex-1 bg-line opacity-10" />
        </div>
      )}

      <div className="docs-panel relative flex min-h-60 w-full items-center justify-center px-6 py-10">
        <div className="flex w-full items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
