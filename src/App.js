import React, { useState, useEffect } from 'react';

import TodoForm from './components/TodoForm';

import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setTodos(todos);
  }, [todos]);

  return (
    <div className="App">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h1>todos</h1> <small>(hooks)</small>
      </div>
      <div style={{ display: 'flex' }}>
        <TodoForm todos={todos} setTodos={setTodos} />
      </div>
      <ul>
        {todos.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
