import React, { useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import TodoForm from './components/TodoForm';
import VisibleTodoList from './components/VisibleTodoList';
import ButtonBar from './components/ButtonBar';

import { store } from './store';
import { TOGGLE_EVERY_TODO_STATUS } from './actions';

import { getActiveItems, saveState } from './helpers';

import checkMark from './check-mark.svg';

import './App.css';

const App = ({ match: { params } }) => {
  const appState = useContext(store);
  const { dispatch } = appState;
  const todos = appState.state.todos;
  const activeItems = getActiveItems(todos);

  useEffect(() => {
    saveState(appState);
  }, [appState, dispatch, todos]);

  const toogleEveryTodoStatus = () => {
    dispatch({ type: TOGGLE_EVERY_TODO_STATUS });
  };

  return (
    <div className="App">
      <h1 className="text-logo">tasker</h1>
      <div className="todo-input-holder">
        <button
          className="toggle-all-button"
          data-testid="toggle-all-button-id"
          onClick={toogleEveryTodoStatus}
        >
          <img
            className={
              activeItems ? 'toogle-all-red-check' : 'toogle-all-green-check'
            }
            src={checkMark}
            alt="a check mark"
          />
        </button>
        <TodoForm />
      </div>
      <ButtonBar todos={todos} />
      <VisibleTodoList todos={todos} filter={params.filter || 'all'} />
    </div>
  );
};

export default withRouter(App);
