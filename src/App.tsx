import { Mosaic, MosaicNode, MosaicWindow } from 'react-mosaic-component';
import { Diagrams } from './playground/diagrams';
import { Editor } from './playground/editor';
import { useLocalStorage } from '@uidotdev/usehooks';
import { FloatingActions } from './playground/actions';
import { ErrorDialog } from './playground/error-dialog';
import { Cst } from './playground/cst';

const ELEMENT_MAP = {
  editor: <Editor />,
  diagrams: <Diagrams />,
  cst: <Cst />
};
type PlaygroundElement = keyof typeof ELEMENT_MAP;

const ELEMENT_TITLE: Record<PlaygroundElement, string> = {
  editor: 'Entrada da Linguagem',
  diagrams: 'Diagrama Sintático',
  cst: 'Árvore de sintaxe concreta'
};

export const App = () => {
  const [mosaicState, saveMosaicState] =
    useLocalStorage<MosaicNode<PlaygroundElement> | null>('mosaic', {
      direction: 'column',
      first: 'editor',
      second: {
        direction: 'row',
        first: 'diagrams',
        second: 'cst'
      },
      splitPercentage: 20
    });

  return (
    <div className="h-screen relative">
      <ErrorDialog />
      <FloatingActions />
      <Mosaic<PlaygroundElement>
        renderTile={(id, path) => (
          <MosaicWindow<PlaygroundElement>
            path={path}
            title={ELEMENT_TITLE[id]}
          >
            {ELEMENT_MAP[id]}
          </MosaicWindow>
        )}
        className={['mosaic-blueprint-theme', 'bp4-dark'].join(' ')}
        initialValue={mosaicState}
        onChange={(node) => saveMosaicState(node)}
      />
    </div>
  );
};
