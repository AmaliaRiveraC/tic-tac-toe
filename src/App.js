import React, { Component } from 'react';
import './App.css';
import uid from 'uid';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      turn: 'X',
      gameEnd: false,
      totalMoves: 0,
      squares: ''
    };

    this.gameState = {};
  
  }
  componentWillMount() {
    this.restart()
  }
  clicked(e) {
    let index = e.target.dataset.square;
    if (!this.state.gameEnd) {
      if (this.gameState.board[index] === '') {
        this.gameState.board[index] = this.state.turn;
        e.target.innerText = this.state.turn;
        this.setState({
          turn: this.state.turn === 'X' ? 'O' : 'X',
          totalMoves: this.state.totalMoves += 1,
        })
        

        let winner = this.checkWinner();

        if (winner === 'X') {
          this.setState({
            gameEnd: true,
            winnerLine: this.msgWinner('Gano X')
          })
        } else if(winner === 'O') {
          this.setState({
            gameEnd: true,
            winnerLine: this.msgWinner('Gano O')
          })
        } else if(winner === 'none'){
          this.setState({
            gameEnd: true,
            winnerLine: this.msgWinner('Ustedes perdieron')
          })
        }
      }
    }
  }

  msgWinner(str) {
    return (
      <div>
        <div>{str}</div> 
        <div onClick={ (e) => this.restart(e) } className="restart">Restart</div>
      </div>
    )
  }
  checkWinner() {
    let winner = undefined,
        moves = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4,7], [2, 5, 8], [0, 4, 8], [2, 4, 6]],
        board = this.gameState.board

    for (let i = 0; i < moves.length; i++) {
      if (board[moves[i][0]] === board[moves[i][1]] && board[moves[i][1]] === board[moves[i][2]]) {
        return winner = board[moves[i][0]];
      }  else  if (this.state.totalMoves >= 9) {
        return winner = 'none';
      }
    }

  }
  restart() {
    this.gameState.board = Array(9).fill('');
    this.setState({
      totalMoves: 0,
      turn: 'X',
      gameEnd: false,
      winnerLine: '',
      squares: <div id="board" onClick={ (e) => this.clicked(e) }>
              {
                this.gameState.board.map( (square, key) => { 
                return(
                  <div className="square" data-square={key} key={uid()}></div>
                );
              })
              }
              </div>
    })
  }
  render() {
    return (
      <div id="game">
        <div id="status">{this.state.winnerLine}</div>
        <div id="head">TIC TAC TOE </div>
        <div>
          {this.state.squares}
        </div> 
      </div>
    );
  }
}

export default App;
