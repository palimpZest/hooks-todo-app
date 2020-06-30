import React, { createContext, useReducer } from 'react';
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
        default:
          return state;
      }
    },
    initialState,
    initValues,
  );

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
