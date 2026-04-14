"use client";

import { CodeSnippet } from "../ui/CodeSnippet";

interface CodeExampleProps {
  code: string;
  language?: string;
  title?: string;
  className?: string;
}

/**
 * CodeExample provides a refined, editorial container for code snippets.
 * It uses the project's monospace stack and subtle backgrounds to maintain
 * readability without visual noise.
 */
export function CodeExample({ 
  code, 
  language = "tsx", 
  title, 
  className = "" 
}: CodeExampleProps) {
  return (
    <div className={`code-example editorial-stack relative my-16 ${className}`}>
      {title && (
        <div className="flex items-center gap-4">
          <span className="text-label opacity-60">{title}</span>
          <div className="h-px flex-1 bg-line opacity-10" />
        </div>
      )}

      <div className="relative overflow-hidden code-panel">
        <CodeSnippet 
          code={code} 
          language={language} 
          className="border-0 !bg-transparent px-0 py-8"
        />
      </div>
    </div>
  );
}
