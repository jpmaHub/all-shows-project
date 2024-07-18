import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  it('renders todays deal page', () => {
    render(<App />);
    const heading = screen.getByText(/Today's Deals/i);
    expect(heading).toBeDefined();
  });
});