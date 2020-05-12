import TokenType from './tokenType';

const reservedKeywords = {
    and: TokenType.AND,
    or: TokenType.OR,
    class: TokenType.CLASS,
    public: TokenType.PUBLIC,
    private: TokenType.PRIVATE,
    protected: TokenType.PROTECTED,
    structure: TokenType.STRUCTURE,
    function: TokenType.FUNCTION,
    for: TokenType.FOR,
    if: TokenType.IF,
    else: TokenType.ELSE,
    nil: TokenType.NIL,
    do: TokenType.DO,
    return: TokenType.RETURN,
    super: TokenType.SUPER,
    self: TokenType.SELF,
    true: TokenType.TRUE,
    false: TokenType.FALSE,
    var: TokenType.VAR,
    const: TokenType.CONST,
    while: TokenType.WHILE,
    break: TokenType.BREAK,
    continue: TokenType.CONTINUE,
};

Object.freeze(reservedKeywords);

export default reservedKeywords;
