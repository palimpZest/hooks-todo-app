import React, { useState, useEffect, useContext } from 'react';

import { store } from '../store';

const Todo = ({ id, title, completed }) => {
  const [titleToUpdate, setTitleToUpdate] = useState('');
  const appState = useContext(store);
  const { dispatch } = appState;
  const itemToUpdate = appState.state.itemToUpdate;

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

  const selectItemToUpdate = (itemId) =>
    dispatch({ type: 'SELECT_ITEM_TO_UPDATE', itemId });

  const updateTodo = (itemToUpdate) =>
    dispatch({ type: 'UPDATE_TODO', itemToUpdate });

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
