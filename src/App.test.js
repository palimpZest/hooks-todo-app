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
      initValues: { todos: mockedTodos },
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
      initValues: { todos: mockedTodos },
    });
    const secondMockedTodo = mockedTodos[1];
    const button = getByTestId(`delete-button-${secondMockedTodo.id}`);

    fireEvent.click(button);

    expect(queryByText(secondMockedTodo.title)).not.toBeInTheDocument();
  });

  test('displays clear completed button only if completed todos are present', () => {
    const { getByTestId, queryByTestId } = renderWithRouter(<App />, {
      initValues: { todos: mockedTodos },
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

  test('removes all completed todo items with button', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />, {
      initValues: { todos: mockedTodos },
    });

    const allVisibleItems = getAllByTestId('todo-item-id');
    expect(allVisibleItems.length).toBe(5);

    const clearCompletedButton = getByTestId(`button-clear-completed-id`);
    fireEvent.click(clearCompletedButton);

    const allVisibleItemsAfterClick = getAllByTestId('todo-item-id');
    expect(allVisibleItemsAfterClick.length).toBe(2);
  });

  test('renders all todos', () => {
    const { getAllByTestId } = renderWithRouter(<App />, {
      initValues: { todos: mockedTodos },
    });

    const allVisibleItems = getAllByTestId('todo-item-id');

    expect(allVisibleItems.length).toBe(5);
  });

  test('renders active todos only', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(<App />, {
      initValues: { todos: mockedTodos },
      route: '/all',
      path: '/:filter',
    });

    const buttonActive = getByTestId('button-active-id');
    fireEvent.click(buttonActive);

    const allVisibleItems = getAllByTestId('todo-item-id');

    expect(allVisibleItems.length).toBe(2);
  });

  test('renders completed todos only', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(<App />, {
      initValues: { todos: mockedTodos },
      route: '/all',
      path: '/:filter',
    });

    const buttonCompleted = getByTestId('button-completed-id');
    fireEvent.click(buttonCompleted);

    const allVisibleItems = getAllByTestId('todo-item-id');

    expect(allVisibleItems.length).toBe(3);
  });

  test('toggles individual todo status', () => {
    const { getByTestId } = renderWithRouter(<App />, {
      initValues: { todos: mockedTodos },
      route: '/all',
      path: '/:filter',
    });

    const mockedActiveTodoId = mockedTodos[0].id;
    const mockedActiveTodoInput = getByTestId(
      `checkbox-id-${mockedActiveTodoId}`,
    );

    expect(mockedActiveTodoInput.value).toBe('active');

    fireEvent.click(mockedActiveTodoInput);

    expect(mockedActiveTodoInput.value).toBe('completed');

    fireEvent.click(mockedActiveTodoInput);

    expect(mockedActiveTodoInput.value).toBe('active');
  });

  test('toggles every todo status', () => {
    const { getByTestId, queryAllByRole } = renderWithRouter(<App />, {
      initValues: { todos: mockedTodos },
      route: '/all',
      path: '/:filter',
    });

    const hasActiveTodos = mockedTodos.some((item) => item.completed === false);
    expect(hasActiveTodos).toBe(true);

    const toogleAllButton = getByTestId('toggle-all-button-id');

    fireEvent.click(toogleAllButton);

    const everyCheckbox = queryAllByRole('checkbox');
    everyCheckbox.forEach((checkbox) => {
      expect(checkbox.value).toBe('completed');
    });

    fireEvent.click(toogleAllButton);

    const everyCheckboxAfterClick = queryAllByRole('checkbox');
    everyCheckboxAfterClick.forEach((checkbox) => {
      expect(checkbox.value).toBe('active');
    });
  });

  test('displays remaining items', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />, {
      initValues: { todos: mockedTodos },
    });

    const itemsRemaining = getByText('2 items left');
    const toogleAllButton = getByTestId('toggle-all-button-id');

    fireEvent.click(toogleAllButton);

    const itemsRemainingAfterToggleAllCompleted = getByText('0 items left');

    fireEvent.click(toogleAllButton);

    const itemsRemainingAfterToggleAllActive = getByText('5 items left');

    expect(itemsRemaining).toBeVisible();
    expect(itemsRemainingAfterToggleAllActive).toBeVisible();
    expect(itemsRemainingAfterToggleAllCompleted).toBeVisible();
  });

  test('displays button bar only if todos are present', () => {
    const { getByTestId, queryByTestId } = renderWithRouter(<App />, {
      initValues: { todos: mockedTodos },
    });

    const buttonBar = getByTestId('button-bar-id');

    const toogleAllButton = getByTestId('toggle-all-button-id');
    fireEvent.click(toogleAllButton);

    const clearButton = getByTestId('button-clear-completed-id');
    fireEvent.click(clearButton);

    const buttonBarAfterClicks = queryByTestId('button-bar-id');

    expect(buttonBar).toBeVisible();
    expect(buttonBarAfterClicks).not.toBeInTheDocument();
  });

  test('displays placeholder text on inputs', () => {
    const { getByPlaceholderText } = renderWithRouter(<App />, {
      initValues: { todos: mockedTodos },
    });

    const todoInputPlaceholder = getByPlaceholderText('What to do?');

    expect(todoInputPlaceholder).toBeVisible();
  });

  test('displays current todo title as input value when selected for update', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />, {
      initValues: { todos: mockedTodos },
    });

    const allVisibleItems = getAllByTestId('todo-item-id');
    const firstTodoItem = allVisibleItems[0];
    const firstTodoItemTitle = mockedTodos[0].title;

    fireEvent.doubleClick(firstTodoItem);

    const updateInput = getByTestId('todo-update-input-id');

    expect(updateInput.value).toBe(firstTodoItemTitle);
  });
});
