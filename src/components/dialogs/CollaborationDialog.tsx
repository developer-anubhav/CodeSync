"use client";

import { Users, Lock, Info, AlertTriangle } from "lucide-react";
import { Dialog } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";

interface CollaborationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CollaborationDialog({ isOpen, onClose }: CollaborationDialogProps) {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Share & Collaborate"
      description="Invite teammates to collaborate in real time"
      size="md"
    >
      <div className="space-y-6">
        <div className="flex items-start gap-3 p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-900/30 flex items-center justify-center">
            <Info className="h-5 w-5 text-blue-400" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-zinc-100 mb-1">Coming in Phase 2</h3>
            <p className="text-sm text-zinc-400">
              Real-time collaboration features are not yet implemented. This dialog
              demonstrates the entry point for sharing your workspace with teammates.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-zinc-300">Planned Features</h4>
          <ul className="space-y-3" role="list">
            <li className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
              <Users className="h-5 w-5 flex-shrink-0 text-zinc-500 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-zinc-100">Private Coding Rooms</p>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Create secure rooms with unique access keys for team collaboration
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
              <Lock className="h-5 w-5 flex-shrink-0 text-zinc-500 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-zinc-100">Access Control</p>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Room Access Keys ensure only authorized teammates can join
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
              <AlertTriangle className="h-5 w-5 flex-shrink-0 text-zinc-500 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-zinc-100">Real-time Sync</p>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Yjs-powered conflict-free editing with live cursors and selections
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="pt-4 border-t border-zinc-800 flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" size="sm" onClick={onClose} disabled>
            Create Room (Phase 2)
          </Button>
        </div>
      </div>
    </Dialog>
  );
}