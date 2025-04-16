import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "monaco-editor": "monaco-editor/esm/vs/editor/editor.api.js",
    },
  },
})
