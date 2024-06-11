import LoadingCube from '../components/LoadingCube.jsx'; // Adjust the import path
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

// *Integration test* 
describe('LoadingCube Integration Test', () => {
  it('renders LoadingCube component', () => {
    render(<LoadingCube />);

    // Check if the LoadingCube is present in the document
    const loadingCubeElement = screen.getByRole('document', { name: /loadingcube/i });
    expect(loadingCubeElement).toBeInTheDocument();
  });
});
