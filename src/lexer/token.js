class Token {
    constructor(tokenType, lexeme, literal, line) {
        this.tokenType = tokenType;
        this.lexeme = lexeme;
        this.literal = literal;
        this.line = line;
    }

    toString() {
        const lexemeString = (this.lexeme === null || this.lexeme === '') ? '' : ` ${this.lexeme}`;
        const literalString = this.literal === null ? '' : ` ${this.literal}`;
        return `${this.tokenType}${lexemeString}${literalString}`;
    }
}

export default Token;
