const assert = require('assert');
const mocha = require('mocha');

const { describe, it } = mocha;

const { Token, TokenType, Scanner } = require('../src/index');

describe('Token', () => {
    describe('#scanTokens()', () => {
        it('giving a source text should return expected tokens', () => {
            const source = 'const name = "some name";';
            const scanner = new Scanner(source);

            const expectedTokens = [
                new Token(TokenType.CONST, 'const', null, 1),
                new Token(TokenType.IDENTIFIER, 'name', null, 1),
                new Token(TokenType.EQUAL, '=', null, 1),
                new Token(TokenType.STRING, '"some name"', 'some name', 1),
                new Token(TokenType.SEMICOLON, ';', null, 1),
                new Token(TokenType.EOF, '', null, 1),
            ];
            assert.deepEqual(scanner.scanTokens(), expectedTokens);
        });
    });
});
