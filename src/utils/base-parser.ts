// Este import registra todos os tokens automaticamente
import '../language/tokens';

import { CstParser } from 'chevrotain';
import { TokensSet } from './tokens-registry';

export class BaseParser extends CstParser {
  constructor() {
    super(Array.from(TokensSet), {
      recoveryEnabled: true,
      maxLookahead: 3,
      nodeLocationTracking: "full",
    });
  }

  public override async performSelfAnalysis() {
    try {
      super.performSelfAnalysis();
    } catch (e) {
      throw e;
    }
  }
}
