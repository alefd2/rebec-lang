import { Rule } from 'chevrotain';
import { parser } from '../../language/parser';
import { RuleDiagram } from './rule-diagram';

export const Diagrams = () => (
  <div className="h-full overflow-y-scroll bg-[#15141b] text-white pt-4">
    {parser
      .getSerializedGastProductions()
      .filter((prod) => !!prod)
      .map((prod) => (
        <RuleDiagram key={(prod as any).name} rule={prod as unknown as Rule} />
      ))}
  </div>
);
