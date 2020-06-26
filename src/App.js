import React, { useContext, useEffect } from 'react';

import TodoForm from './components/TodoForm';
import VisibleTodoList from './components/VisibleTodoList';

import { store } from './store';

import './App.css';

const App = () => {
  const appState = useContext(store);

  const { dispatch } = appState;

  const todos = appState.state.todos;
  const itemToUpdate = appState.state.itemToUpdate;

  useEffect(() => {
    dispatch({ type: 'DISPLAY_TODOS', todos });
  }, [dispatch, todos]);

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
        todos={todos}
        itemToUpdate={itemToUpdate}
        selectItemToUpdate={selectItemToUpdate}
        updateTodo={updateTodo}
      />
    </div>
  );
};

export default App;
