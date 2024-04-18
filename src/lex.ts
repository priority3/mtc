import { Lexer, Token } from './type'

const keywords = {
  'function': Token.FunctionKeyword,
  'var': Token.VarKeyword,
  'const': Token.ConstKeyword,
  'let': Token.LetKeyword,
  'return': Token.ReturnKeyword,
}

enum TokenState {
  // init
  start,
  // =
  assign,
  // !
  not,
  // ==
  equals,
  // !=
  neEquals,
  // === !==
  finish,
}

/**
 * 词法分析 
 * `const a = 1;` -> [`const`,`a`,`=`,`1`,`;`]
 */
export function lexAll(s: string) {
  const lexer = lex(s)
  const tokens = []
  while (true) {
    lexer.scan()
    const token = lexer.token()
    const text = lexer.text()
    switch (token) {
      case Token.EOF:
        return tokens
      case Token.Unknown:
        tokens.push({ token })
        break
      default:
        tokens.push({ token, text })
        break
    }
  }
}

export function lex(s: string): Lexer {
  let pos = 0
  let text = ''
  let token = Token.BOF
  // Finite-State Machine
  let state: TokenState = TokenState.start
  let tempBuffer = ''
  return {
    scan,
    text: () => text,
    token: () => token,
    pos: () => pos,
  }
  function scan() {
    scanForward((str: string) => /[\t\b\n\s]/.test(str))
    if (pos === s.length) {
      token = Token.EOF
      return
    }
    const start = pos
    if (state === TokenState.finish) {
      text = tempBuffer
      state = TokenState.start
    }
    // Finite-State Machine
    switch (state) {
      case TokenState.start:
        if (s.charAt(pos) === '=' || s.charAt(pos) === '!') {
          state = s.charAt(pos) === '=' ? TokenState.assign : TokenState.not
          // do next state change
          scan()
        } else {
          // do other token judge
          break
        }
      case TokenState.assign:
      case TokenState.not:
      case TokenState.equals:
      case TokenState.neEquals:
        if (s.charAt(pos) === '=') {
          if (state === TokenState.assign) {
            token = Token.EqualsEqualsToken
          } else if (state === TokenState.not) {
            token = Token.ExclamationEqualsEqualsToken
          } else if (state === TokenState.equals) {
            token = Token.EqualsEqualsEqualsToken
          } else if (state === TokenState.neEquals) {
            token = Token.ExclamationEqualsToken
          }
          state = TokenState.start
          pos++
          text = s.slice(start, pos)
          return
        } else {
          token = Token.EqualsToken
          text = '='
          return
        }
    }
    if (/[0-9]/.test(s.charAt(pos))) {
      scanForward(c => /[0-9]/.test(c))
      text = s.slice(start, pos)
      token = Token.Literal
    }
    else if (/[_a-zA-Z]/.test(s.charAt(pos))) {
      scanForward(c => /[_a-zA-Z0-9]/.test(c))
      text = s.slice(start, pos)
      token = text in keywords ? keywords[text as keyof typeof keywords] : Token.Identifier
    } else {
      switch (s.charAt(pos)) {
        case ';':
          text = s.charAt(pos)
          token = Token.Semicolon
      }
      pos++
    }
  }
  function scanForward(pred: (s: string) => boolean) {
    while (pos < s.length && pred(s.charAt(pos))) pos++
  }
}
