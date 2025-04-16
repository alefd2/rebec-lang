import { useRecoilState } from 'recoil';
import { hoveredNodeState } from '../atoms';
import { ISerializedGast, Rule } from 'chevrotain';
import { useEffect, useMemo, useRef } from 'react';
import {
  getNodeNameFromClass,
  getParentNameFromClass,
  toRailroad,
} from '../../utils/diagram/generate';
import { sanitize } from '../../utils/sanitize';

type Props = {
  rule: Rule;
};

export const RuleDiagram = ({ rule }: Props) => {
  const [hoveredNode, setHoveredNode] = useRecoilState(hoveredNodeState);

  const handleMouseEnter = () => setHoveredNode(rule.name);
  const handleMouseLeave = () => setHoveredNode('');

  return (
    <div>
      <div className="flex justify-center">
        <h2
          data-hovered={hoveredNode === sanitize(rule.name)}
          className="font-medium text-lg px-3 data-[hovered=true]:bg-[#169fff] hover:bg-[#169fff] rounded transition-colors cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {rule.name}
        </h2>
      </div>
      <Diagram rule={rule} />
    </div>
  );
};

const Diagram = ({ rule }: Props) => {
  const diagramWrapperDivRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useRecoilState(hoveredNodeState);

  const diagramSvg = useMemo(
    () =>
      toRailroad(
        rule as unknown as ISerializedGast,
        rule.name
      ).toSVG() as SVGElementTagNameMap['svg'],
    [rule]
  );

  /**
   * Adiciona "Event Listeners" aos
   * nodos Terminals e NonTerminals
   */
  useEffect(() => {
    if (!diagramWrapperDivRef.current) return;

    const nonTerminalNodes = diagramSvg.getElementsByClassName('non-terminal');
    const terminalNodes = diagramSvg.getElementsByClassName('terminal');

    const nodes = [
      ...Array.from(nonTerminalNodes),
      ...Array.from(terminalNodes),
    ] as unknown as HTMLCollectionOf<SVGGElement>;

    const handleMouseEnter = (name: string) => setHoveredNode(name);
    const handleMouseLeave = () => setHoveredNode('');

    Array.from(nodes).forEach((n) => {
      n.addEventListener('mouseenter', () => {
        handleMouseEnter(getNodeNameFromClass(n.classList.toString()));
      });
      n.addEventListener('mouseleave', handleMouseLeave);
    });

    diagramWrapperDivRef.current.appendChild(diagramSvg);

    return () => {
      try {
        diagramWrapperDivRef.current!.removeChild(diagramSvg);
      } catch {}

      Array.from(nodes).forEach((n) => {
        n.removeEventListener('mouseenter', () => {
          handleMouseEnter(getNodeNameFromClass(n.classList.toString()));
        });
        n.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [diagramSvg, diagramWrapperDivRef]);

  /**
   * Adiciona ":hover" aos nodos Terminals e NonTerminals
   * quando o valor de "hoveredNode" é alterado
   */
  useEffect(() => {
    if (!diagramWrapperDivRef.current) return;

    const nonTerminalNodes = diagramSvg.getElementsByClassName('non-terminal');
    const terminalNodes = diagramSvg.getElementsByClassName('terminal');

    const nodes = [
      ...Array.from(nonTerminalNodes),
      ...Array.from(terminalNodes),
    ] as unknown as HTMLCollectionOf<SVGGElement>;

    const select = (cl: DOMTokenList) => {
      cl.add('hovered');
      cl.remove('unselected');
    };
    const unselect = (cl: DOMTokenList) => {
      cl.remove('hovered');
      cl.add('unselected');
    };
    const clear = (cl: DOMTokenList) => {
      cl.remove('unselected');
      cl.remove('hovered');
    };

    if (hoveredNode === '')
      Array.from(nodes).forEach((n) => clear(n.classList));
    else
      Array.from(nodes).forEach((n) =>
        getNodeNameFromClass(n.classList.toString()) ===
          sanitize(hoveredNode) ||
        getParentNameFromClass(n.classList.toString()) === sanitize(hoveredNode)
          ? select(n.classList)
          : unselect(n.classList)
      );
  }, [hoveredNode, diagramSvg, diagramWrapperDivRef]);

  return <div ref={diagramWrapperDivRef} />;
};
