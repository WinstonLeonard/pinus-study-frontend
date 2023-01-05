import React from 'react';
import { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
// import ModulePageThread from './components/threads/ModulePageThread';

function TestCORS() {
  const makeAPICall = async () => {
    try {
      const response = await fetch('http://localhost:8080/ping', {mode:'cors'});
      const data = await response.json();
      console.log({ data })
    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    makeAPICall();
  }, [])
  return (
    <div className="App">
      <h1>React Cors Guide</h1>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <TestCORS/>
    </div>
  );
}

export default App;
