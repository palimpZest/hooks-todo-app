import React from 'react';
import checkMark from '../check-mark.svg';

const ToggleButton = ({ activeItems, toggleEveryTodoStatus }) => {
  return (
    <button
      className="toggle-all-button"
      data-testid="toggle-all-button-id"
      onClick={toggleEveryTodoStatus}
    >
      <img
        className={
          activeItems ? 'toogle-all-red-check' : 'toogle-all-green-check'
        }
        src={checkMark}
        alt="a check mark"
      />
    </button>
  );
};

export default ToggleButton;
