import MonacoEditor, {
  OnChange,
  OnMount,
  Monaco,
  BeforeMount,
} from "@monaco-editor/react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useCallback, useEffect, useState } from "react";
import { parse } from "../utils/parse";
import { MonarchType, settings } from "../utils/monaco-settings";
import { MonarchSet } from "../utils/tokens-registry";
import AuraTheme from "../utils/theme.json";
import { CstElement } from "chevrotain";
import { Range } from "monaco-editor";
import { useDecorations } from "./editor/decorations-hook";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  editorInstanceState,
  nodeRangeMapState,
  monacoInstanceState,
} from "./atoms";
import { NodeRangeMap } from "./atoms/node-range-map";
import { sanitize } from "../utils/sanitize";

export type Marker = {
  message: string;
  source?: string;
  startLineNumber: number;
  startColumn: number;
  endLineNumber: number;
  endColumn: number;
  modelVersionId?: number;
  tags?: Monaco["MarkerTag"][];
};

export const Editor = () => {
  const setNodeRangeMap = useSetRecoilState(nodeRangeMapState);
  const [editorInstance, setEditorInstance] =
    useRecoilState(editorInstanceState);
  const [monacoInstance, setMonacoInstance] =
    useRecoilState(monacoInstanceState);

  const [code, saveCode] = useLocalStorage("code", "");

  const [markers, setMarkers] = useState<Marker[]>([]);

  useDecorations();

  const prepareEditor: BeforeMount = (monaco) => {
    monaco.languages.register({ id: "fema-workshop" });
    monaco.editor.defineTheme("aura-dark", AuraTheme as any);

    monaco.languages.setMonarchTokensProvider("fema-workshop", {
      defaultToken: "invalid",
      tokenizer: {
        root: Array.from(MonarchSet.entries())
          .map(([tokenType, expArray]) =>
            expArray?.map((exp) => [exp, MonarchType[tokenType]])
          )
          .flat() as any,
      },
    });
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    setEditorInstance(editor);
    setMonacoInstance(monaco);

    const model = editor.getModel();
    if (!model) return;

    monaco.editor.setModelMarkers(model, "owner", markers as any);

    editor.onDidChangeModelContent(() =>
      monaco.editor.setModelMarkers(model, "owner", markers as any)
    );
  };

  const handleEditorDidChange = useCallback<OnChange>(
    (value) => saveCode(value ?? ""),
    []
  );

  useEffect(() => {
    const parsingResult = parse(code);
    setMarkers(parsingResult.errors);

    const newNodeRangeMap: NodeRangeMap = {};

    const walk = (node: CstElement) => {
      let range: Range;
      let nodeName: string;

      if ("image" in node) {
        const { tokenType, startLine, startColumn, endLine, endColumn } = node;
        if (!startLine || !startColumn || !endLine || !endColumn) return;

        nodeName = tokenType.name;
        range = new Range(startLine, startColumn, endLine, endColumn + 1);
      } else {
        if (!node.location) return;
        const { startLine, startColumn, endLine, endColumn } = node.location;
        if (!startLine || !startColumn || !endLine || !endColumn) return;

        nodeName = node.name;
        range = new Range(startLine, startColumn, endLine, endColumn + 1);

        Object.values(node.children).forEach((child) => child.forEach(walk));
      }

      if (!range) return;

      nodeName = sanitize(nodeName);
      if (newNodeRangeMap[nodeName]) newNodeRangeMap[nodeName].push(range);
      else newNodeRangeMap[nodeName] = [range];
    };

    walk(parsingResult.cst);
    setNodeRangeMap(newNodeRangeMap);
  }, [code]);

  useEffect(() => {
    if (editorInstance && monacoInstance) {
      const model = editorInstance.getModel();
      if (!model) return;

      monacoInstance.editor.setModelMarkers(model, "owner", markers);
    }
  }, [markers, editorInstance, monacoInstance]);

  return (
    <MonacoEditor
      theme="aura-dark"
      defaultValue={code}
      defaultLanguage="fema-workshop"
      options={settings}
      beforeMount={prepareEditor}
      onMount={handleEditorDidMount}
      onChange={handleEditorDidChange}
    />
  );
};
