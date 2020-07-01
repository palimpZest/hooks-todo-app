import React, { createContext, useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';

import * as actions from './actions';

export const initialState = { todos: [], itemToUpdate: '' };

const store = createContext(initialState);

const { Provider } = store;

const StateProvider = ({ children, initValues }) => {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case actions.DISPLAY_TODOS:
          return state;
        case actions.ADD_TODO:
          return { ...state, todos: state.todos.concat(action.todo) };
        case actions.SELECT_ITEM_TO_UPDATE:
          return {
            ...state,
            itemToUpdate: action.itemId,
          };
        case actions.UPDATE_TODO:
          return {
            ...state,
            todos: state.todos.map((item) =>
              item.id === action.itemToUpdate.id
                ? {
                    ...item,
                    title: action.itemToUpdate.title,
                  }
                : item,
            ),
          };
        case actions.REMOVE_TODO:
          return {
            ...state,
            todos: state.todos.filter((item) => item.id !== action.itemId),
          };
        case actions.REMOVE_COMPLETED_TODOS:
          return {
            ...state,
            todos: state.todos.filter((item) => item.completed === false),
          };
        case actions.TOGGLE_TODO_STATUS:
          return {
            ...state,
            todos: state.todos.map((item) =>
              item.id === action.itemId
                ? {
                    ...item,
                    completed: !item.completed,
                  }
                : item,
            ),
          };
        case actions.TOGGLE_EVERY_TODO_STATUS:
          const hasActiveTodos = state.todos.some(
            (item) => item.completed === false,
          );
          return {
            ...state,
            todos: state.todos.map((item) =>
              hasActiveTodos
                ? { ...item, completed: true }
                : { ...item, completed: false },
            ),
          };
        default:
          return state;
      }
    },
    initialState,
    initValues,
  );

  return (
    <BrowserRouter>
      <Provider value={{ state, dispatch }}>{children}</Provider>
    </BrowserRouter>
  );
};

export { store, StateProvider };
