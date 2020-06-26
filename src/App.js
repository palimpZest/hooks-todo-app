import React, { useEffect, useReducer } from 'react';

import TodoForm from './components/TodoForm';
import VisibleTodoList from './components/VisibleTodoList';

import todoReducer, { initialState as appInitialState } from './reducers';

import './App.css';

const App = ({ initialState = appInitialState }) => {
  const [appState, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'DISPLAY_TODOS', todos: appState.todos });
  }, [appState]);

  const addTodo = (todo) => {
    dispatch({ type: 'ADD_TODO', todo });
  };

  const selectItemToUpdate = (itemId) => {
    dispatch({ type: 'SELECT_ITEM_TO_UPDATE', itemId });
  };

  const updateTodo = (itemToUpdate) => {
    dispatch({ type: 'UPDATE_TODO', itemToUpdate });
  };

  return (
    <div className="App">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h1>todos</h1> <small>(hooks)</small>
      </div>
      <div style={{ display: 'flex' }}>
        <TodoForm addTodo={addTodo} />
      </div>
      <VisibleTodoList
        todos={appState.todos}
        itemToUpdate={appState.itemToUpdate}
        selectItemToUpdate={selectItemToUpdate}
        updateTodo={updateTodo}
      />
    </div>
  );
};

export default App;
