import React from 'react';
import ReactDOM from 'react-dom';
import Board from './board';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        let { winner } = this.calculateWinner(squares);

        if(winner || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({ 
            history: history.concat([{
                squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        let { winner, formation } = this.calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ? `Goto move #${move}` : "Goto game start";
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if(winner) {
            status = `We have a winner: ${winner}`;
        } else {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        }

        return (
            <div className="game">
            <div className="game-board">
                <Board 
                formation={formation}
                squares={current.squares}
                onClick={(i) => this.handleClick(i)} />

            </div>
            <div className="game-info">
                <div>{ status }</div>
                <ol>{ moves }</ol>
            </div>
            </div>
        );
    }

    calculateWinner(squares) {
        const lines = [
            [0,1,2], [3,4,5], [6,7,8],
            [0,3,6], [1,4,7], [2,5,8],
            [0,4,8], [2,4,6]
        ];
        for(let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if(squares[a] && (squares[a] === squares[b]) && (squares[a] === squares[c])) {
                return {
                    winner: squares[a],
                    formation: lines[i].slice()
                }
            }
        }
        return {
            winner: null,
            formation: null
        };
    }
}

export default Game;