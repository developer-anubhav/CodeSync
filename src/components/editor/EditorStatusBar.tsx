"use client";

import { useMemo } from "react";
import type { LanguageOption } from "@/lib/editor-languages";

interface EditorStatusBarProps {
  language: LanguageOption;
  cursorPosition: { lineNumber: number; column: number } | null;
  indentation: { tabSize: number; insertSpaces: boolean };
  wordWrap: boolean;
  encoding?: string;
  eol?: "LF" | "CRLF";
}

export function EditorStatusBar({
  language,
  cursorPosition,
  indentation,
  wordWrap,
  encoding = "UTF-8",
  eol = "LF",
}: EditorStatusBarProps) {
  const lineColumnText = useMemo(() => {
    if (cursorPosition) {
      return `Ln ${cursorPosition.lineNumber}, Col ${cursorPosition.column}`;
    }
    return "Ln —, Col —";
  }, [cursorPosition]);

  const indentationText = useMemo(() => {
    return indentation.insertSpaces ? `Spaces: ${indentation.tabSize}` : `Tabs: ${indentation.tabSize}`;
  }, [indentation.tabSize, indentation.insertSpaces]);

  const wordWrapText = useMemo(() => {
    return wordWrap ? "Wrap" : "No Wrap";
  }, [wordWrap]);

  return (
    <footer
      className="flex items-center justify-between h-6 px-2 border-t border-zinc-800 bg-zinc-950/80 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60 dark:border-zinc-800 dark:bg-zinc-950/80"
      role="status"
      aria-label="Editor status"
    >
      <div className="flex items-center gap-3 text-[11px] text-zinc-400">
        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-900 font-medium text-zinc-300">
          {language.label}
        </span>
      </div>
      <div className="flex items-center gap-4 text-[11px] text-zinc-500 font-mono">
        <span
          className="flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-900 hover:bg-zinc-800 cursor-pointer text-zinc-300 transition-colors"
          title="Line and column"
        >
          {lineColumnText}
        </span>
        <span
          className="flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-900 hover:bg-zinc-800 cursor-pointer text-zinc-300 transition-colors"
          title="Indentation"
        >
          {indentationText}
        </span>
        <span
          className="flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-900 hover:bg-zinc-800 cursor-pointer text-zinc-300 transition-colors"
          title="Word wrap"
        >
          {wordWrapText}
        </span>
        <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-500">{encoding}</span>
        <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-500">{eol}</span>
      </div>
    </footer>
  );
}