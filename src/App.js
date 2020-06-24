import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h1>todos</h1> <small>(hooks)</small>
      </div>
      <div style={{ display: 'flex' }}>
        <button>v</button>
        <input />
      </div>
    </div>
  );
}

export default App;
