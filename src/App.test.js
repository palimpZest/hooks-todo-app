import React from 'react';

import { fireEvent, renderWithRouter } from './test-utils';

import App from './App';

import { mockedTodos } from './mocks';

describe('App todo display tests', () => {
  test('renders todo title', () => {
    const { getByText } = renderWithRouter(<App />);

    const linkElement = getByText(/todos/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('adds todo item from form input', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);

    const newTitleToAdd = 'Good Day';
    const input = getByTestId('todo-input-id');

    expect(input.value).toBe('');

    fireEvent.change(input, { target: { value: newTitleToAdd } });
    fireEvent.submit(input);

    expect(input).toBeInTheDocument();
    expect(getByText(newTitleToAdd)).toBeInTheDocument();
  });

  test('updates todo item', () => {
    const {
      getAllByTestId,
      getByTestId,
      getByText,
      queryByText,
    } = renderWithRouter(<App />, {
      initValues: {
        todos: mockedTodos,
      },
    });

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

  test('removes todo item with button', () => {
    const { queryByText, getByTestId } = renderWithRouter(<App />, {
      initValues: {
        todos: mockedTodos,
      },
    });
    const secondMockedTodo = mockedTodos[1];
    const button = getByTestId(`delete-button-${secondMockedTodo.id}`);

    fireEvent.click(button);

    expect(queryByText(secondMockedTodo.title)).not.toBeInTheDocument();
  });

  test('displays clear completed button only if completed todos are present', () => {
    const { getByTestId, queryByTestId } = renderWithRouter(<App />, {
      initValues: { todos: mockedTodos },
      route: '/all',
      path: '/:filter',
    });

    const areSomeCompleted = mockedTodos.some(
      (item) => item.completed === true,
    );

    const clearButton = getByTestId('button-clear-completed-id');

    expect(areSomeCompleted).toBe(true);
    expect(clearButton).toBeVisible();

    fireEvent.click(clearButton);

    const clearButtonAfterClick = queryByTestId('button-clear-completed-id');

    expect(clearButtonAfterClick).toBe(null);
  });

  test('renders all todos', () => {
    const { getAllByTestId } = renderWithRouter(<App />, {
      initValues: { todos: mockedTodos },
      route: '/all',
      path: '/:filter',
    });

    const allVisibleItems = getAllByTestId('todo-item-id');

    expect(allVisibleItems.length).toBe(5);
  });
});
