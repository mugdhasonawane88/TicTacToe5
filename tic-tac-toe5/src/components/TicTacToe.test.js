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

});
