import {  NonTerminal, ProductionType, Terminal } from "chevrotain";

type Production = {
  type: ProductionType
}

export const isNonTerminal = (prod: Production): prod is NonTerminal => prod.type === "NonTerminal";

export const isTerminal = (prod: Production): prod is Terminal => prod.type === "Terminal";