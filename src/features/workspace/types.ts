import type { LanguageOption } from "@/lib/editor-languages";
import type { EditorConfig } from "@/lib/editor-config";

export interface EditorTab {
  id: string;
  name: string;
  language: LanguageOption;
  content: string;
  isDirty: boolean;
}

export interface CursorPosition {
  lineNumber: number;
  column: number;
}

export interface EditorState {
  tabs: EditorTab[];
  activeTabId: string | null;
  language: LanguageOption;
  theme: "vs-dark" | "vs" | "hc-black";
  config: EditorConfig;
  wordWrap: boolean;
  minimapEnabled: boolean;
  cursorPosition: CursorPosition | null;
}

export const DEFAULT_EDITOR_STATE: EditorState = {
  tabs: [],
  activeTabId: null,
  language: {
    id: "typescript",
    label: "TypeScript",
    monacoLanguageId: "typescript",
    extensions: [".ts", ".tsx", ".d.ts"],
    mimetypes: ["text/typescript", "application/typescript"],
  },
  theme: "vs-dark",
  config: {
    fontSize: 14,
    lineNumbers: "on",
    minimap: { enabled: true },
    wordWrap: "off",
    automaticIndentation: true,
    bracketMatching: "always",
    smoothScrolling: true,
    folding: true,
    scrollBeyondLastLine: false,
    cursorBlinking: "smooth",
    cursorSmoothCaretAnimation: "on",
    selectOnLineNumbers: true,
    renderLineHighlight: "all",
    renderWhitespace: "selection",
    tabSize: 2,
    insertSpaces: true,
    detectIndentation: true,
    formatOnPaste: true,
    formatOnType: true,
    suggestOnTriggerCharacters: true,
    quickSuggestions: true,
    parameterHints: { enabled: true },
    hover: { enabled: "on" },
    codeLens: true,
    foldingStrategy: "auto",
    showFoldingControls: "always",
    matchBrackets: "always",
    renderControlCharacters: false,
    renderFinalNewline: "on",
    unicodeHighlight: {
      ambiguousCharacters: true,
      invisibleCharacters: true,
      nonBasicASCII: true,
    },
    accessibilitySupport: "auto",
  },
  wordWrap: false,
  minimapEnabled: true,
  cursorPosition: null,
};