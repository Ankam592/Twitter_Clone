import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StopWatch from './StopWatch';


  test('starts the stopwatch when Start is clicked', () => {
    render(<StopWatch />);
    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);

    // Wait for 1 second using a fake timer or check that the time has changed after a delay
    // Here we assume that the timer shows "1" after 1 second (you can adjust based on your logic)
    setTimeout(() => {
      const display = screen.getByTestId('stopwatch-display');
      expect(display.textContent).not.toBe('00hh:00mm:01ss');
    }, 1000);
  });
