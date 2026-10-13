"use client";

import { useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { Sidebar } from "@/components/layout/Sidebar";
import { StatusBar } from "@/components/layout/StatusBar";
import { EditorPlaceholder } from "@/components/layout/EditorPlaceholder";
import { CollaborationDialog } from "@/components/dialogs/CollaborationDialog";
import { SettingsDialog } from "@/components/dialogs/SettingsDialog";
import type { WorkspaceState } from "@/types";

export function AppShell() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showCollaborationDialog, setShowCollaborationDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [workspace] = useState<WorkspaceState>({
    mode: "solo",
    name: "Local Workspace",
  });

  const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);
  const openCollaborationDialog = () => setShowCollaborationDialog(true);
  const closeCollaborationDialog = () => setShowCollaborationDialog(false);
  const openSettingsDialog = () => setShowSettingsDialog(true);
  const closeSettingsDialog = () => setShowSettingsDialog(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-950 text-zinc-100">
      <Sidebar isCollapsed={sidebarCollapsed} onToggleCollapse={toggleSidebar} />
      <div
        className={`flex-1 flex flex-col transition-all duration-150 ${
          sidebarCollapsed ? "ml-12" : "ml-64"
        }`}
      >
        <AppHeader
          workspaceName={workspace.name}
          workspaceMode={workspace.mode}
          onToggleSidebar={toggleSidebar}
          onShareClick={openCollaborationDialog}
          onSettingsClick={openSettingsDialog}
          sidebarCollapsed={sidebarCollapsed}
        />
        <EditorPlaceholder />
        <StatusBar workspaceMode={workspace.mode} />
      </div>
      <CollaborationDialog isOpen={showCollaborationDialog} onClose={closeCollaborationDialog} />
      <SettingsDialog isOpen={showSettingsDialog} onClose={closeSettingsDialog} />
    </div>
  );
}