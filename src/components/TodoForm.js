import React, { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { store } from '../store';

import { ADD_TODO } from '../actions';
const TodoForm = () => {
  const [value, setValue] = useState('');
  const appState = useContext(store);
  const { dispatch } = appState;

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      id: uuidv4(),
      title: value,
      completed: false,
    };

    addTodo(newTodo);
    setValue('');
  };

  const addTodo = (todo) => {
    if (todo.title.length > 0) {
      dispatch({ type: ADD_TODO, todo });
    }
    return;
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="todo-input"
        data-testid="todo-input-id"
        type="text"
        autoFocus
        value={value}
        onChange={handleChange}
        placeholder="What do you want to do today ?"
      />
    </form>
  );
};

export default TodoForm;
