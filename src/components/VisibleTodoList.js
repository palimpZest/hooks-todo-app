import React from 'react';

import Todo from './Todo';

export const VisibilityFilters = {
  SHOW_ALL_TODOS: 'all',
  SHOW_COMPLETED_TODOS: 'completed',
  SHOW_ACTIVE_TODOS: 'active',
};

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL_TODOS:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED_TODOS:
      return todos.filter((t) => t.completed);
    case VisibilityFilters.SHOW_ACTIVE_TODOS:
      return todos.filter((t) => !t.completed);
    default:
      throw new Error('Unknown filter: ' + filter);
  }
};

const VisibleTodoList = ({ todos, filter = 'all' }) => {
  const visibleTodos = getVisibleTodos(todos, filter);

  return (
    <>
      {todos &&
        visibleTodos.length > 0 &&
        visibleTodos.map((todo) => (
          <Todo key={todo.id} todos={todos} {...todo} />
        ))}
    </>
  );
};

export default VisibleTodoList;
