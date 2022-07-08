import { render, screen, fireEvent } from '@testing-library/react';
import TicTacToe from './TicTacToe';
import { Constants, Position } from '../constants/TestConstants';

describe('TicTacToe component', () => {

  beforeEach(() => {
    render(<TicTacToe />);
  });

  test('should have title', () => {

    const headerElement = screen.getByTestId('header');

    expect(headerElement).toBeInTheDocument();
    expect(headerElement.textContent).toBe(Constants.HEADER);
  });

  test('Should create empty nine squares in the board when game starts', () => {

    const squares = screen.queryAllByTestId('square');

    expect(squares).toHaveLength(Constants.TOTAL_SQUARES);
    squares.forEach((square) => {
      expect(square.textContent).toBe('');
    })
  });

  test('Should display X in square when player one clicks on a square', () => {

    const squares = screen.queryAllByTestId('square');

    fireEvent.click(squares[Position.TOP_LEFT_SQUARE]);

    squares.forEach((square, position) => {
      if (position === Position.TOP_LEFT_SQUARE) {
        expect(square.textContent).toBe('X');
      } else {
        expect(square.textContent).toBe('');
      }
    })
  });

  test('Should display alternatively X & O in square when players click on a square', () => {

    const squares = screen.queryAllByTestId('square');

    fireEvent.click(squares[Position.TOP_LEFT_SQUARE]);
    fireEvent.click(squares[Position.CENTER_SQUARE]);

    squares.forEach((square, position) => {
      if (position === Position.TOP_LEFT_SQUARE) {
        expect(square.textContent).toBe(Constants.PLAYER_ONE_SYMBOL);
      } else if (position === Position.CENTER_SQUARE) {
        expect(square.textContent).toBe(Constants.PLAYER_TWO_SYMBOL);
      } else {
        expect(square.textContent).toBe('');
      }
    })
  });

  test('Should not allow player to click same square again', () => {

    const squares = screen.queryAllByTestId('square');

    fireEvent.click(squares[Position.TOP_LEFT_SQUARE]);
    fireEvent.click(squares[Position.TOP_LEFT_SQUARE]);

    squares.forEach((square, position) => {
      if (position === Position.TOP_LEFT_SQUARE) {
        expect(square.textContent).toBe(Constants.PLAYER_ONE_SYMBOL);
      } else {
        expect(square.textContent).toBe('');
      }
    })
  });

  test('Should display players name to play', () => {

    const squares = screen.queryAllByTestId('square');
    const status = screen.getByTestId('status');

    expect(status.textContent).toBe(Constants.PLAYER_ONE_TURN);
    fireEvent.click(squares[Position.TOP_LEFT_SQUARE]);

    expect(status.textContent).toBe(Constants.PLAYER_TWO_TURN);

    fireEvent.click(squares[Position.CENTER_SQUARE]);
    expect(status.textContent).toBe(Constants.PLAYER_ONE_TURN);

  });

  test('Should announce player as winner when he places symbol across the first row', () => {

    const squares = screen.queryAllByTestId('square');
    const status = screen.getByTestId('status');

    fireEvent.click(squares[Position.TOP_LEFT_SQUARE]);
    fireEvent.click(squares[Position.CENTER_LEFT_SQUARE]);
    fireEvent.click(squares[Position.TOP_MIDDLE_SQUARE]);
    fireEvent.click(squares[Position.CENTER_SQUARE]);
    fireEvent.click(squares[Position.TOP_RIGHT_SQUARE]);

    expect(status.textContent).toBe(Constants.PLAYER_ONE_WON);

  });

  test('Should end the game once there is winner', () => {

    const squares = screen.queryAllByTestId('square');
    const status = screen.getByTestId('status');

    fireEvent.click(squares[Position.CENTER_LEFT_SQUARE]);
    fireEvent.click(squares[Position.TOP_MIDDLE_SQUARE]);
    fireEvent.click(squares[Position.CENTER_SQUARE]);
    fireEvent.click(squares[Position.TOP_LEFT_SQUARE]);
    fireEvent.click(squares[Position.BOTTOM_LEFT_SQUARE]);
    fireEvent.click(squares[Position.TOP_RIGHT_SQUARE]);
    fireEvent.click(squares[Position.CENTER_RIGHT_SQUARE]);

    squares.forEach((square, position) => {
      if (position === Position.CENTER_LEFT_SQUARE || position === Position.CENTER_SQUARE || position === Position.BOTTOM_LEFT_SQUARE) {
        expect(square.textContent).toBe(Constants.PLAYER_ONE_SYMBOL);
      } else if (position === Position.TOP_MIDDLE_SQUARE || position === Position.TOP_LEFT_SQUARE || position === Position.TOP_RIGHT_SQUARE) {
        expect(square.textContent).toBe(Constants.PLAYER_TWO_SYMBOL);
      } else {
        expect(square.textContent).toBe('');
      }
    })
    expect(status.textContent).toBe(Constants.PLAYER_TWO_WON);

  });

});
