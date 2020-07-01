const LOCAL_STATE = 'local-state';

export const getActiveItems = (todos) => {
  let count = 0;
  todos &&
    todos.forEach((element) => {
      if (element.completed === false) {
        count++;
      }
    });
  return count;
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(LOCAL_STATE);

    if (serializedState === null) {
      return undefined;
    }
    const state = JSON.parse(serializedState).state;

    if (state.todos) {
      return state;
    }
  } catch (err) {
    console.log(err); // eslint-disable-line
    return undefined;
  }
};

export const saveState = (fullState) => {
  try {
    const state = fullState;
    const serializedState = JSON.stringify(state);

    localStorage.setItem(LOCAL_STATE, serializedState);
  } catch (err) {
    console.log(err); // eslint-disable-line
  }
};
