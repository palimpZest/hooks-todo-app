export const initialState = { todos: [], itemToUpdate: '' };

const todoReducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};

export default todoReducer;
