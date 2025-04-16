/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ISerializedGast } from "chevrotain"
import * as railroad from "./railroad-diagrams"
import { isNonTerminal, isTerminal } from "../productions"
import { MonarchScope } from "../tokens-registry"
import { sanitize } from "../sanitize"

const {
  Diagram,
  Optional,
  Sequence,
  Choice,
  Terminal,
  NonTerminal,
  ZeroOrMore,
  OneOrMore,
} = railroad

export const getNodeNameFromClass = (str: string) =>
  new RegExp(/:node\(([^)]*)\)/).exec(str)?.[1] || ""

export const getParentNameFromClass = (str: string) =>
  new RegExp(/:parent\(([^)]*)\)/).exec(str)?.[1] || ""

export const toRailroad = (
  prod: ISerializedGast,
  topRuleName: string
): railroad.FakeSVG => {
  const { type, definition } = prod

  if (isNonTerminal(prod)) {
    const name = prod.nonTerminalName ?? (prod as any).name
    return new NonTerminal(name, {
      cls: `:node(${sanitize(name)}) :parent(${sanitize(topRuleName)})`,
      href: undefined,
      title: undefined,
    })
  }

  if (isTerminal(prod)) return createTerminal(prod, topRuleName)

  const subDiagrams =
    definition?.map((subProd) => toRailroad(subProd, topRuleName)) ?? []
  const subSequence = new Sequence(subDiagrams)
  const firstSub = subDiagrams[0]

  switch (type) {
    case "Rule":
      return new Diagram(subDiagrams)
    case "Alternative":
      return subSequence
    case "Alternation":
      return new Choice(0, subDiagrams)
    case "Option": {
      if (subDiagrams.length > 1) return new Optional(subSequence)
      return new Optional(firstSub)
    }
    case "Repetition": {
      if (subDiagrams.length > 1) return new ZeroOrMore(subSequence)
      return new ZeroOrMore(firstSub)
    }
    case "RepetitionMandatory": {
      if (subDiagrams.length > 1) return new OneOrMore(subSequence)
      return new OneOrMore(firstSub)
    }
    case "RepetitionWithSeparator": {
      if (subDiagrams.length === 0) throw Error("Empty Optional production!")

      return new Optional(
        new Sequence(
          subDiagrams.concat([
            new ZeroOrMore(
              new Sequence(
                [createTerminal((prod as any).separator, topRuleName)].concat(
                  subDiagrams as any[]
                )
              )
            ),
          ])
        )
      )
    }
    case "RepetitionMandatoryWithSeparator": {
      if (subDiagrams.length === 0) throw Error("Empty Optional production!")

      return new Sequence(
        subDiagrams.concat([
          new ZeroOrMore(
            new Sequence(
              [createTerminal((prod as any).separator, topRuleName)].concat(
                subDiagrams as any[]
              )
            )
          ),
        ])
      )
    }
  }

  throw Error(`Non exhaustive match: ${type}`)
}

const createTerminal = (prod: ISerializedGast, ruleName: string) => {
  const { name, pattern } = prod as any

  let title = undefined
  if (
    typeof pattern === "string" ||
    Object.prototype.toString.call(pattern) === "[object RegExp]"
  )
    title = new RegExp(pattern)

  const cls = [
    MonarchScope.get(name),
    `:node(${sanitize(name)})`,
    `:parent(${sanitize(ruleName)})`,
  ].join(" ")

  return new Terminal(name, { title, cls, href: "" })
}
