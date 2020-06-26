import React, { useState, useEffect } from 'react';

const Todo = ({
  id,
  title,
  completed,
  selectItemToUpdate,
  itemToUpdate,
  updateTodo,
}) => {
  const [titleToUpdate, setTitleToUpdate] = useState('');

  useEffect(() => {
    setTitleToUpdate(title);
  }, [title]);

  const toggleVisibleForm = (id) => {
    selectItemToUpdate(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTodo({ id: itemToUpdate, title: titleToUpdate });
    toggleVisibleForm('');
  };

  const handleChange = (e) => {
    setTitleToUpdate(e.target.value);
  };

  return (
    <div
      style={{
        display: 'flex',
        textDecoration: completed ? 'line-through' : 'none',
      }}
    >
      {itemToUpdate === id ? (
        <form onSubmit={handleSubmit}>
          <input
            data-testid="todo-update-input-id"
            type="text"
            autoFocus
            value={titleToUpdate}
            onChange={handleChange}
          />
        </form>
      ) : (
        <p
          id={`${id}`}
          data-testid="todo-item-id"
          onDoubleClick={() => toggleVisibleForm(id)}
        >
          {title}
        </p>
      )}
    </div>
  );
};

export default Todo;
