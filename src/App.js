import React, { useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import TodoForm from './components/TodoForm';
import VisibleTodoList from './components/VisibleTodoList';
import ButtonBar from './components/ButtonBar';

import { store } from './store';
import { DISPLAY_TODOS } from './actions';

import './App.css';

const App = ({ match: { params } }) => {
  const appState = useContext(store);
  const { dispatch } = appState;
  const todos = appState.state.todos;

  useEffect(() => {
    dispatch({ type: DISPLAY_TODOS, todos });
  }, [dispatch, todos]);

  return (
    <div className="App">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h1>todos</h1> <small>(hooks)</small>
      </div>
      <div style={{ display: 'flex' }}>
        <TodoForm />
      </div>
      <VisibleTodoList todos={todos} filter={params.filter || 'all'} />
      <ButtonBar todos={todos} />
    </div>
  );
};

export default withRouter(App);
