import { it, expect } from "vitest";
import { readFileSync } from 'fs-extra'
import { resolve } from 'path'
import { lexAll } from '../src/lex'
import { Token } from "../src/type";

const getResolveFile = (file: string) => resolve(__dirname, file)

it("basic lex", () => {
  // const a = 1;
  const s = readFileSync(getResolveFile('./files/basic.ts'), 'utf-8')
  const tokens = lexAll(s)
  expect(tokens.length).equal(5)
  expect(tokens).toStrictEqual([
    { text: `const`, token: Token.ConstKeyword },
    { text: `a`, token: Token.Identifier },
    { text: `=`, token: Token.EqualsToken },
    { text: `1`, token: Token.Literal },
    { text: `;`, token: Token.Semicolon },
  ]);
})
it('equal lex', () => {
  const s = readFileSync(getResolveFile('./files/equals.ts'), 'utf-8')
  const tokens = lexAll(s)
  expect(tokens.length).equal(28)
  expect(tokens).toStrictEqual([
    { text: `let`, token: Token.LetKeyword },
    { text: `b`, token: Token.Identifier },
    { text: `=`, token: Token.EqualsToken },
    { text: `1`, token: Token.Literal },
    { text: `const`, token: Token.ConstKeyword },
    { text: `equalEqual`, token: Token.Identifier },
    { text: `=`, token: Token.EqualsToken },
    { text: `b`, token: Token.Identifier },
    { text: `==`, token: Token.EqualsEqualsToken },
    { text: `1`, token: Token.Literal },
    { text: `const`, token: Token.ConstKeyword },
    { text: `equalEqualEqual`, token: Token.Identifier },
    { text: `=`, token: Token.EqualsToken },
    { text: `b`, token: Token.Identifier },
    { text: `===`, token: Token.EqualsEqualsEqualsToken },
    { text: `1`, token: Token.Literal },
    { text: `const`, token: Token.ConstKeyword },
    { text: `notEqual`, token: Token.Identifier },
    { text: `=`, token: Token.EqualsToken },
    { text: `b`, token: Token.Identifier },
    { text: `!=`, token: Token.ExclamationEqualsToken },
    { text: `1`, token: Token.Literal },
    { text: `const`, token: Token.ConstKeyword },
    { text: `notEqualEqual`, token: Token.Identifier },
    { text: `=`, token: Token.EqualsToken },
    { text: `b`, token: Token.Identifier },
    { text: `!==`, token: Token.ExclamationEqualsEqualsToken },
    { text: `1`, token: Token.Literal },
  ])
})
