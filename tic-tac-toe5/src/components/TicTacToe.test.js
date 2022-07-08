import { render, screen } from '@testing-library/react';
import TicTacToe from './TicTacToe';
import { Constants } from '../constants/TestConstants';

describe('TicTacToe component', () => {

  test('should have title', () => {
    render(<TicTacToe />);

    const headerElement = screen.getByTestId('header');

    expect(headerElement).toBeInTheDocument();
    expect(headerElement.textContent).toBe(Constants.HEADER);
  });

  test('Should create empty nine squares in the board when game starts', () => {
    render(<TicTacToe />);

    const squares = screen.queryAllByRole('square');

    expect(squares).toHaveLength(Constants.TOTAL_SQUARES);
    squares.forEach((square) => {
      expect(square.textContent).toBe('');
    })
  });

});
