import { editor } from "monaco-editor"

export const settings: editor.IStandaloneEditorConstructionOptions = {
  minimap: { enabled: false },
  fontLigatures: true,
  fontFamily: "'Fira Code', Monaco, monospace",
}

export enum MonarchType {
  keyword,
  literal,
  operator,
  delimiter,
  comment,
  variable,
}
