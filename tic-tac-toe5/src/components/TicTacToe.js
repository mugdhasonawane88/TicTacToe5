import './TicTacToe.css';
import { Constants, Position } from '../constants/Constants';
import { useState } from 'react';

function TicTacToe() {

  const [squares, setSquares] = useState(Array(Constants.TOTAL_SQUARES).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState(Constants.PLAYER_ONE.NAME);
  const [winner, setWinner] = useState(null);

  const playedOn = (position) => {
    if (winner) return;
    const board = squares.slice();
    if (board[position] !== '') {
      return;
    }
    board[position] = isPlayerOneTurn() ? Constants.PLAYER_ONE.SYMBOL : Constants.PLAYER_TWO.SYMBOL;
    setSquares(board);
    checkWinnerInTopRow(board);
    togglePlayer();
  }

  const togglePlayer = () => {
    setCurrentPlayer(isPlayerOneTurn() ? Constants.PLAYER_TWO.NAME : Constants.PLAYER_ONE.NAME);
  }

  const isPlayerOneTurn = () => {
    return currentPlayer === Constants.PLAYER_ONE.NAME;
  }

  const checkWinnerInTopRow = (board) => {
    if (Position.FIRST_ROW_POSITIONS.map((position) => board[position])
      .every((value, index, arr) => value && value === arr[Constants.FIRST_SQUARE])) {
      setWinner(currentPlayer);
    }
  }

  const getGameStatus = () => {
    if (!winner) {
      return currentPlayer + ' turn';
    } else {
      return winner + ' won';
    }
  }

  const renderBoard = () => {
    return (
      <div className='board'>
        {
          squares.map((squareValue, position) => {
            return (
              <span
                key={position}
                data-testid='square'
                className='cell'
                onClick={() => playedOn(position)}>
                {squareValue}
              </span>
            )
          }
          )
        }
      </div>)
  }

  return (
    <div className='App'>
      <header data-testid='header' className='App-header'>
        {Constants.HEADER}
      </header>
      {renderBoard()}
      <div className='status' data-testid="status">{getGameStatus()}</div>
    </div>
  );
}

export default TicTacToe;
