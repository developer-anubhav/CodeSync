"use client";

import dynamic from "next/dynamic";

export const CodeEditor = dynamic(
  () => import("./CodeEditor").then((mod) => mod.CodeEditor),
  {
    ssr: false,
    loading: () => (
      <div className="flex-1 flex items-center justify-center bg-zinc-950">
        <div className="text-zinc-500">Loading editor...</div>
      </div>
    ),
  }
);