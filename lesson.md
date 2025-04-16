# Aula sobre construção de Linguagem

## **Importancia ao criar uma nova linguagem**

1. Sintaxe: é como organizamos as palavra
semantica é o significado das palavras
2. Lexico: conjunto de regas e elementos básicos que deve definir a forma e estrutura das unidades lexicas(tokens) 
1. palavras reservedas

### Lexico

---

 conjunto de regas e elementos básicos que deve definir a forma e estrutura das **unidades lexicas**(**tokens**) 

### Palavras reservadas (Keywords)

`if` `else` `for` `while` `do` `break` `continue` `return` `switch` `case` `default` 
`class` `interface` `extends` `implements` `public` `private` `protected` `static`
`void` `int` `float` `double` `char` `string` `boolean` `null` `true` `false`
`const` `let` `var` `function` `new` `this` `super` `try` `catch` `finally` `throw`

### Identificadores
Representam nomes dados a variáveis, funções, classes, objetos (REGAS: não pode ser espaço)

`x` `somaTotal` `$pessoa` `media` `calcularPontuacao` `MULTI_LINES`

### Literais
São valores constantes finais

`0` `1` `3.14` `"texto"` `'a'` `true` `false` `null` `undefined` `'\n'` `'\t'` `[]` `{}`

### Operadores
Sinbolos utulizados em expressoes

- Aritméticos: `+` `-` `*` `/` `%` `++` `--`
- Relacionais: `>` `<` `>=` `<=` `==` `!=` `===` `!==`
- Lógicos: `&&` `||` `!`
- Atribuição: `=` `+=` `-=` `*=` `/=` `%=`
- Bit a bit: `&` `|` `^` `~` `<<` `>>`
- Outros: `?:` (operador ternário), `.` (operador de acesso)


### Delimitadores (Pontuação)
São usados para separar diferentes partes do código e para definir a estrutura do código

- Fim de linha: `;`
- Blocos: `{` `}`
- Parênteses: `(` `)`
- Colchetes: `[` `]`
- Separadores: `,` `.` `:`
- Aspas: `"` `'` `` ` ``
- Comentários: `//` `/*` `*/`
- Template strings: `${` `}`
- Arrow function: `=>`
- Spread/Rest: `...`
- Optional chaining: `?.`
- Nullish coalescing: `??`


### Especiais
Auxiliam o analisador sintático principalmente ao se tratar de performance, pois geramente são ignorados

- comentários em linha: `//`
- comentários em bloco: `/**/

----

## ex de uso da sintaxe
- const x = 0;
- `const` (palavra reservada) `x` (identificador) `=` (operador de atribuição) `0` (literal numérico) `;` (delimitador)

![Sintaxe JavaScript](img/image.png)



## Entrada (tipo bruto)

1. é necessário uma entrada de um tipo bruto rwa_input: string
2. O **analisado  lexico** irá analisar esta entrada e quebrar cada caracter conforme os tokens que foram definidos e ira devolver uma lista sequencial `Array<Tokens>`
3. O **analisador sintático** recebe esta lista e gera a CST conforme as definições das produções (Rules).

        [0] -> Analisador semantico
        [0][0] -> Interpredator
        [0][1] -> Compilador

        [1] -> Formatador
        [2] -> Refatoração
        [n] -> Entre outras possibilidades