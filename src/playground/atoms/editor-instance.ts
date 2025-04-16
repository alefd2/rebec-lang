import { atom } from 'recoil';
import { editor } from 'monaco-editor';

export const editorInstanceState = atom<editor.IStandaloneCodeEditor | null>({
  key: 'editorInstanceState',
  dangerouslyAllowMutability: true,
  default: null,
});
