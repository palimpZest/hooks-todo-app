import React, { useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import TodoForm from './components/TodoForm';
import VisibleTodoList from './components/VisibleTodoList';
import ButtonBar from './components/ButtonBar';

import { store } from './store';

import { saveState } from './helpers';

import './App.css';

const App = ({ match: { params } }) => {
  const appState = useContext(store);
  const { dispatch } = appState;
  const todos = appState.state.todos;

  useEffect(() => {
    saveState(appState);
  }, [appState, dispatch, todos]);

  return (
    <div className="App">
      <h1 className="text-logo">tasker</h1>
      <TodoForm todos={todos} />
      <ButtonBar todos={todos} />
      <VisibleTodoList todos={todos} filter={params.filter || 'all'} />
    </div>
  );
};

export default withRouter(App);
