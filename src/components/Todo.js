import React, { useState, useEffect, useContext } from 'react';

import { store } from '../store';

import {
  SELECT_ITEM_TO_UPDATE,
  UPDATE_TODO,
  REMOVE_TODO,
  TOGGLE_TODO_STATUS,
} from '../actions';

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
    if (titleToUpdate.length > 0) {
      updateTodo({ id: itemToUpdate, title: titleToUpdate });
      toggleVisibleForm('');
    }
    return;
  };

  const handleChange = (e) => {
    setTitleToUpdate(e.target.value);
  };

  const selectItemToUpdate = (itemId) =>
    dispatch({ type: SELECT_ITEM_TO_UPDATE, itemId });

  const updateTodo = (itemToUpdate) =>
    dispatch({ type: UPDATE_TODO, itemToUpdate });

  const handleRemove = (itemId) => dispatch({ type: REMOVE_TODO, itemId });

  const toggleStatus = (itemId) => {
    dispatch({
      type: TOGGLE_TODO_STATUS,
      itemId,
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        textDecoration: completed ? 'line-through' : 'none',
      }}
    >
      <input
        data-testid={`checkbox-id-${id}`}
        type="checkbox"
        checked={completed}
        id={`${id}`}
        name={`${title}`}
        value={completed ? 'completed' : 'active'}
        onChange={() => toggleStatus(id)}
      />
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
      <button
        data-testid={`delete-button-${id}`}
        onClick={() => handleRemove(id)}
      >
        x
      </button>
    </div>
  );
};

export default Todo;
