/* eslint-disable no-useless-escape */
import { Lexer } from "chevrotain"
import { createToken } from "../utils/tokens-registry"
import { MonarchType } from "../utils/monaco-settings"

/**
 * Podemos deixar todos os tokens do
 * grupo "Lexer.SKIPPED" em primeiro
 * para otimizar a performance
 */
export const Whitespace = createToken({
  name: "Whitespace",
  pattern: /\s+/,
  group: Lexer.SKIPPED,
})

export const Comment = createToken({
  name: "Comment",
  pattern: /(\/\/|\#).*\s*/,
  group: Lexer.SKIPPED,
  type: MonarchType.comment,
})

/**
 * ==============================================================
 * ==============================================================
 * ==============================================================
 * ==============================================================
 * ==============================================================
 */

export const Barra = createToken({
  name: "Barra",
  pattern: /\|/,
  type: MonarchType.delimiter,
})

export const ChaveFechada = createToken({
  name: "ChaveFechada",
  pattern: /}/,
  type: MonarchType.keyword,
})

export const ChaveMaior = createToken({
  name: "ChaveMaior",
  pattern: />/,
  type: MonarchType.delimiter,
})

export const ChaveMenor = createToken({
  name: "ChaveMenor",
  pattern: /</,
  type: MonarchType.delimiter,
})

export const AbreColchete = createToken({
  name: "AbreColchete",
  pattern: /\[/,
  type: MonarchType.delimiter,
})

export const FechaColchete = createToken({
  name: "FechaColchete",
  pattern: /\]/,
  type: MonarchType.delimiter,
})

export const Arroba = createToken({
  name: "Arroba",
  pattern: /@/,
  type: MonarchType.operator,
})

export const jerSON = createToken({
  name: "jerSON",
  pattern: /jerSON/,
  type: MonarchType.operator,
})

export const jhonSON = createToken({
  name: "jhonSON",
  pattern: /jhonSON/,
  type: MonarchType.operator,
})

export const EComercial = createToken({
  name: "EComercial",
  pattern: /&/,
  type: MonarchType.delimiter,
})

export const Type = createToken({
  name: "Type",
  pattern: Lexer.NA,
})

export const Number = createToken({
  name: "Number",
  pattern: /[Nn]umber/,
  categories: [Type],
  type: MonarchType.keyword,
})

export const Text = createToken({
  name: "Text",
  pattern: /[Tt]ext/,
  categories: [Type],
  type: MonarchType.keyword,
})

export const Se = createToken({
  name: "SeKeyword",
  pattern: /SE/,
  type: MonarchType.keyword,
})

/**
 * ==============================================================
 * ==============================================================
 * ==============================================================
 * ==============================================================
 * ==============================================================
 */

/**
 * Alguns tokens pré-configurados
 * para agilizar o Workshop
 */
export const Literal = createToken({
  name: "Literal",
  pattern: Lexer.NA, // Indica uma categoria de Tokens
  type: MonarchType.literal,
})

export const NumberLiteral = createToken({
  name: "NumberLiteral",
  pattern: /-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/,
  categories: [Literal],
  type: MonarchType.literal,
})

export const StringLiteral = createToken({
  name: "StringLiteral",
  pattern: /"(?:[^\\"]|\\(?:[bfnrtv"\\/]|u[0-9a-fA-F]{4}))*"/,
  categories: [Literal],
  type: MonarchType.literal,
})

/**
 * Por ser genérico, a Identifier sempre
 * deve ficar por ultimo para não entrar
 * em conflito com os outros tokens
 */
export const Identifier = createToken({
  name: "Identifier",
  pattern: /[a-zA-Z$_][a-zA-Z0-9$_]*/,
  type: MonarchType.variable,
})
