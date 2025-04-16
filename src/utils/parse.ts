import { ILexingError, IRecognitionException } from 'chevrotain';
import { parser, REGRA_INICIAL } from '../language/parser';
import { Marker } from '../playground/editor';
import { Lexico } from './lexer';

export const parse = (input: string) => {
  const { tokens, errors: lexerErrors } = Lexico.tokenize(input);

  parser.input = tokens;

  const cst = parser[REGRA_INICIAL]();
  const errors = handleErrors(lexerErrors, parser.errors);

  return { cst, errors };
};

const handleErrors = (
  lexerErrors: ILexingError[],
  parserErrors: IRecognitionException[]
): Marker[] => [
  ...lexerErrors.map(
    (e) =>
      ({
        message: e.message,
        startLineNumber: e.line ?? 0,
        startColumn: e.column ?? 0,
        endLineNumber: e.line ?? 0,
        endColumn: e.length + 1,
      } satisfies Marker)
  ),
  ...parserErrors.map(
    (e) =>
      ({
        message: e.message,
        startLineNumber: e.token.startLine ?? 0,
        startColumn: e.token.startColumn ?? 0,
        endLineNumber: e.token.endLine ?? 0,
        endColumn: (e.token.endColumn ?? 0) + 1,
      } satisfies Marker)
  ),
];
