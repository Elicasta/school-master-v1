"use client";

import ReactMarkdown from "react-markdown";

export function ChatBubble({ role, content }: { role: "user" | "opponent" | "coach"; content: string }) {
  const isUser = role === "user";
  return (
    <div
      className={`text-sm p-3 rounded-xl max-w-[85%] ${
        isUser ? "bg-ink text-paper ml-auto" : "bg-paper-dim text-ink"
      }`}
    >
      <ReactMarkdown
        components={{
          p: ({ children }) => <p className="mb-2 last:mb-0 leading-snug">{children}</p>,
          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
          li: ({ children }) => <li>{children}</li>,
          h1: ({ children }) => <p className="font-display text-base mb-1">{children}</p>,
          h2: ({ children }) => <p className="font-display text-base mb-1">{children}</p>,
          h3: ({ children }) => <p className="font-semibold mb-1">{children}</p>,
          code: ({ children }) => <code className="font-mono text-xs bg-white/50 px-1 rounded">{children}</code>,
          a: ({ children, href }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
              {children}
            </a>
          ),
          hr: () => <hr className="border-line my-2" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
