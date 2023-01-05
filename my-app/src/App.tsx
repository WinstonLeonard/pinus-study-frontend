import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import ModulePageThread from './components/threads/ModulePageThread';

function App() {
  return (
    <div className="App">
      <ModulePageThread/>
    </div>
  );
}

export default App;
