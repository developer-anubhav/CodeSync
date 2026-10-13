"use client";

import { useRef, useEffect, useCallback } from "react";
import { X, FileCode, FileText } from "lucide-react";
import type { EditorTab } from "@/features/workspace/types";
import type { LanguageOption } from "@/lib/editor-languages";

interface EditorTabsProps {
  tabs: EditorTab[];
  activeTabId: string | null;
  onTabSelect: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
  onTabAdd: () => void;
}

function getFileIcon(language: LanguageOption): React.ReactNode {
  const icons: Record<string, React.ReactNode> = {
    typescript: <FileCode className="h-3.5 w-3.5 text-blue-400" />,
    javascript: <FileCode className="h-3.5 w-3.5 text-yellow-400" />,
    python: <FileCode className="h-3.5 w-3.5 text-green-400" />,
    java: <FileCode className="h-3.5 w-3.5 text-red-400" />,
    c: <FileCode className="h-3.5 w-3.5 text-cyan-400" />,
    cpp: <FileCode className="h-3.5 w-3.5 text-pink-400" />,
    csharp: <FileCode className="h-3.5 w-3.5 text-purple-400" />,
    go: <FileCode className="h-3.5 w-3.5 text-cyan-400" />,
    rust: <FileCode className="h-3.5 w-3.5 text-orange-400" />,
    html: <FileCode className="h-3.5 w-3.5 text-orange-400" />,
    css: <FileCode className="h-3.5 w-3.5 text-sky-400" />,
    json: <FileCode className="h-3.5 w-3.5 text-amber-400" />,
    markdown: <FileText className="h-3.5 w-3.5 text-gray-400" />,
    sql: <FileCode className="h-3.5 w-3.5 text-indigo-400" />,
    php: <FileCode className="h-3.5 w-3.5 text-violet-400" />,
    xml: <FileCode className="h-3.5 w-3.5 text-red-400" />,
    yaml: <FileCode className="h-3.5 w-3.5 text-teal-400" />,
    shell: <FileCode className="h-3.5 w-3.5 text-green-400" />,
  };
  return icons[language.monacoLanguageId] ?? <FileCode className="h-3.5 w-3.5 text-zinc-400" />;
}

export function EditorTabs({
  tabs,
  activeTabId,
  onTabSelect,
  onTabClose,
  onTabAdd,
}: EditorTabsProps) {
  const tabsRef = useRef<HTMLDivElement>(null);

  const scrollToActiveTab = useCallback(() => {
    if (tabsRef.current && activeTabId) {
      const activeTab = tabsRef.current.querySelector(`[data-tab-id="${activeTabId}"]`);
      if (activeTab) {
        activeTab.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, [activeTabId]);

  useEffect(() => {
    scrollToActiveTab();
  }, [scrollToActiveTab, tabs.length]);

  const handleKeyDown = (event: React.KeyboardEvent, tabId: string, index: number) => {
    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        onTabSelect(tabId);
        break;
      case "ArrowLeft":
        event.preventDefault();
        const prevTab = tabs[index - 1] ?? tabs[tabs.length - 1];
        onTabSelect(prevTab.id);
        break;
      case "ArrowRight":
        event.preventDefault();
        const nextTab = tabs[index + 1] ?? tabs[0];
        onTabSelect(nextTab.id);
        break;
      case "Delete":
      case "Backspace":
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault();
          onTabClose(tabId);
        }
        break;
      default:
        break;
    }
  };

  if (tabs.length === 0) {
    return (
      <div
        className="flex items-center h-8 px-2 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60"
        role="tablist"
        aria-label="Editor tabs"
      >
        <button
          type="button"
          onClick={onTabAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-l transition-colors"
          aria-label="Open file"
        >
          <span className="text-xs">+</span>
          <span>Open File</span>
        </button>
        <div className="flex-1" />
      </div>
    );
  }

  return (
    <div
      className="flex items-center h-8 px-2 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60 overflow-x-auto"
      role="tablist"
      aria-label="Editor tabs"
      ref={tabsRef}
    >
      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          role="tab"
          aria-selected={activeTabId === tab.id}
          aria-controls={`${tab.id}-panel`}
          id={`${tab.id}-tab`}
          data-tab-id={tab.id}
          onClick={() => onTabSelect(tab.id)}
          onKeyDown={(e) => handleKeyDown(e, tab.id, index)}
          tabIndex={0}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors whitespace-nowrap relative cursor-pointer ${
            activeTabId === tab.id
              ? "text-zinc-100 bg-zinc-900 border-b-2 border-blue-500"
              : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
          }`}
        >
          {getFileIcon(tab.language)}
          <span className="truncate max-w-[150px]">{tab.name}</span>
          {tab.isDirty && (
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" aria-label="Unsaved changes" />
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onTabClose(tab.id);
            }}
            className={`ml-1.5 p-0.5 rounded transition-colors ${
              activeTabId === tab.id
                ? "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
                : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
            }`}
            aria-label={`Close ${tab.name}`}
            tabIndex={-1}
          >
            <X className="h-3 w-3" aria-hidden="true" />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={onTabAdd}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-r transition-colors flex-shrink-0"
        aria-label="Open new file"
      >
        <span className="text-xs">+</span>
        <span className="hidden sm:inline">New File</span>
      </button>

      <div className="flex-1 min-w-0" />
    </div>
  );
}