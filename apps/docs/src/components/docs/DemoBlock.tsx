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
    <div className={`demo-block group relative my-16 flex flex-col gap-4 ${className}`}>
      {label && (
        <div className="flex items-center gap-4">
          <span className="text-label opacity-60 transition-opacity group-hover:opacity-100">
            {label}
          </span>
          <div className="h-px flex-1 bg-line opacity-10" />
        </div>
      )}
      
      <div className="relative flex min-h-[240px] w-full items-center justify-center rounded-[0.15rem] border border-line bg-surface/20 p-12 transition-all duration-base ease-fluid hover:bg-surface/40">
        {/* Subtle grid or texture could go here if needed, but keeping it minimal for now */}
        <div className="flex w-full items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
