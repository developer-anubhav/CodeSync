export type WorkspaceMode = "solo" | "collaborative";

export interface WorkspaceState {
  mode: WorkspaceMode;
  name: string;
}

export const DEFAULT_WORKSPACE: WorkspaceState = {
  mode: "solo",
  name: "Local Workspace",
};