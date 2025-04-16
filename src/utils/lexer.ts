// Este import registra todos os tokens automaticamente
import '../language/tokens';

import { Lexer } from 'chevrotain';
import { TokensSet } from './tokens-registry';

export const Lexico = new Lexer(Array.from(TokensSet));
