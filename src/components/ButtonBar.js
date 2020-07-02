import React, { useContext } from 'react';

import FilterLink from '../components/FilterLink';
import { VisibilityFilters } from '../components/VisibleTodoList';

import { store } from '../store';
import { REMOVE_COMPLETED_TODOS } from '../actions';

import { getActiveItems } from '../helpers';

const ButtonBar = ({ todos }) => {
  const appState = useContext(store);
  const { dispatch } = appState;

  const hasTodos = todos.length > 0;
  const areSomeCompleted = todos.some((item) => item.completed === true);
  const activeItems = getActiveItems(todos);

  const handleClearCompleted = () => {
    dispatch({ type: REMOVE_COMPLETED_TODOS });
  };

  return (
    <>
      {hasTodos && (
        <>
          <div data-testid="button-bar-id" className="button-bar">
            <div>
              <FilterLink filter={VisibilityFilters.SHOW_ALL_TODOS}>
                <button>All</button>
              </FilterLink>

              <FilterLink filter={VisibilityFilters.SHOW_ACTIVE_TODOS}>
                <button data-testid="button-active-id">Active</button>
              </FilterLink>

              <FilterLink filter={VisibilityFilters.SHOW_COMPLETED_TODOS}>
                <button data-testid="button-completed-id">Completed</button>
              </FilterLink>

              {areSomeCompleted && (
                <button
                  data-testid="button-clear-completed-id"
                  onClick={() => handleClearCompleted()}
                >
                  Clear completed
                </button>
              )}
            </div>
          </div>
          <div className="items-left">{activeItems} items left</div>
        </>
      )}
    </>
  );
};

export default ButtonBar;
