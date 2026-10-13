"use client";

export function EditorPlaceholder() {
  return (
    <main className="flex-1 flex flex-col overflow-hidden" role="main" aria-label="Editor workspace">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-3xl text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-zinc-800 text-zinc-400 mb-6">
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 18 2 12 8 6" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-zinc-100 mb-3">Editor Not Initialized</h1>
            <p className="text-zinc-400 text-lg">
              The Monaco Editor workspace will be implemented in Phase 2.
            </p>
          </div>
          <div className="rounded-lg bg-zinc-900 border border-zinc-800 overflow-hidden text-left">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-zinc-800 bg-zinc-950">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/60" aria-hidden="true" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/60" aria-hidden="true" />
                <span className="w-3 h-3 rounded-full bg-green-500/60" aria-hidden="true" />
              </div>
              <span className="ml-4 text-xs text-zinc-500 font-mono">preview.tsx</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm font-mono text-zinc-300 leading-relaxed"><code>{`// CodeSync - Phase 1 Preview
// This is a static code preview.
// The interactive Monaco Editor will be
// integrated in Phase 2.

interface Workspace {
  mode: "solo" | "collaborative";
  name: string;
  files: File[];
}

const workspace: Workspace = {
  mode: "solo",
  name: "Local Workspace",
  files: [],
};

function initializeEditor() {
  console.log("Initializing CodeSync editor...");
  // Monaco Editor setup will go here
  // - Language detection
  // - IntelliSense
  // - Debugging support
}

initializeEditor();`}
</code></pre>
          </div>
          <p className="mt-6 text-sm text-zinc-500">
            Your development environment is ready. Start coding when the editor loads.
          </p>
        </div>
      </div>
    </main>
  );
}