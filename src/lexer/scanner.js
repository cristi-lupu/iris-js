import Token from './token';
import TokenType from './tokenType';
import reservedKeywords from './reservedKeywords';

function isAlpha(char) {
    const match = char.match(/^[a-zA-Z0-9_]$/);
    return !(match === null || typeof match === 'undefined');
}

function isDigit(char) {
    const match = char.match(/^[0-9]$/);
    return !(match === null || typeof match === 'undefined');
}

function isAlphaNumeric(char) {
    return isAlpha(char) || isDigit(char);
}

class Scanner {
    constructor(source) {
        this.source = source;
        this.tokens = [];
        this.start = 0;
        this.current = 0;
        this.line = 1;
    }

    scanTokens() {
        while (!this.isAtEnd()) {
            this.start = this.current;
            this.scanToken();
        }

        const eofToken = new Token(TokenType.EOF, '', null, this.line);
        this.tokens.push(eofToken);

        return this.tokens;
    }

    scanToken() {
        const char = this.advance();
        switch (char) {
        case '(': {
            this.addToken(TokenType.LEFT_PAREN);
            break;
        }
        case ')': {
            this.addToken(TokenType.RIGHT_PAREN);
            break;
        }
        case '{': {
            this.addToken(TokenType.LEFT_BRACE);
            break;
        }
        case '}': {
            this.addToken(TokenType.RIGHT_BRACE);
            break;
        }
        case '[': {
            this.addToken(TokenType.LEFT_SQUARE);
            break;
        }
        case ']': {
            this.addToken(TokenType.RIGHT_SQUARE);
            break;
        }
        case ';': {
            this.addToken(TokenType.SEMICOLON);
            break;
        }
        case ',': {
            this.addToken(TokenType.COMMA);
            break;
        }
        case '?': {
            this.addToken(TokenType.QUESTION);
            break;
        }
        case ':': {
            this.addToken(TokenType.COLON);
            break;
        }
        case '.': {
            this.addToken(TokenType.PERIOD);
            break;
        }
        case '*': {
            const tokenType = this.match('=') ? TokenType.STAR_EQUAL : TokenType.STAR;
            this.addToken(tokenType);
            break;
        }
        case '%': {
            const tokenType = this.match('=') ? TokenType.PERCENT_EQUAL : TokenType.PERCENT;
            this.addToken(tokenType);
            break;
        }
        case '!': {
            const tokenType = this.match('=') ? TokenType.EXCLAIM_EQUAL : TokenType.EXCLAIM;
            this.addToken(tokenType);
            break;
        }
        case '=': {
            const tokenType = this.match('=') ? TokenType.EQUAL_EQUAL : TokenType.EQUAL;
            this.addToken(tokenType);
            break;
        }
        case '>': {
            const tokenType = this.match('=') ? TokenType.GREATER_EQUAL : TokenType.GREATER;
            this.addToken(tokenType);
            break;
        }
        case '<': {
            const tokenType = this.match('=') ? TokenType.LESS_EQUAL : TokenType.LESS;
            this.addToken(tokenType);
            break;
        }
        case '-': {
            if (this.match('-')) {
                this.addToken(TokenType.MINUS_MINUS);
            } else if (this.match('=')) {
                this.addToken(TokenType.MINUS_EQUAL);
            } else {
                this.addToken(TokenType.MINUS);
            }
            break;
        }
        case '+': {
            if (this.match('+')) {
                this.addToken(TokenType.PLUS_PLUS);
            } else if (this.match('=')) {
                this.addToken(TokenType.PLUS_EQUAL);
            } else {
                this.addToken(TokenType.PLUS);
            }
            break;
        }
        case '|': {
            if (this.match('|')) {
                this.addToken(TokenType.PIPE_PIPE);
            } else if (this.match('=')) {
                this.addToken(TokenType.PIPE_EQUAL);
            } else {
                this.addToken(TokenType.PIPE);
            }
            break;
        }
        case '&': {
            if (this.match('&')) {
                this.addToken(TokenType.AMPERSAND_AMPERSAND);
            } else if (this.match('=')) {
                this.addToken(TokenType.AMPERSAND_EQUAL);
            } else {
                this.addToken(TokenType.AMPERSAND);
            }
            break;
        }
        case '/': {
            if (this.match('=')) {
                this.addToken(TokenType.SLASH_EQUAL);
            } else if (this.match('/')) {
                // A comment goes until the end of the line.
                while (this.peek() !== '\n' && !this.isAtEnd()) {
                    this.advance();
                }
            } else {
                this.addToken(TokenType.SLASH);
            }
            break;
        }
        // Ignore whitespaces
        case ' ': { break; }
        case '\r': { break; }
        case '\t': { break; }
        case '\n': {
            this.line += 1;
            break;
        }
        case '"': {
            this.scanString();
            break;
        }
        default: {
            if (isDigit(char)) {
                this.scanNumber();
            } else if (isAlpha(char)) {
                this.scanIdentifier();
            } else {
                console.log('Unexpected character');
                // iris.error(line, "Unexpected character.");
            }
            break;
        }
        }
    }

    scanIdentifier() {
        while (isAlphaNumeric(this.peek())) {
            this.advance();
        }

        const text = this.source.substring(this.start, this.current);

        // See if the identifier is a reserved word
        let tokenType = reservedKeywords[text];

        // If is not reserved word, then we set it to identifier
        if (typeof tokenType === 'undefined' || tokenType === null) {
            tokenType = TokenType.IDENTIFIER;
        }

        this.addToken(tokenType);
    }

    scanNumber() {
        while (isDigit(this.peek())) {
            this.advance();
        }

        if (this.peek() === '.' && isDigit(this.peekNext())) {
            // Consume the '.'
            this.advance();

            while (isDigit(this.peek())) { this.advance(); }
        }

        const text = this.source.substring(this.start, this.current);
        this.addToken(TokenType.NUMBER, parseFloat(text));
    }

    scanString() {
        while (this.peek() !== '"' && !this.isAtEnd()) {
            if (this.peek() === '\n') { this.line += 1; }
            this.advance();
        }

        // Unterminated string
        if (this.isAtEnd()) {
            console.log('Unterminated string');
            // iris.error(line, "Unterminated string");
            return;
        }

        // Consume the closing '"'
        this.advance();

        const value = this.source.substring(this.start + 1, this.current - 1);
        this.addToken(TokenType.STRING, value);
    }

    match(expectedChar) {
        if (this.isAtEnd()) {
            return false;
        }

        if (this.source.charAt(this.current) !== expectedChar) {
            return false;
        }

        this.current += 1;

        return true;
    }

    isAtEnd() {
        return this.current >= this.source.length;
    }

    peek() {
        if (this.isAtEnd()) {
            return '\0';
        }

        return this.source.charAt(this.current);
    }

    peekNext() {
        if (this.current + 1 >= this.source.length) {
            return '\0';
        }

        return this.source.charAt(this.current + 1);
    }

    advance() {
        const currentChar = this.source.charAt(this.current);
        this.current += 1;

        return currentChar;
    }

    addToken(tokenType, literal = null) {
        const text = this.source.substring(this.start, this.current);
        const token = new Token(tokenType, text, literal, this.line);

        this.tokens.push(token);
    }
}

export default Scanner;
