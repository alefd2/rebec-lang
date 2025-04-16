import {
  type ITokenConfig,
  Lexer,
  type TokenType,
  createToken as create,
} from 'chevrotain';
import { MonarchType } from './monaco-settings';

type TokenConfig = ITokenConfig & {
  type?: MonarchType;
};

export const TokensSet = new Set<TokenType>();
export const MonarchSet = new Map<MonarchType, RegExp[]>();
export const MonarchScope = new Map<string, string>();

export const createToken = (token: TokenConfig) => {
  const createdToken = create(token);
  TokensSet.add(createdToken);

  if (token.type !== undefined && !!token.pattern) {
    let pattern: RegExp;

    MonarchScope.set(token.name, MonarchType[token.type]);

    if (typeof token.pattern === 'string') pattern = new RegExp(token.pattern);
    else if (token.pattern instanceof RegExp) pattern = token.pattern;
    else throw Error('Not acceptable Token pattern');

    if (pattern !== Lexer.NA) {
      const storedSet = MonarchSet.get(token.type);
      if (!storedSet) MonarchSet.set(token.type, [pattern]);
      else MonarchSet.set(token.type, [...storedSet, pattern]);
    }
  }

  return createdToken;
};
