import React, { useContext, useEffect } from 'react';

import TodoForm from './components/TodoForm';
import VisibleTodoList from './components/VisibleTodoList';

import { store } from './store';

import './App.css';

const App = () => {
  const appState = useContext(store);
  const { dispatch } = appState;
  const todos = appState.state.todos;

  useEffect(() => {
    dispatch({ type: 'DISPLAY_TODOS', todos });
  }, [dispatch, todos]);

  return (
    <div className="App">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h1>todos</h1> <small>(hooks)</small>
      </div>
      <div style={{ display: 'flex' }}>
        <TodoForm />
      </div>
      <VisibleTodoList todos={todos} />
    </div>
  );
};

export default App;
