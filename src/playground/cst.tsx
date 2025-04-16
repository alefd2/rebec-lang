import { Editor } from '@monaco-editor/react';
import { settings } from '../utils/monaco-settings';
import { useLocalStorage } from '@uidotdev/usehooks';
import { useMemo } from 'react';
import { parse } from '../utils/parse';

export const Cst = () => {
  const [code] = useLocalStorage('code', '');

  const cstObj = useMemo(() => {
    return JSON.stringify(parse(code).cst, null, 2);
  }, [code]);

  return (
    <Editor
      theme="aura-dark"
      defaultValue={cstObj}
      language="json"
      options={settings}
    />
  );
};
