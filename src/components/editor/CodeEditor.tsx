"use client";

import { useEffect, useRef, useCallback, useMemo } from "react";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import type { editor } from "monaco-editor";
import type { LanguageOption } from "@/lib/editor-languages";
import type { EditorConfig } from "@/lib/editor-config";
import { createMonacoEditorOptions, applyConfigToEditor } from "@/lib/editor-config";

interface CodeEditorProps {
  value: string;
  language: LanguageOption;
  theme: "vs-dark" | "vs" | "hc-black";
  onChange: (value: string) => void;
  onCursorPositionChange?: (position: { lineNumber: number; column: number } | null) => void;
  config?: Partial<EditorConfig>;
  wordWrap?: boolean;
  minimapEnabled?: boolean;
  fontSize?: number;
  tabSize?: number;
  readOnly?: boolean;
  className?: string;
}

export function CodeEditor({
  value,
  language,
  theme,
  onChange,
  onCursorPositionChange,
  config,
  wordWrap,
  minimapEnabled,
  fontSize,
  tabSize,
  readOnly = false,
  className = "",
}: CodeEditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const isInitializedRef = useRef(false);
  const lastValueRef = useRef(value);

  const editorOptions = useMemo(
    () =>
      createMonacoEditorOptions({
        ...config,
        wordWrap: wordWrap ? "on" : "off",
        minimap: { enabled: minimapEnabled ?? true },
        fontSize: fontSize ?? 14,
        tabSize: tabSize ?? 2,
      }),
    [config, wordWrap, minimapEnabled, fontSize, tabSize]
  );

  const handleEditorDidMount = useCallback((editorInstance: editor.IStandaloneCodeEditor) => {
    editorRef.current = editorInstance;
    isInitializedRef.current = true;

    editorInstance.onDidChangeModelContent(() => {
      const newValue = editorInstance.getValue();
      if (newValue !== lastValueRef.current) {
        lastValueRef.current = newValue;
        onChange(newValue);
      }
    });

    editorInstance.onDidChangeCursorPosition((e) => {
      if (onCursorPositionChange) {
        onCursorPositionChange({
          lineNumber: e.position.lineNumber,
          column: e.position.column,
        });
      }
    });

    const model = editorInstance.getModel();
    if (model) {
      monaco.languages.setLanguageConfiguration(language.monacoLanguageId, {
        brackets: [
          ["{", "}"],
          ["[", "]"],
          ["(", ")"],
          ["<", ">"],
        ],
        autoClosingPairs: [
          { open: "{", close: "}" },
          { open: "[", close: "]" },
          { open: "(", close: ")" },
          { open: "<", close: ">" },
          { open: '"', close: '"' },
          { open: "'", close: "'" },
          { open: "`", close: "`" },
        ],
        surroundingPairs: [
          { open: "{", close: "}" },
          { open: "[", close: "]" },
          { open: "(", close: ")" },
          { open: "<", close: ">" },
          { open: '"', close: '"' },
          { open: "'", close: "'" },
          { open: "`", close: "`" },
        ],
        folding: {
          markers: {
            start: new RegExp("^\\s*//\\s*#?region\\b"),
            end: new RegExp("^\\s*//\\s*#?endregion\\b"),
          },
        },
      });
    }
  }, [language.monacoLanguageId, onChange, onCursorPositionChange]);

  const handleEditorWillUnmount = useCallback(() => {
    editorRef.current = null;
    isInitializedRef.current = false;
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.updateOptions({ theme, readOnly });
    }
  }, [theme, readOnly]);

  useEffect(() => {
    if (editorRef.current && lastValueRef.current !== value) {
      const { current: editorInstance } = editorRef;
      const cursorPosition = editorInstance.getPosition();

      editorInstance.setValue(value);
      lastValueRef.current = value;

      if (cursorPosition) {
        editorInstance.setPosition(cursorPosition);
      }
    }
  }, [value]);

  useEffect(() => {
    if (editorRef.current) {
      applyConfigToEditor(editorRef.current, {
        wordWrap: wordWrap ? "on" : "off",
        minimap: { enabled: minimapEnabled ?? true },
        fontSize: fontSize ?? 14,
        tabSize: tabSize ?? 2,
      });
    }
  }, [wordWrap, minimapEnabled, fontSize, tabSize]);

  useEffect(() => {
    if (editorRef.current) {
      const model = editorRef.current.getModel();
      if (model && model.getLanguageId() !== language.monacoLanguageId) {
        const { current: editorInstance } = editorRef;
        const cursorPosition = editorInstance.getPosition();
        const scrollTop = editorInstance.getScrollTop();
        const scrollLeft = editorInstance.getScrollLeft();

        monaco.editor.setModelLanguage(model, language.monacoLanguageId);

        editorInstance.setPosition(cursorPosition!);
        editorInstance.setScrollTop(scrollTop);
        editorInstance.setScrollLeft(scrollLeft);
      }
    }
  }, [language.monacoLanguageId]);

  return (
    <div className={`h-full w-full ${className}`}>
      <Editor
        height="100%"
        width="100%"
        defaultLanguage={language.monacoLanguageId}
        defaultValue={value}
        options={editorOptions}
        onMount={handleEditorDidMount}
        beforeMount={handleEditorWillUnmount}
      />
    </div>
  );
}