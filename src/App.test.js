import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App todo display tests', () => {
  test('renders todo title', () => {
    const { getByText } = render(<App />);

    const linkElement = getByText(/todos/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('adds todo item from form input', () => {
    const { getByText, getByTestId } = render(<App />, {
      initialState: { todos: [] },
    });

    const newTitleToAdd = 'Good Day';
    const input = getByTestId('todo-input-id');

    expect(input.value).toBe('');

    fireEvent.change(input, { target: { value: newTitleToAdd } });
    fireEvent.submit(input);

    expect(input).toBeInTheDocument();
    expect(getByText(newTitleToAdd)).toBeInTheDocument();
  });
});
