import { atom } from 'recoil';
import * as MonacoInstance from 'monaco-editor/esm/vs/editor/editor.api';

export const monacoInstanceState = atom<typeof MonacoInstance | null>({
  key: 'monacoInstanceState',
  dangerouslyAllowMutability: true,
  default: null,
});
