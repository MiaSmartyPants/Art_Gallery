import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import App from '../App.jsx';

// *Functional test* to ensure rendering of button and input from user
test('render and click generate button', () => {
  render(<App />);
  const buttonElement = screen.getByText('Generate');
  fireEvent.click(screen.getByText('Generate'));
  expect(buttonElement).toBeInTheDocument();
});
