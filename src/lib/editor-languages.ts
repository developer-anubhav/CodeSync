export interface LanguageOption {
  id: string;
  label: string;
  monacoLanguageId: string;
  extensions: string[];
  mimetypes?: string[];
}

export const SUPPORTED_LANGUAGES: readonly LanguageOption[] = [
  {
    id: "typescript",
    label: "TypeScript",
    monacoLanguageId: "typescript",
    extensions: [".ts", ".tsx", ".d.ts"],
    mimetypes: ["text/typescript", "application/typescript"],
  },
  {
    id: "javascript",
    label: "JavaScript",
    monacoLanguageId: "javascript",
    extensions: [".js", ".jsx", ".mjs", ".cjs"],
    mimetypes: ["text/javascript", "application/javascript"],
  },
  {
    id: "python",
    label: "Python",
    monacoLanguageId: "python",
    extensions: [".py", ".pyw", ".pyi"],
    mimetypes: ["text/x-python", "application/x-python"],
  },
  {
    id: "java",
    label: "Java",
    monacoLanguageId: "java",
    extensions: [".java"],
    mimetypes: ["text/x-java-source", "text/java"],
  },
  {
    id: "c",
    label: "C",
    monacoLanguageId: "c",
    extensions: [".c", ".h"],
    mimetypes: ["text/x-c", "text/x-c-header"],
  },
  {
    id: "cpp",
    label: "C++",
    monacoLanguageId: "cpp",
    extensions: [".cpp", ".cc", ".cxx", ".hpp", ".hxx", ".hh"],
    mimetypes: ["text/x-c++src", "text/x-c++hdr"],
  },
  {
    id: "csharp",
    label: "C#",
    monacoLanguageId: "csharp",
    extensions: [".cs"],
    mimetypes: ["text/x-csharp"],
  },
  {
    id: "go",
    label: "Go",
    monacoLanguageId: "go",
    extensions: [".go"],
    mimetypes: ["text/x-go"],
  },
  {
    id: "rust",
    label: "Rust",
    monacoLanguageId: "rust",
    extensions: [".rs"],
    mimetypes: ["text/rust"],
  },
  {
    id: "html",
    label: "HTML",
    monacoLanguageId: "html",
    extensions: [".html", ".htm", ".xhtml"],
    mimetypes: ["text/html", "application/xhtml+xml"],
  },
  {
    id: "css",
    label: "CSS",
    monacoLanguageId: "css",
    extensions: [".css"],
    mimetypes: ["text/css"],
  },
  {
    id: "json",
    label: "JSON",
    monacoLanguageId: "json",
    extensions: [".json", ".jsonc"],
    mimetypes: ["application/json", "application/jsonc"],
  },
  {
    id: "markdown",
    label: "Markdown",
    monacoLanguageId: "markdown",
    extensions: [".md", ".markdown", ".mdown", ".mkd"],
    mimetypes: ["text/markdown", "text/x-markdown"],
  },
  {
    id: "sql",
    label: "SQL",
    monacoLanguageId: "sql",
    extensions: [".sql"],
    mimetypes: ["text/x-sql", "application/sql"],
  },
  {
    id: "php",
    label: "PHP",
    monacoLanguageId: "php",
    extensions: [".php", ".phtml", ".php3", ".php4", ".php5", ".php7", ".phps"],
    mimetypes: ["text/x-php", "application/x-httpd-php"],
  },
  {
    id: "xml",
    label: "XML",
    monacoLanguageId: "xml",
    extensions: [".xml", ".xsd", ".xsl", ".xslt", ".svg"],
    mimetypes: ["text/xml", "application/xml", "application/xhtml+xml"],
  },
  {
    id: "yaml",
    label: "YAML",
    monacoLanguageId: "yaml",
    extensions: [".yaml", ".yml"],
    mimetypes: ["text/yaml", "application/x-yaml"],
  },
  {
    id: "shell",
    label: "Shell Script",
    monacoLanguageId: "shell",
    extensions: [".sh", ".bash", ".zsh", ".fish"],
    mimetypes: ["application/x-sh", "text/x-sh"],
  },
] as const;

export type SupportedLanguageId = (typeof SUPPORTED_LANGUAGES)[number]["id"];

export function getLanguageById(id: SupportedLanguageId): LanguageOption | undefined {
  return SUPPORTED_LANGUAGES.find((lang) => lang.id === id);
}

export function getLanguageByExtension(extension: string): LanguageOption | undefined {
  const normalizedExt = extension.startsWith(".") ? extension : `.${extension}`;
  return SUPPORTED_LANGUAGES.find((lang) =>
    lang.extensions.some((ext) => ext.toLowerCase() === normalizedExt.toLowerCase())
  );
}

export function getLanguageByMonacoId(monacoLanguageId: string): LanguageOption | undefined {
  return SUPPORTED_LANGUAGES.find((lang) => lang.monacoLanguageId === monacoLanguageId);
}

export const DEFAULT_LANGUAGE: LanguageOption = SUPPORTED_LANGUAGES[0];