import { it, expect } from "vitest";
import { readFileSync } from 'fs-extra'
import { resolve } from 'path'
import { lexAll } from '../src/lex'
import { Token } from "../src/type";

const getResolveFile = (file: string) => resolve(__dirname, file)

it("basic lex", () => {
  // const a = 1;
  const s = readFileSync(getResolveFile('./files/a.ts'), 'utf-8')
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
