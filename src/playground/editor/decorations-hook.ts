import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  editorInstanceState,
  hoveredNodeState,
  nodeRangeMapState,
} from '../atoms';
import { sanitize } from '../../utils/sanitize';

export const useDecorations = () => {
  const hoveredNode = useRecoilValue(hoveredNodeState);
  const editor = useRecoilValue(editorInstanceState);
  const nodeRangeMap = useRecoilValue(nodeRangeMapState);

  const [oldDecorations, setOldDecorations] = useState<string[]>([]);

  useEffect(() => {
    if (!editor) return;

    const clearedDecorations = editor.deltaDecorations(oldDecorations, []);

    if (!nodeRangeMap[sanitize(hoveredNode)]) {
      setOldDecorations(() => clearedDecorations);
      return;
    }

    const decorationsFromHover = nodeRangeMap[sanitize(hoveredNode)].map(
      (range) => ({
        range,
        options: {
          isWholeLine: false,
          className: 'highlighted-range',
        },
      })
    );

    const updatedDecos = editor.deltaDecorations(
      clearedDecorations,
      decorationsFromHover
    );
    setOldDecorations(() => updatedDecos);
  }, [hoveredNode, nodeRangeMap]);
};
