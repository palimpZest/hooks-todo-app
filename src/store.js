import React, { createContext, useReducer } from 'react';

export const initialState = { todos: [], itemToUpdate: '' };

const store = createContext(initialState);

const { Provider } = store;

const StateProvider = ({ children, initValues }) => {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'DISPLAY_TODO':
          return state;
        case 'ADD_TODO':
          return { ...state, todos: state.todos.concat(action.todo) };
        case 'SELECT_ITEM_TO_UPDATE':
          return {
            ...state,
            itemToUpdate: action.itemId,
          };
        case 'UPDATE_TODO':
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
        case 'REMOVE_TODO':
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
