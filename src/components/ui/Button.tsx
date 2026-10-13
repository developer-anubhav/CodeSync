"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "secondary",
      size = "md",
      isLoading = false,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 font-medium rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:opacity-50 disabled:cursor-not-allowed";

    const variantStyles = {
      primary: "bg-zinc-900 text-zinc-50 hover:bg-zinc-700 focus-visible:ring-zinc-700 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-300",
      secondary: "bg-zinc-800 text-zinc-100 hover:bg-zinc-700 focus-visible:ring-zinc-700 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-300",
      ghost: "text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 focus-visible:ring-zinc-700 dark:text-zinc-600 dark:hover:bg-zinc-200 dark:hover:text-zinc-950",
      danger: "bg-red-900/30 text-red-300 hover:bg-red-900/50 focus-visible:ring-red-900 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40",
    };

    const sizeStyles = {
      sm: "px-2.5 py-1 text-xs gap-1.5",
      md: "px-3 py-1.5 text-sm gap-2",
      lg: "px-4 py-2 text-base gap-2",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";