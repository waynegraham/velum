"use client";

import { useState } from "react";
import { Highlight, themes, type Language } from "prism-react-renderer";

interface CodeSnippetProps {
  code: string;
  language?: Language | string;
  className?: string;
}

export function CodeSnippet({
  code,
  language = "tsx",
  className = "code-block",
}: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="group relative">
      <Highlight
        theme={themes.github}
        code={code.trim()}
        language={language as Language}
      >
        {({ className: blockClassName, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} ${blockClassName}`} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>

      <button
        type="button"
        onClick={handleCopy}
        className="copy-button"
        aria-label="Copy code snippet"
      >
        {copied ? (
          <>
            <svg
              className="h-3 w-3 text-accent-strong"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="copy-buttonAccent">Copied!</span>
          </>
        ) : (
          <>
            <svg
              className="h-3 w-3 text-muted"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  );
}
