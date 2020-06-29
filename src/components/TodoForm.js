import React, { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { store } from '../store';

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

  const addTodo = (todo) => dispatch({ type: 'ADD_TODO', todo });

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-testid="todo-input-id"
        type="text"
        autoFocus
        value={value}
        onChange={handleChange}
        placeholder="What to do?"
      />
    </form>
  );
};

export default TodoForm;
