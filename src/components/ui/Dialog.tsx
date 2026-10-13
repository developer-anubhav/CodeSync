"use client";

import { Fragment, ReactNode, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Dialog({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = "md",
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      dialogRef.current?.focus();
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose();
        }
        if (event.key === "Tab") {
          const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (!focusableElements || focusableElements.length === 0) return;
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];
          if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
        previousActiveElement.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeStyles = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <Fragment>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${sizeStyles[size]}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby={description ? "dialog-description" : undefined}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl dark:bg-zinc-950 dark:border-zinc-800">
          <div className="flex items-start justify-between p-4 border-b border-zinc-800 dark:border-zinc-800">
            <div>
              <h2 id="dialog-title" className="text-lg font-semibold text-zinc-100">
                {title}
              </h2>
              {description && (
                <p id="dialog-description" className="mt-1 text-sm text-zinc-400">
                  {description}
                </p>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              aria-label="Close dialog"
              className="text-zinc-400 hover:text-zinc-100"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
          <div className="p-4">{children}</div>
        </div>
      </div>
    </Fragment>
  );
}