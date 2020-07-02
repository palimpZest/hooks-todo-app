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
    <div className="todo-holder">
      <div className="todo-toogle-input">
        <label className="checkbox-container">
          <input
            className="checkbox"
            data-testid={`checkbox-id-${id}`}
            type="checkbox"
            checked={completed}
            id={`${id}`}
            name={`${title}`}
            value={completed ? 'completed' : 'active'}
            onChange={() => toggleStatus(id)}
          />
          <span className="checkmark" />
        </label>
      </div>
      {itemToUpdate === id ? (
        <form onSubmit={handleSubmit}>
          <input
            className="todo-update-input"
            data-testid="todo-update-input-id"
            type="text"
            autoFocus
            value={titleToUpdate}
            onChange={handleChange}
          />
        </form>
      ) : (
        <div className="todo-item">
          <p
            style={{
              textDecoration: completed ? 'line-through' : 'none',
            }}
            className="todo-title"
            id={`${id}`}
            data-testid="todo-item-id"
            onDoubleClick={() => toggleVisibleForm(id)}
          >
            {title}
          </p>
          <button
            className="remove-button"
            data-testid={`delete-button-${id}`}
            onClick={() => handleRemove(id)}
          >
            x
          </button>
        </div>
      )}
    </div>
  );
};

export default Todo;
