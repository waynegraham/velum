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
    <div className={`code-example group relative my-16 flex flex-col gap-4 ${className}`}>
      {title && (
        <div className="flex items-center gap-4">
          <span className="text-label opacity-60 transition-opacity group-hover:opacity-100">
            {title}
          </span>
          <div className="h-px flex-1 bg-line opacity-10" />
        </div>
      )}
      
      <div className="relative overflow-hidden rounded-[0.15rem] border border-line bg-surface/10 p-2 transition-colors duration-base ease-fluid group-hover:bg-surface/20">
        <CodeSnippet 
          code={code} 
          language={language} 
          className="!border-none !bg-transparent !p-10 text-[0.88rem] leading-relaxed"
        />
      </div>
    </div>
  );
}
