"use client";

import { type WorkspaceMode } from "@/types";

interface StatusBarProps {
  workspaceMode: WorkspaceMode;
  language?: string;
  line?: number;
  column?: number;
}

export function StatusBar({ workspaceMode, language, line, column }: StatusBarProps) {
  const getModeLabel = (mode: WorkspaceMode) => {
    switch (mode) {
      case "solo":
        return "Local Workspace";
      case "collaborative":
        return "Collaborative";
      default:
        return "Local Workspace";
    }
  };

  return (
    <footer className="flex items-center justify-between h-6 px-2 border-t border-zinc-800 bg-zinc-950/80 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60 dark:border-zinc-800 dark:bg-zinc-950/80" role="status" aria-label="Workspace status">
      <div className="flex items-center gap-3 text-[11px] text-zinc-400">
        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-900 font-medium text-zinc-300">
          {getModeLabel(workspaceMode)}
        </span>
        <span className="px-2 py-0.5 rounded bg-zinc-900 font-mono text-zinc-500">
          {language ?? "Not selected"}
        </span>
      </div>
      <div className="flex items-center gap-4 text-[11px] text-zinc-500 font-mono">
        {line !== undefined && column !== undefined && (
          <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-900 hover:bg-zinc-800 cursor-pointer text-zinc-300 transition-colors" title="Line and column (not connected to editor)">
            Ln {line}, Col {column}
          </span>
        )}
        {line === undefined && column === undefined && (
          <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-500">
            Ln —, Col —
          </span>
        )}
        <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-500">Spaces: 2</span>
        <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-500">UTF-8</span>
        <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-500">LF</span>
      </div>
    </footer>
  );
}