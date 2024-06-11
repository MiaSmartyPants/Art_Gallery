
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import ImageGenerator from '../components/ImageGenerator';


// *Integration test*
test('ImageGenerator handles input change ', () => {
  render(<ImageGenerator onImagesGenerated={() => {}} />);

  //  Ensure generator bar is rendered
  const inputElement = screen.getByPlaceholderText('Enter a prompt...');
  expect(inputElement).toBeInTheDocument();
  
  // Simulate user typing a prompt and if the input value is updated
  fireEvent.change(screen.getByPlaceholderText('Enter a prompt...'), {
    target: { value: 'test prompt' },
  });
  expect(screen.getByPlaceholderText('Enter a prompt...').value).toBe('test prompt');

});
