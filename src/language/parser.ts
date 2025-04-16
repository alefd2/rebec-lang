import * as lex from "./tokens"
import { BaseParser } from "../utils/base-parser"

export const REGRA_INICIAL: Production = "program" as const

/*
}100 @jerSON nomeDaVariavel&
}"100" @jerSON nomeDaVariavel | Number |&
}"100" @jerSON nomeDaVariavel | Pessoa |&
>nomeDaVariavel< jhonSON&

SE >condicao< [
    }100 @jerSON nomeDaVariavel&
    }100 @jerSON nomeDaVariavel&

    SE >condicao< [
        SE >condicao< [
            }100 @jerSON nomeDaVariavel&
            }100 @jerSON nomeDaVariavel&
        ]&
    ]&
]&

*/

export class Parser extends BaseParser {
  program = this.RULE("Programa", () => {
    this.MANY(() => {
      this.OR([
        { ALT: () => this.SUBRULE(this.atribuicao) },
        { ALT: () => this.SUBRULE(this.impressao) },
        { ALT: () => this.SUBRULE(this.ifSe) },
      ])
    })
  })

  atribuicao = this.RULE("Atribuição", () => {
    // } 100 @jerSON nomeDaVariavel&
    this.CONSUME(lex.ChaveFechada)
    this.CONSUME(lex.Literal)
    this.CONSUME(lex.Arroba)
    this.CONSUME(lex.jerSON)
    this.CONSUME(lex.Identifier)

    this.OPTION(() => {
      this.CONSUME(lex.Barra)
      this.OR([
        { ALT: () => this.CONSUME(lex.Type) },
        { ALT: () => this.CONSUME2(lex.Identifier) },
      ])
      this.CONSUME2(lex.Barra)
    })

    this.CONSUME(lex.EComercial)
  })

  impressao = this.RULE("Impressão", () => {
    // >nomeDaVariavel< jhonSON&
    this.CONSUME(lex.ChaveMaior)
    this.CONSUME(lex.Identifier)
    this.CONSUME(lex.ChaveMenor)
    this.CONSUME(lex.jhonSON)
    this.CONSUME(lex.EComercial)
  })

  ifSe = this.RULE("Se", () => {
    this.CONSUME(lex.Se)
    this.CONSUME(lex.ChaveMaior)
    this.CONSUME(lex.Identifier)
    this.CONSUME(lex.ChaveMenor)
    this.SUBRULE(this.bloco)
    this.CONSUME(lex.EComercial)
  })

  bloco = this.RULE("Bloco", () => {
    this.CONSUME(lex.AbreColchete)
    this.SUBRULE(this.program)
    this.CONSUME(lex.FechaColchete)
  })
}

export type Production = Exclude<keyof Parser, keyof BaseParser>

export const parser = new Parser()
try {
  parser.performSelfAnalysis()
} catch {
  /* empty */
}
