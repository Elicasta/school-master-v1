"use client";

import { Fragment, ReactNode } from "react";

/**
 * Renders a small, safe subset of markdown: **bold**, *italic*, and "- "/"* " bullet
 * lists, with paragraph breaks preserved. AI responses (Gemini and Chrome's local
 * model) come back with this formatting; without rendering it, people see raw
 * asterisks in the chat, which looks broken. Intentionally not a full markdown
 * parser, headers/links/code blocks aren't needed for a debate chat transcript.
 */
export function MarkdownLite({ text }: { text: string }) {
  const blocks = text.split(/\n{2,}/);

  return (
    <>
      {blocks.map((block, i) => {
        const lines = block.split("\n").filter((l) => l.trim().length > 0);
        const isList = lines.length > 0 && lines.every((l) => /^\s*[-*]\s+/.test(l));

        if (isList) {
          return (
            <ul key={i} className="list-disc pl-4 space-y-1 my-1">
              {lines.map((line, j) => (
                <li key={j}>{renderInline(line.replace(/^\s*[-*]\s+/, ""))}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={i} className={i > 0 ? "mt-2" : ""}>
            {lines.map((line, j) => (
              <Fragment key={j}>
                {j > 0 && <br />}
                {renderInline(line)}
              </Fragment>
            ))}
          </p>
        );
      })}
    </>
  );
}

function renderInline(text: string): ReactNode[] {
  // Bold first (**...**), then italic (*...*) on what's left. Order matters,
  // parsing italic first would break on the asterisk pairs bold uses.
  const nodes: ReactNode[] = [];
  const boldSplit = text.split(/(\*\*[^*]+\*\*)/g);

  boldSplit.forEach((part, i) => {
    const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
    if (boldMatch) {
      nodes.push(<strong key={i}>{boldMatch[1]}</strong>);
      return;
    }
    const italicSplit = part.split(/(\*[^*]+\*)/g);
    italicSplit.forEach((sub, j) => {
      const italicMatch = sub.match(/^\*([^*]+)\*$/);
      if (italicMatch) {
        nodes.push(<em key={`${i}-${j}`}>{italicMatch[1]}</em>);
      } else if (sub) {
        nodes.push(<Fragment key={`${i}-${j}`}>{sub}</Fragment>);
      }
    });
  });

  return nodes;
}
