import type { LanguageOption } from "@/lib/editor-languages";

export interface SampleFile {
  id: string;
  name: string;
  language: LanguageOption;
  content: string;
}

export const SAMPLE_FILES: readonly SampleFile[] = [
  {
    id: "main.ts",
    name: "main.ts",
    language: {
      id: "typescript",
      label: "TypeScript",
      monacoLanguageId: "typescript",
      extensions: [".ts", ".tsx", ".d.ts"],
      mimetypes: ["text/typescript", "application/typescript"],
    },
    content: `// CodeSync - TypeScript Example
// This file demonstrates TypeScript syntax highlighting in Monaco Editor.

interface User {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  roles: string[];
  createdAt: Date;
}

interface Project {
  id: string;
  name: string;
  description: string;
  owner: User;
  collaborators: User[];
  createdAt: Date;
  updatedAt: Date;
}

type ProjectStatus = "planning" | "active" | "on-hold" | "completed" | "archived";

class ProjectManager {
  private projects: Map<string, Project> = new Map();
  private currentUser: User | null = null;

  constructor(private readonly apiBaseUrl: string) {}

  async initialize(user: User): Promise<void> {
    this.currentUser = user;
    await this.loadProjects();
  }

  private async loadProjects(): Promise<void> {
    try {
      const response = await fetch(\`\${this.apiBaseUrl}/projects\`);
      if (!response.ok) {
        throw new Error(\`Failed to load projects: \${response.statusText}\`);
      }
      const projects = await response.json();
      projects.forEach((project: Project) => {
        this.projects.set(project.id, project);
      });
    } catch (error) {
      console.error("Error loading projects:", error);
      throw error;
    }
  }

  createProject(name: string, description: string): Project {
    if (!this.currentUser) {
      throw new Error("User not initialized");
    }

    const project: Project = {
      id: crypto.randomUUID(),
      name,
      description,
      owner: this.currentUser,
      collaborators: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.projects.set(project.id, project);
    return project;
  }

  getProject(id: string): Project | undefined {
    return this.projects.get(id);
  }

  getAllProjects(): Project[] {
    return Array.from(this.projects.values());
  }

  updateProject(id: string, updates: Partial<Pick<Project, "name" | "description">>): Project | undefined {
    const project = this.projects.get(id);
    if (!project) return undefined;

    const updatedProject = {
      ...project,
      ...updates,
      updatedAt: new Date(),
    };

    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  deleteProject(id: string): boolean {
    return this.projects.delete(id);
  }
}

// Utility functions
function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(email);
}

// Export for use in other modules
export { ProjectManager, type User, type Project, type ProjectStatus, formatDate, validateEmail };
`,
  },
  {
    id: "utils.ts",
    name: "utils.ts",
    language: {
      id: "typescript",
      label: "TypeScript",
      monacoLanguageId: "typescript",
      extensions: [".ts", ".tsx", ".d.ts"],
      mimetypes: ["text/typescript", "application/typescript"],
    },
    content: `// CodeSync - Utility Functions
// Common utility functions used across the application.

/**
 * Deep clones an object using structured clone algorithm.
 * Supports most built-in types including Date, RegExp, Map, Set, etc.
 */
export function deepClone<T>(obj: T): T {
  return structuredClone(obj);
}

/**
 * Debounces a function call.
 * @param fn - The function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  };
}

/**
 * Throttles a function call.
 * @param fn - The function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Generates a random UUID v4.
 */
export function generateId(): string {
  return crypto.randomUUID();
}

/**
 * Checks if a value is null or undefined.
 */
export function isNil<T>(value: T | null | undefined): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * Checks if a value is a plain object.
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

/**
 * Omits specified keys from an object.
 */
export function omit<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  keys.forEach((key) => delete result[key]);
  return result;
}

/**
 * Picks specified keys from an object.
 */
export function pick<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
}

/**
 * Groups array elements by a key function.
 */
export function groupBy<T, K extends string | number | symbol>(
  array: T[],
  keyFn: (item: T) => K
): Record<K, T[]> {
  return array.reduce((groups, item) => {
    const key = keyFn(item);
    (groups[key] = groups[key] || []).push(item);
    return groups;
  }, {} as Record<K, T[]>);
}

/**
 * Sorts array by a key function.
 */
export function sortBy<T>(
  array: T[],
  keyFn: (item: T) => string | number,
  direction: "asc" | "desc" = "asc"
): T[] {
  const multiplier = direction === "asc" ? 1 : -1;
  return [...array].sort((a, b) => {
    const aVal = keyFn(a);
    const bVal = keyFn(b);
    return aVal < bVal ? -multiplier : aVal > bVal ? multiplier : 0;
  });
}

/**
 * Creates a promise that resolves after a specified delay.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retries an async function with exponential backoff.
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts = 3,
  baseDelay = 1000
): Promise<T> {
  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (attempt < maxAttempts) {
        const delay = baseDelay * Math.pow(2, attempt - 1);
        await sleep(delay);
      }
    }
  }

  throw lastError;
}
`,
  },
  {
    id: "README.md",
    name: "README.md",
    language: {
      id: "markdown",
      label: "Markdown",
      monacoLanguageId: "markdown",
      extensions: [".md", ".markdown", ".mdown", ".mkd"],
      mimetypes: ["text/markdown", "text/x-markdown"],
    },
    content: `# CodeSync

A collaborative code editor for teams.

## Overview

CodeSync is a web-based code editor that allows developers to write code independently and eventually collaborate with teammates through private rooms.

## Features

- **Monaco Editor Integration** - Full-featured code editing experience
- **Multi-language Support** - TypeScript, JavaScript, Python, Java, C/C++, C#, Go, Rust, and more
- **Theme Support** - Dark and light themes
- **Editor Customization** - Configurable font size, tab size, word wrapping, minimap
- **File Tabs** - Switch between multiple open files

## Getting Started

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

3. Open http://localhost:3000 in your browser.

## Project Structure

\`\`\`
apps/web/
├── src/
│   ├── components/
│   │   ├── editor/
│   │   │   ├── CodeEditor.tsx       # Main Monaco Editor component
│   │   │   ├── EditorToolbar.tsx    # Language, theme, settings controls
│   │   │   ├── EditorTabs.tsx       # File tab bar
│   │   │   └── EditorStatusBar.tsx  # Line/column, language status
│   │   ├── layout/
│   │   │   ├── AppShell.tsx         # Main application layout
│   │   │   ├── AppHeader.tsx        # Top header bar
│   │   │   ├── Sidebar.tsx          # Left sidebar
│   │   │   └── StatusBar.tsx        # Bottom status bar
│   │   └── ui/
│   │       ├── Button.tsx
│   │       └── Dialog.tsx
│   ├── features/
│   │   └── workspace/
│   │       ├── sample-files.ts      # Initial example files
│   │       └── types.ts             # Workspace type definitions
│   ├── lib/
│   │   ├── editor-config.ts         # Monaco editor configuration
│   │   └── editor-languages.ts      # Supported languages
│   └── app/
│       ├── layout.tsx
│       ├── page.tsx
│       └── globals.css
└── package.json
\`\`\`

## Supported Languages

- TypeScript (.ts, .tsx)
- JavaScript (.js, .jsx)
- Python (.py)
- Java (.java)
- C (.c, .h)
- C++ (.cpp, .hpp)
- C# (.cs)
- Go (.go)
- Rust (.rs)
- HTML (.html)
- CSS (.css)
- JSON (.json)
- Markdown (.md)
- SQL (.sql)
- PHP (.php)
- XML (.xml)
- YAML (.yaml, .yml)
- Shell Script (.sh)

## Editor Configuration

Default settings:
- Font size: 14px
- Tab size: 2 spaces
- Line numbers: On
- Minimap: Enabled
- Word wrap: Off
- Bracket matching: Always
- Smooth scrolling: Enabled
- Code folding: Enabled

## Roadmap

- **Phase 1** ✅ - Frontend foundation (App shell, header, sidebar, status bar)
- **Phase 2** 🚧 - Monaco Editor integration (current)
- **Phase 3** 📋 - Workspace persistence & file management
- **Phase 4** 📋 - Real-time collaboration with Yjs

## License

MIT
`,
  },
] as const;

export function getSampleFileById(id: string): SampleFile | undefined {
  return SAMPLE_FILES.find((file) => file.id === id);
}

export const DEFAULT_ACTIVE_FILE_ID = "main.ts";