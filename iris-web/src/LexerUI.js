import React from 'react';
import { Scanner } from 'iris-js';
import './LexerUI.css';

class LexerUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sourceInput: '',
            tokensString: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onTokenizeTap = this.onTokenizeTap.bind(this);
    }

    render() {
        return (
            <div>
                <div className='main-container'>
                    <text>
                        Iris Lexer
                    </text>

                    <div className='sources-container'>
                        <div className='source-element'>
                            <text>Source code</text>
                            <textarea className='input-textarea' onChange={this.handleInputChange} />
                        </div>

                        <div className='source-element'>
                            <text>Tokens</text>
                            <textarea className='output-textarea' value={this.state.tokensString} readOnly={true} />
                        </div>
                    </div>

                    <button className='tokenize-button' onClick={this.onTokenizeTap}>
                        Tokenize
                    </button>
                </div>
            </div>
        );
    }

    handleInputChange(event) {
        const input = event.target.value;
        this.setState({
            sourceInput: input
        });
    }

    onTokenizeTap(event) {
        const source = this.state.sourceInput;
        const scanner = new Scanner(source);
        const tokens = scanner.scanTokens().map((token) => token.toString());
        const text = tokens.join('\n');
        this.setState({
            tokensString: text
        });
    }
}

export default LexerUI;
