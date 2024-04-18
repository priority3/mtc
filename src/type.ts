export enum Token {
  FunctionKeyword,
  VarKeyword,
  ConstKeyword,
  LetKeyword,
  ReturnKeyword,
  // ....other keywords
  EqualsToken,
  EqualsEqualsToken,
  EqualsEqualsEqualsToken,
  ExclamationEqualsToken,
  ExclamationEqualsEqualsToken,
  Type,
  Literal,
  // Identifiers and PrivateIdentifiers
  Identifier,
  Newline,
  Semicolon,
  Colon,
  Whitespace,
  Unknown,
  BOF,
  EOF,
}

export interface Lexer {
  /** (do)scan the next token */
  scan(): void;
  /** current text */
  text(): string;
  /** current token */
  token(): Token;
  /** current position */
  pos(): number;
}
