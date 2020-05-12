import * as assert from 'assert';
import { describe, it } from 'mocha';

import { Token, TokenType } from '../src/index';

describe('Token', () => {
    describe('#toString()', () => {
        it('when literal is null should return an expected value', () => {
            const tokenType = TokenType.COMMA;
            const token = new Token(tokenType, ',', null, 1);
            const expected = 'COMMA ,';
            const result = token.toString();

            assert.equal(expected, result);
        });

        it('when literal is not null should return an expected value', () => {
            const tokenType = TokenType.STRING;
            const token = new Token(tokenType, '"value"', 'value', 1);
            const expected = 'STRING "value" value';
            const result = token.toString();

            assert.equal(expected, result);
        });
    });
});
