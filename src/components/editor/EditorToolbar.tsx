"use client";

import { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  Sun,
  Moon,
  WrapText,
  Minimize2,
  Maximize2,
  Settings,
  FileCode,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { LanguageOption } from "@/lib/editor-languages";
import { SUPPORTED_LANGUAGES } from "@/lib/editor-languages";

interface EditorToolbarProps {
  language: LanguageOption;
  onLanguageChange: (language: LanguageOption) => void;
  theme: "vs-dark" | "vs" | "hc-black";
  onThemeChange: (theme: "vs-dark" | "vs" | "hc-black") => void;
  wordWrap: boolean;
  onWordWrapChange: (enabled: boolean) => void;
  minimapEnabled: boolean;
  onMinimapChange: (enabled: boolean) => void;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  tabSize: number;
  onTabSizeChange: (size: number) => void;
}

const FONT_SIZES = [11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24];
const TAB_SIZES = [1, 2, 3, 4, 8];

function getLanguageIcon(languageId: string) {
  const icons: Record<string, string> = {
    typescript: "TS",
    javascript: "JS",
    python: "PY",
    java: "JAVA",
    c: "C",
    cpp: "C++",
    csharp: "C#",
    go: "GO",
    rust: "RS",
    html: "HTML",
    css: "CSS",
    json: "JSON",
    markdown: "MD",
    sql: "SQL",
    php: "PHP",
    xml: "XML",
    yaml: "YAML",
    shell: "SH",
  };
  return icons[languageId] ?? languageId.slice(0, 3).toUpperCase();
}

export function EditorToolbar({
  language,
  onLanguageChange,
  theme,
  onThemeChange,
  wordWrap,
  onWordWrapChange,
  minimapEnabled,
  onMinimapChange,
  fontSize,
  onFontSizeChange,
  tabSize,
  onTabSizeChange,
}: EditorToolbarProps) {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const languageRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageSelect = (lang: LanguageOption) => {
    onLanguageChange(lang);
    setIsLanguageOpen(false);
  };

  const handleThemeToggle = () => {
    onThemeChange(theme === "vs-dark" ? "vs" : "vs-dark");
  };

  return (
    <div className="flex items-center gap-1.5 h-8 px-2 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60">
      <div className="flex items-center gap-1 border-r border-zinc-800 pr-2" ref={languageRef}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsLanguageOpen(!isLanguageOpen)}
          aria-label="Select language"
          aria-expanded={isLanguageOpen}
          aria-haspopup="listbox"
          className="h-7 px-2 py-1 gap-1.5 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800"
        >
          <FileCode className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
          <span className="text-xs font-medium truncate max-w-[100px]">{language.label}</span>
          <ChevronDown className={`h-3.5 w-3.5 flex-shrink-0 transition-transform ${isLanguageOpen ? "rotate-180" : ""}`} aria-hidden="true" />
        </Button>

        {isLanguageOpen && (
          <div
            className="absolute top-full right-0 mt-1 z-50 min-w-[180px] max-h-60 overflow-y-auto rounded-lg bg-zinc-900 border border-zinc-800 shadow-lg py-1"
            role="listbox"
            aria-label="Programming languages"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.id}
                role="option"
                aria-selected={lang.id === language.id}
                onClick={() => handleLanguageSelect(lang)}
                className={`w-full flex items-center gap-2 px-2 py-1.5 text-sm text-left transition-colors ${
                  lang.id === language.id
                    ? "bg-zinc-800 text-zinc-100"
                    : "text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
                }`}
              >
                <span className="w-6 text-center text-[10px] font-mono font-medium text-zinc-500">
                  {getLanguageIcon(lang.monacoLanguageId)}
                </span>
                <span className="truncate">{lang.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 border-r border-zinc-800 px-2" role="group" aria-label="Theme">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleThemeToggle}
          aria-label={theme === "vs-dark" ? "Switch to light theme" : "Switch to dark theme"}
          className="h-7 w-7 p-0 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
        >
          {theme === "vs-dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex items-center gap-1 border-r border-zinc-800 px-2" role="group" aria-label="Editor settings">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onWordWrapChange(!wordWrap)}
          aria-label={wordWrap ? "Disable word wrap" : "Enable word wrap"}
          aria-pressed={wordWrap}
          className={`h-7 w-7 p-0 transition-colors ${
            wordWrap
              ? "text-blue-400 bg-blue-900/20"
              : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
          }`}
          title={wordWrap ? "Word wrap: on" : "Word wrap: off"}
        >
          <WrapText className="h-4 w-4" aria-hidden="true" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onMinimapChange(!minimapEnabled)}
          aria-label={minimapEnabled ? "Hide minimap" : "Show minimap"}
          aria-pressed={minimapEnabled}
          className={`h-7 w-7 p-0 transition-colors ${
            minimapEnabled
              ? "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
              : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
          }`}
          title={minimapEnabled ? "Minimap: on" : "Minimap: off"}
        >
          {minimapEnabled ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex items-center gap-1 ml-auto" ref={settingsRef}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          aria-label="Editor settings"
          aria-expanded={isSettingsOpen}
          aria-haspopup="menu"
          className="h-7 w-7 p-0 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
        >
          <Settings className="h-4 w-4" aria-hidden="true" />
        </Button>

        {isSettingsOpen && (
          <div
            className="absolute top-full right-0 mt-1 z-50 min-w-[200px] rounded-lg bg-zinc-900 border border-zinc-800 shadow-lg py-1"
            role="menu"
            aria-label="Editor settings"
          >
            <div className="px-2 py-1.5 border-b border-zinc-800">
              <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Font Size</span>
            </div>
            <div className="py-1">
              {FONT_SIZES.map((size) => (
                <button
                  key={size}
                  role="menuitemradio"
                  aria-checked={fontSize === size}
                  onClick={() => onFontSizeChange(size)}
                  className={`w-full flex items-center justify-between px-2 py-1.5 text-sm transition-colors ${
                    fontSize === size
                      ? "bg-zinc-800 text-zinc-100"
                      : "text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
                  }`}
                >
                  <span>{size}px</span>
                  {fontSize === size && <span className="text-blue-400">✓</span>}
                </button>
              ))}
            </div>

            <div className="px-2 py-1.5 border-b border-zinc-800">
              <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Tab Size</span>
            </div>
            <div className="py-1">
              {TAB_SIZES.map((size) => (
                <button
                  key={size}
                  role="menuitemradio"
                  aria-checked={tabSize === size}
                  onClick={() => onTabSizeChange(size)}
                  className={`w-full flex items-center justify-between px-2 py-1.5 text-sm transition-colors ${
                    tabSize === size
                      ? "bg-zinc-800 text-zinc-100"
                      : "text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
                  }`}
                >
                  <span>{size === 1 ? "Tab" : `${size} spaces`}</span>
                  {tabSize === size && <span className="text-blue-400">✓</span>}
                </button>
              ))}
            </div>

            <div className="px-2 py-1.5 border-b border-zinc-800">
              <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Word Wrap</span>
            </div>
            <div className="py-1">
              <button
                role="menuitemcheckbox"
                aria-checked={wordWrap}
                onClick={() => onWordWrapChange(!wordWrap)}
                className="w-full flex items-center justify-between px-2 py-1.5 text-sm transition-colors text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
              >
                <span>Enable word wrap</span>
                {wordWrap && <span className="text-blue-400">✓</span>}
              </button>
            </div>

            <div className="px-2 py-1.5">
              <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Minimap</span>
            </div>
            <div className="py-1">
              <button
                role="menuitemcheckbox"
                aria-checked={minimapEnabled}
                onClick={() => onMinimapChange(!minimapEnabled)}
                className="w-full flex items-center justify-between px-2 py-1.5 text-sm transition-colors text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
              >
                <span>Show minimap</span>
                {minimapEnabled && <span className="text-blue-400">✓</span>}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}