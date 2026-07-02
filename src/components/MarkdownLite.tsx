"use client";

import { Fragment, ReactNode } from "react";

/**
 * Renders the small subset of markdown AI debate responses actually use: #/##/###
 * headers, **bold**, *italic*, "-"/"*" bullet lists, and "***"/"---" dividers, with
 * paragraph breaks preserved. Without this, people see literal "###" and "***"
 * characters in the chat, which is what was still leaking through before headers
 * and dividers were handled. Line-based, not a full markdown parser on purpose,
 * code blocks/links/tables aren't needed for a debate transcript.
 */
export function MarkdownLite({ text }: { text: string }) {
  const lines = text.split("\n");
  const nodes: ReactNode[] = [];
  let paragraphBuf: string[] = [];
  let listBuf: string[] = [];

  function flushParagraph(key: string) {
    if (paragraphBuf.length === 0) return;
    nodes.push(
      <p key={key} className="mt-2 first:mt-0">
        {paragraphBuf.map((line, j) => (
          <Fragment key={j}>
            {j > 0 && <br />}
            {renderInline(line)}
          </Fragment>
        ))}
      </p>,
    );
    paragraphBuf = [];
  }

  function flushList(key: string) {
    if (listBuf.length === 0) return;
    nodes.push(
      <ul key={key} className="list-disc pl-4 space-y-1 mt-2 first:mt-0">
        {listBuf.map((line, j) => (
          <li key={j}>{renderInline(line)}</li>
        ))}
      </ul>,
    );
    listBuf = [];
  }

  lines.forEach((rawLine, i) => {
    const line = rawLine.trim();
    const key = `b${i}`;

    if (line === "") {
      flushParagraph(key);
      flushList(key);
      return;
    }

    if (/^(\*\*\*+|---+|___+)$/.test(line)) {
      flushParagraph(key);
      flushList(key);
      nodes.push(<hr key={key} className="my-3 border-line" />);
      return;
    }

    const headerMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headerMatch) {
      flushParagraph(key);
      flushList(key);
      const level = headerMatch[1].length;
      nodes.push(
        <p key={key} className={`font-display mt-3 first:mt-0 ${level <= 2 ? "text-base" : "text-sm"}`}>
          {renderInline(headerMatch[2])}
        </p>,
      );
      return;
    }

    const listMatch = line.match(/^[-*]\s+(.*)$/);
    if (listMatch) {
      flushParagraph(key);
      listBuf.push(listMatch[1]);
      return;
    }

    flushList(key);
    paragraphBuf.push(line);
  });

  flushParagraph("last-p");
  flushList("last-l");

  return <>{nodes}</>;
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
