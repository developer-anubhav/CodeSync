"use client";

import { useState } from "react";
import { Palette, Code, FolderOpen } from "lucide-react";
import { Dialog } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

type SettingsTab = "appearance" | "editor" | "workspace";

const tabs: { id: SettingsTab; label: string; icon: typeof Palette }[] = [
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "editor", label: "Editor", icon: Code },
  { id: "workspace", label: "Workspace", icon: FolderOpen },
];

export function SettingsDialog({ isOpen, onClose }: SettingsDialogProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>("appearance");

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Settings"
      description="Configure your CodeSync workspace preferences"
      size="lg"
    >
      <div className="flex h-[500px] flex-col">
        <div className="flex border-b border-zinc-800" role="tablist" aria-label="Settings categories">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`${tab.id}-panel`}
              id={`${tab.id}-tab`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
              }`}
            >
              <tab.icon className="h-4 w-4" aria-hidden="true" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4" role="tabpanel" aria-labelledby={`${activeTab}-tab`} id={`${activeTab}-panel`}>
          {activeTab === "appearance" && <AppearanceSettings />}
          {activeTab === "editor" && <EditorSettings />}
          {activeTab === "workspace" && <WorkspaceSettings />}
        </div>

        <div className="border-t border-zinc-800 p-4 flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={onClose} disabled>
            Save (Not Implemented)
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

function AppearanceSettings() {
  return (
    <div className="space-y-6 max-w-md">
      <section>
        <h4 className="text-sm font-medium text-zinc-300 mb-4">Theme</h4>
        <div className="grid grid-cols-2 gap-3">
          {["Dark", "Light", "System"].map((theme) => (
            <button
              key={theme}
              className={`p-4 rounded-lg border-2 text-center transition-colors ${
                theme === "Dark"
                  ? "border-blue-500 bg-blue-900/20"
                  : "border-zinc-800 hover:border-zinc-700"
              }`}
              disabled
            >
              <div className="font-medium text-zinc-100">{theme}</div>
              <div className="text-xs text-zinc-500 mt-1">
                {theme === "Dark" ? "Active" : "Not implemented"}
              </div>
            </button>
          ))}
        </div>
        <p className="text-xs text-zinc-500">Theme persistence coming in Phase 2</p>
      </section>

      <section>
        <h4 className="text-sm font-medium text-zinc-300 mb-4">Color Accent</h4>
        <div className="flex items-center gap-3 flex-wrap">
          {["Blue", "Green", "Purple", "Orange", "Red"].map((color) => (
            <button
              key={color}
              className={`w-8 h-8 rounded-lg border-2 transition-transform ${
                color === "Blue"
                  ? "border-blue-500 bg-blue-500 scale-110"
                  : "border-zinc-700 hover:border-zinc-600"
              }`}
              disabled
              style={{ backgroundColor: getColorValue(color) }}
            />
          ))}
        </div>
        <p className="text-xs text-zinc-500">Accent color selection coming in Phase 2</p>
      </section>

      <section>
        <h4 className="text-sm font-medium text-zinc-300 mb-4">Font Size</h4>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="11"
            max="18"
            value={14}
            className="flex-1 accent-blue-500"
            disabled
          />
          <span className="text-sm font-mono text-zinc-300 w-10 text-right">14px</span>
        </div>
        <p className="text-xs text-zinc-500">Font size control coming in Phase 2</p>
      </section>
    </div>
  );
}

function EditorSettings() {
  return (
    <div className="space-y-6 max-w-md">
      <section>
        <h4 className="text-sm font-medium text-zinc-300 mb-4">Tab Size</h4>
        <select className="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm" disabled>
          <option value="2">2 spaces (default)</option>
          <option value="4">4 spaces</option>
          <option value="tab">Tabs</option>
        </select>
        <p className="text-xs text-zinc-500 mt-1">Tab size configuration coming in Phase 2</p>
      </section>

      <section>
        <h4 className="text-sm font-medium text-zinc-300 mb-4">Editor Preferences</h4>
        <div className="space-y-3">
          {[
            "Minimap",
            "Line Numbers",
            "Word Wrap",
            "Bracket Pair Colorization",
            "Format on Save",
            "Auto Save",
          ].map((setting) => (
            <label key={setting} className="flex items-center justify-between">
              <span className="text-sm text-zinc-300">{setting}</span>
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-blue-500 focus:ring-blue-500 accent-blue-500"
                disabled
                defaultChecked={["Line Numbers", "Bracket Pair Colorization"].includes(setting)}
              />
            </label>
          ))}
        </div>
        <p className="text-xs text-zinc-500">Editor preferences coming in Phase 2</p>
      </section>

      <section>
        <h4 className="text-sm font-medium text-zinc-300 mb-4">Font Family</h4>
        <select className="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm" disabled>
          <option value="geist">Geist Mono (default)</option>
          <option value="jetbrains">JetBrains Mono</option>
          <option value="fira">Fira Code</option>
          <option value="cascadia">Cascadia Code</option>
        </select>
        <p className="text-xs text-zinc-500 mt-1">Font family selection coming in Phase 2</p>
      </section>
    </div>
  );
}

function WorkspaceSettings() {
  return (
    <div className="space-y-6 max-w-md">
      <section>
        <h4 className="text-sm font-medium text-zinc-300 mb-4">Workspace Name</h4>
        <input
          type="text"
          value="Local Workspace"
          className="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm"
          disabled
        />
        <p className="text-xs text-zinc-500 mt-1">Workspace naming coming in Phase 2</p>
      </section>

      <section>
        <h4 className="text-sm font-medium text-zinc-300 mb-4">Default Language</h4>
        <select className="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm" disabled>
          <option value="typescript">TypeScript</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="rust">Rust</option>
          <option value="go">Go</option>
        </select>
        <p className="text-xs text-zinc-500 mt-1">Language preference coming in Phase 2</p>
      </section>

      <section>
        <h4 className="text-sm font-medium text-zinc-300 mb-4">Auto-Save</h4>
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="autosave"
              className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-blue-500 focus:ring-blue-500"
              disabled
              defaultChecked
            />
            <span className="text-sm text-zinc-300">Off (manual save only)</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="autosave"
              className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-blue-500 focus:ring-blue-500"
              disabled
            />
            <span className="text-sm text-zinc-300">After delay (1s)</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="autosave"
              className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-blue-500 focus:ring-blue-500"
              disabled
            />
            <span className="text-sm text-zinc-300">On focus change</span>
          </label>
        </div>
        <p className="text-xs text-zinc-500">Auto-save configuration coming in Phase 2</p>
      </section>

      <section className="border-t border-zinc-800 pt-6">
        <h4 className="text-sm font-medium text-zinc-300 mb-4">Danger Zone</h4>
        <Button variant="danger" size="sm" className="w-full" disabled>
          Reset All Settings
        </Button>
        <p className="text-xs text-zinc-500 mt-1 text-center">Reset functionality coming in Phase 2</p>
      </section>
    </div>
  );
}

function getColorValue(color: string): string {
  const colors: Record<string, string> = {
    Blue: "#3b82f6",
    Green: "#22c55e",
    Purple: "#a855f7",
    Orange: "#f97316",
    Red: "#ef4444",
  };
  return colors[color] ?? "#3b82f6";
}