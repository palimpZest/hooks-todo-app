import React from 'react';

import { render, fireEvent } from './test-utils';

import App from './App';

import { mockedTodos } from './mocks';

describe('App todo display tests', () => {
  test('renders todo title', () => {
    const { getByText } = render(<App />);

    const linkElement = getByText(/todos/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('adds todo item from form input', () => {
    const { getByText, getByTestId } = render(<App />);

    const newTitleToAdd = 'Good Day';
    const input = getByTestId('todo-input-id');

    expect(input.value).toBe('');

    fireEvent.change(input, { target: { value: newTitleToAdd } });
    fireEvent.submit(input);

    expect(input).toBeInTheDocument();
    expect(getByText(newTitleToAdd)).toBeInTheDocument();
  });

  test('updates todo item', () => {
    const { getAllByTestId, getByTestId, getByText, queryByText } = render(
      <App />,
      {
        initValues: {
          todos: mockedTodos,
        },
      },
    );

    const newTodoTitle = 'This is a new todo title';

    const allVisibleItems = getAllByTestId('todo-item-id');
    const firstTodoItem = allVisibleItems[0];

    expect(getByText('Hey')).toBeVisible();

    fireEvent.doubleClick(firstTodoItem);

    const updateInput = getByTestId('todo-update-input-id');

    fireEvent.change(updateInput, { target: { value: newTodoTitle } });
    fireEvent.submit(updateInput);

    expect(queryByText('Hey')).not.toBeInTheDocument();
    expect(getByText(newTodoTitle)).toBeVisible();
  });
});

test('removes todo item with button', () => {
  const { queryByText, getByTestId } = render(<App />, {
    initValues: {
      todos: mockedTodos,
    },
  });
  const secondMockedTodo = mockedTodos[1];
  const button = getByTestId(`delete-button-${secondMockedTodo.id}`);

  fireEvent.click(button);

  expect(queryByText(secondMockedTodo.title)).not.toBeInTheDocument();
});
