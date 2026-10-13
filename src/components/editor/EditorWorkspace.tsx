"use client";

import { useState, useCallback, useMemo } from "react";
import { CodeEditor } from "./CodeEditorWrapper";
import { EditorToolbar } from "./EditorToolbar";
import { EditorTabs } from "./EditorTabs";
import { EditorStatusBar } from "./EditorStatusBar";
import { SAMPLE_FILES, DEFAULT_ACTIVE_FILE_ID, getSampleFileById } from "@/features/workspace/sample-files";
import type { EditorTab, EditorState } from "@/features/workspace/types";
import { DEFAULT_EDITOR_STATE } from "@/features/workspace/types";
import type { LanguageOption } from "@/lib/editor-languages";
import { DEFAULT_LANGUAGE } from "@/lib/editor-languages";

export function EditorWorkspace() {
  const [editorState, setEditorState] = useState<EditorState>(() => {
    const initialTabs: EditorTab[] = SAMPLE_FILES.map((file) => ({
      id: file.id,
      name: file.name,
      language: file.language,
      content: file.content,
      isDirty: false,
    }));

    const activeFile = getSampleFileById(DEFAULT_ACTIVE_FILE_ID) ?? SAMPLE_FILES[0];

    return {
      ...DEFAULT_EDITOR_STATE,
      tabs: initialTabs,
      activeTabId: activeFile.id,
      language: activeFile.language,
    };
  });

  const activeTab = useMemo(() => {
    if (!editorState.activeTabId) return null;
    return editorState.tabs.find((tab) => tab.id === editorState.activeTabId) ?? null;
  }, [editorState.tabs, editorState.activeTabId]);

  const activeTabContent = activeTab?.content ?? "";
  const activeTabLanguage = activeTab?.language ?? DEFAULT_LANGUAGE;

  const handleContentChange = useCallback((newContent: string) => {
    setEditorState((prev) => {
      if (!prev.activeTabId) return prev;
      return {
        ...prev,
        tabs: prev.tabs.map((tab) =>
          tab.id === prev.activeTabId ? { ...tab, content: newContent, isDirty: true } : tab
        ),
      };
    });
  }, []);

  const handleCursorPositionChange = useCallback(
    (position: { lineNumber: number; column: number } | null) => {
      setEditorState((prev) => ({ ...prev, cursorPosition: position }));
    },
    []
  );

  const handleLanguageChange = useCallback((language: LanguageOption) => {
    setEditorState((prev) => {
      if (!prev.activeTabId) return prev;
      return {
        ...prev,
        language,
        tabs: prev.tabs.map((tab) =>
          tab.id === prev.activeTabId ? { ...tab, language } : tab
        ),
      };
    });
  }, []);

  const handleThemeChange = useCallback((theme: "vs-dark" | "vs" | "hc-black") => {
    setEditorState((prev) => ({ ...prev, theme }));
  }, []);

  const handleWordWrapChange = useCallback((enabled: boolean) => {
    setEditorState((prev) => ({ ...prev, wordWrap: enabled }));
  }, []);

  const handleMinimapChange = useCallback((enabled: boolean) => {
    setEditorState((prev) => ({ ...prev, minimapEnabled: enabled }));
  }, []);

  const handleFontSizeChange = useCallback((size: number) => {
    setEditorState((prev) => ({ ...prev, config: { ...prev.config, fontSize: size } }));
  }, []);

  const handleTabSizeChange = useCallback((size: number) => {
    setEditorState((prev) => ({ ...prev, config: { ...prev.config, tabSize: size } }));
  }, []);

  const handleTabSelect = useCallback((tabId: string) => {
    const tab = editorState.tabs.find((t) => t.id === tabId);
    setEditorState((prev) => ({
      ...prev,
      activeTabId: tabId,
      language: tab?.language ?? prev.language,
    }));
  }, [editorState.tabs]);

  const handleTabClose = useCallback((tabId: string) => {
    setEditorState((prev) => {
      const newTabs = prev.tabs.filter((tab) => tab.id !== tabId);
      let newActiveTabId = prev.activeTabId;

      if (prev.activeTabId === tabId) {
        const closedIndex = prev.tabs.findIndex((tab) => tab.id === tabId);
        newActiveTabId = newTabs[closedIndex]?.id ?? newTabs[closedIndex - 1]?.id ?? null;
      }

      return {
        ...prev,
        tabs: newTabs,
        activeTabId: newActiveTabId,
      };
    });
  }, []);

  const handleTabAdd = useCallback(() => {
    const newTab: EditorTab = {
      id: `untitled-${Date.now()}`,
      name: "untitled.txt",
      language: DEFAULT_LANGUAGE,
      content: "",
      isDirty: true,
    };

    setEditorState((prev) => ({
      ...prev,
      tabs: [...prev.tabs, newTab],
      activeTabId: newTab.id,
      language: DEFAULT_LANGUAGE,
    }));
  }, []);

  return (
    <main className="flex-1 flex flex-col overflow-hidden" role="main" aria-label="Editor workspace">
      <EditorTabs
        tabs={editorState.tabs}
        activeTabId={editorState.activeTabId}
        onTabSelect={handleTabSelect}
        onTabClose={handleTabClose}
        onTabAdd={handleTabAdd}
      />
      <EditorToolbar
        language={activeTabLanguage}
        onLanguageChange={handleLanguageChange}
        theme={editorState.theme}
        onThemeChange={handleThemeChange}
        wordWrap={editorState.wordWrap}
        onWordWrapChange={handleWordWrapChange}
        minimapEnabled={editorState.minimapEnabled}
        onMinimapChange={handleMinimapChange}
        fontSize={editorState.config.fontSize}
        onFontSizeChange={handleFontSizeChange}
        tabSize={editorState.config.tabSize}
        onTabSizeChange={handleTabSizeChange}
      />
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <CodeEditor
          value={activeTabContent}
          language={activeTabLanguage}
          theme={editorState.theme}
          onChange={handleContentChange}
          onCursorPositionChange={handleCursorPositionChange}
          config={editorState.config}
          wordWrap={editorState.wordWrap}
          minimapEnabled={editorState.minimapEnabled}
          fontSize={editorState.config.fontSize}
          tabSize={editorState.config.tabSize}
          className="flex-1"
        />
      </div>
      <EditorStatusBar
        language={activeTabLanguage}
        cursorPosition={editorState.cursorPosition}
        indentation={{ tabSize: editorState.config.tabSize, insertSpaces: editorState.config.insertSpaces }}
        wordWrap={editorState.wordWrap}
      />
    </main>
  );
}