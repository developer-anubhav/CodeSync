"use client";

import { FolderOpen, File, Search, GitBranch, Plug2, Menu } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const navigationItems = [
  { id: "explorer", label: "Explorer", icon: FolderOpen, shortcut: "⌘B" },
  { id: "search", label: "Search", icon: Search, shortcut: "⌘⇧F" },
  { id: "source-control", label: "Source Control", icon: GitBranch, shortcut: "⌃⇧G" },
  { id: "extensions", label: "Extensions", icon: Plug2, shortcut: "⌘⇧X" },
] as const;

export function Sidebar({ isCollapsed, onToggleCollapse }: SidebarProps) {
  if (isCollapsed) {
    return (
      <aside
        className="fixed top-10 bottom-0 left-0 z-40 w-12 border-r border-zinc-800 bg-zinc-950 transition-width duration-150 dark:border-zinc-800"
        aria-label="Sidebar (collapsed)"
      >
        <nav className="flex h-full flex-col items-center p-1.5" aria-label="Primary navigation">
          <Button
            variant="ghost"
            size="sm"
            className="w-8 h-8 p-0 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
            onClick={onToggleCollapse}
            aria-label="Expand sidebar"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </Button>
          <div className="flex-1 flex flex-col items-center gap-1 mt-4" role="tablist" aria-label="Views">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                className="w-8 h-8 p-0 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
                role="tab"
                aria-selected={false}
                aria-label={item.label}
              >
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </Button>
            ))}
          </div>
        </nav>
      </aside>
    );
  }

  return (
    <aside
      className="fixed top-10 bottom-0 left-0 z-40 w-64 border-r border-zinc-800 bg-zinc-950 transition-width duration-150 dark:border-zinc-800 flex flex-col"
      aria-label="Sidebar"
    >
      <nav className="flex flex-col h-full overflow-hidden" aria-label="Primary navigation">
        <div className="flex items-center justify-between h-10 px-2 border-b border-zinc-800">
          <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider truncate">
            Navigation
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
            onClick={onToggleCollapse}
            aria-label="Collapse sidebar"
          >
            <Menu className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-1.5 space-y-1" role="tablist" aria-label="Views">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-3 px-2 py-1.5 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800"
              role="tab"
              aria-selected={item.id === "explorer"}
              aria-label={`${item.label} ${item.shortcut}`}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
              <span className="truncate font-medium">{item.label}</span>
              <span className="ml-auto text-[10px] text-zinc-500 font-mono">{item.shortcut}</span>
            </Button>
          ))}
        </div>
        <div className="p-2 border-t border-zinc-800">
          <div className="rounded-lg bg-zinc-900/50 p-3 text-center">
            <File className="h-8 w-8 mx-auto text-zinc-600 mb-2" aria-hidden="true" />
            <p className="text-xs text-zinc-500 mb-1">No folder opened</p>
            <p className="text-[10px] text-zinc-600">
              File explorer will be available in Phase 2
            </p>
          </div>
        </div>
      </nav>
    </aside>
  );
}