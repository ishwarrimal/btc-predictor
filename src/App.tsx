import React, { useState } from 'react';
import logo from './btc-logo.png';
import './App.css';
import GameInterface from './pages/gameInterface';
import { GameProvider } from './context/gameContext';

function App() {
  return (
    <div className="App">
      <h1 className="title">Bitcoin Price Guessing Game</h1>
      <GameProvider>
        <GameInterface />
      </GameProvider>
    </div>
  );
}

export default App;
