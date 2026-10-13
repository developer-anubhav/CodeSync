import type { editor } from "monaco-editor";

export interface EditorConfig {
  fontSize: number;
  lineNumbers: "on" | "off" | "relative" | "interval";
  minimap: { enabled: boolean };
  wordWrap: "off" | "on" | "wordWrapColumn" | "bounded";
  automaticIndentation: boolean;
  bracketMatching: "always" | "near" | "never";
  smoothScrolling: boolean;
  folding: boolean;
  scrollBeyondLastLine: boolean;
  cursorBlinking: "blink" | "smooth" | "phase" | "expand" | "solid";
  cursorSmoothCaretAnimation: "on" | "off";
  selectOnLineNumbers: boolean;
  renderLineHighlight: "all" | "line" | "gutter" | "none";
  renderWhitespace: "none" | "boundary" | "selection" | "trailing" | "all";
  tabSize: number;
  insertSpaces: boolean;
  detectIndentation: boolean;
  formatOnPaste: boolean;
  formatOnType: boolean;
  suggestOnTriggerCharacters: boolean;
  quickSuggestions: boolean | editor.IQuickSuggestionsOptions;
  parameterHints: editor.IEditorParameterHintOptions;
  hover: editor.IEditorHoverOptions;
  codeLens: boolean;
  foldingStrategy: "auto" | "indentation";
  showFoldingControls: "always" | "mouseover";
  matchBrackets: "always" | "near" | "never";
  renderControlCharacters: boolean;
  renderFinalNewline: "on" | "off" | "dimmed";
  unicodeHighlight: {
    ambiguousCharacters: boolean;
    invisibleCharacters: boolean;
    nonBasicASCII: boolean;
  };
  accessibilitySupport: "auto" | "on" | "off";
}

export const DEFAULT_EDITOR_CONFIG: EditorConfig = {
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
};

export function applyConfigToEditor(
  monacoEditor: editor.IStandaloneCodeEditor,
  config: Partial<EditorConfig>
): void {
  const newOptions: editor.IStandaloneEditorConstructionOptions = {};

  if (config.fontSize !== undefined) newOptions.fontSize = config.fontSize;
  if (config.lineNumbers !== undefined) newOptions.lineNumbers = config.lineNumbers;
  if (config.minimap !== undefined) newOptions.minimap = config.minimap;
  if (config.wordWrap !== undefined) newOptions.wordWrap = config.wordWrap;
  if (config.automaticIndentation !== undefined)
    newOptions.autoIndent = config.automaticIndentation ? "full" : "none";
  if (config.bracketMatching !== undefined) newOptions.matchBrackets = config.bracketMatching;
  if (config.smoothScrolling !== undefined) newOptions.smoothScrolling = config.smoothScrolling;
  if (config.folding !== undefined) newOptions.folding = config.folding;
  if (config.scrollBeyondLastLine !== undefined)
    newOptions.scrollBeyondLastLine = config.scrollBeyondLastLine;
  if (config.cursorBlinking !== undefined) newOptions.cursorBlinking = config.cursorBlinking;
  if (config.cursorSmoothCaretAnimation !== undefined)
    newOptions.cursorSmoothCaretAnimation = config.cursorSmoothCaretAnimation;
  if (config.selectOnLineNumbers !== undefined)
    newOptions.selectOnLineNumbers = config.selectOnLineNumbers;
  if (config.renderLineHighlight !== undefined)
    newOptions.renderLineHighlight = config.renderLineHighlight;
  if (config.renderWhitespace !== undefined)
    newOptions.renderWhitespace = config.renderWhitespace;
  if (config.tabSize !== undefined) newOptions.tabSize = config.tabSize;
  if (config.insertSpaces !== undefined) newOptions.insertSpaces = config.insertSpaces;
  if (config.detectIndentation !== undefined) newOptions.detectIndentation = config.detectIndentation;
  if (config.formatOnPaste !== undefined) newOptions.formatOnPaste = config.formatOnPaste;
  if (config.formatOnType !== undefined) newOptions.formatOnType = config.formatOnType;
  if (config.suggestOnTriggerCharacters !== undefined)
    newOptions.suggestOnTriggerCharacters = config.suggestOnTriggerCharacters;
  if (config.quickSuggestions !== undefined) newOptions.quickSuggestions = config.quickSuggestions;
  if (config.parameterHints !== undefined) newOptions.parameterHints = config.parameterHints;
  if (config.hover !== undefined) newOptions.hover = config.hover;
  if (config.codeLens !== undefined) newOptions.codeLens = config.codeLens;
  if (config.foldingStrategy !== undefined) newOptions.foldingStrategy = config.foldingStrategy;
  if (config.showFoldingControls !== undefined)
    newOptions.showFoldingControls = config.showFoldingControls;
  if (config.renderControlCharacters !== undefined)
    newOptions.renderControlCharacters = config.renderControlCharacters;
  if (config.renderFinalNewline !== undefined)
    newOptions.renderFinalNewline = config.renderFinalNewline;
  if (config.unicodeHighlight !== undefined)
    newOptions.unicodeHighlight = config.unicodeHighlight;
  if (config.accessibilitySupport !== undefined)
    newOptions.accessibilitySupport = config.accessibilitySupport;

  monacoEditor.updateOptions(newOptions);
}

export function createMonacoEditorOptions(
  config: Partial<EditorConfig> = {}
): editor.IStandaloneEditorConstructionOptions {
  const mergedConfig = { ...DEFAULT_EDITOR_CONFIG, ...config };

  return {
    fontSize: mergedConfig.fontSize,
    lineNumbers: mergedConfig.lineNumbers,
    minimap: mergedConfig.minimap,
    wordWrap: mergedConfig.wordWrap,
    automaticLayout: true,
    autoIndent: mergedConfig.automaticIndentation ? "full" : "none",
    matchBrackets: mergedConfig.bracketMatching,
    smoothScrolling: mergedConfig.smoothScrolling,
    folding: mergedConfig.folding,
    scrollBeyondLastLine: mergedConfig.scrollBeyondLastLine,
    cursorBlinking: mergedConfig.cursorBlinking,
    cursorSmoothCaretAnimation: mergedConfig.cursorSmoothCaretAnimation,
    selectOnLineNumbers: mergedConfig.selectOnLineNumbers,
    renderLineHighlight: mergedConfig.renderLineHighlight,
    renderWhitespace: mergedConfig.renderWhitespace,
    tabSize: mergedConfig.tabSize,
    insertSpaces: mergedConfig.insertSpaces,
    detectIndentation: mergedConfig.detectIndentation,
    formatOnPaste: mergedConfig.formatOnPaste,
    formatOnType: mergedConfig.formatOnType,
    suggestOnTriggerCharacters: mergedConfig.suggestOnTriggerCharacters,
    quickSuggestions: mergedConfig.quickSuggestions,
    parameterHints: mergedConfig.parameterHints,
    hover: mergedConfig.hover,
    codeLens: mergedConfig.codeLens,
    foldingStrategy: mergedConfig.foldingStrategy,
    showFoldingControls: mergedConfig.showFoldingControls,
    renderControlCharacters: mergedConfig.renderControlCharacters,
    renderFinalNewline: mergedConfig.renderFinalNewline,
    unicodeHighlight: mergedConfig.unicodeHighlight,
    accessibilitySupport: mergedConfig.accessibilitySupport,
    theme: "vs-dark",
  };
}