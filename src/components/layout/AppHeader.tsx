"use client";

import { FolderGit2, Settings, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { WorkspaceMode } from "@/types";

interface AppHeaderProps {
  workspaceName: string;
  workspaceMode: WorkspaceMode;
  onToggleSidebar: () => void;
  onShareClick: () => void;
  onSettingsClick: () => void;
  sidebarCollapsed: boolean;
}

export function AppHeader({
  workspaceName,
  workspaceMode,
  onToggleSidebar,
  onShareClick,
  onSettingsClick,
  sidebarCollapsed,
}: AppHeaderProps) {
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

  const getModeIcon = (mode: WorkspaceMode) => {
    switch (mode) {
      case "solo":
        return <FolderGit2 className="h-4 w-4" aria-hidden="true" />;
      case "collaborative":
        return (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      default:
        return <FolderGit2 className="h-4 w-4" aria-hidden="true" />;
    }
  };

  return (
    <header className="flex items-center justify-between h-10 px-3 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60 dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="h-8 w-8 p-0 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          ) : (
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          )}
        </Button>
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center gap-1.5 text-zinc-100 truncate">
            <span className="font-mono text-xs font-medium">CodeSync</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
            <span className="truncate max-w-[150px] font-medium">{workspaceName}</span>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-800 text-[10px] font-medium uppercase tracking-wider">
              {getModeIcon(workspaceMode)}
              {getModeLabel(workspaceMode)}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1.5 ml-auto">
        <Button
          variant="ghost"
          size="sm"
          onClick={onShareClick}
          aria-label="Share and collaborate"
          className="h-8 gap-1.5 px-2.5 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
        >
          <Share2 className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Share & Collaborate</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onSettingsClick}
          aria-label="Settings"
          className="h-8 w-8 p-0 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
        >
          <Settings className="h-5 w-5" aria-hidden="true" />
        </Button>
      </div>
    </header>
  );
}