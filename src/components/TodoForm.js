import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TodoForm = ({ setTodos, todos }) => {
  const [value, setValue] = useState('');

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

    setTodos(todos.concat(newTodo));
    setValue('');
  };

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
