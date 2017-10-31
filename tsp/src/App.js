import React, { Component } from 'react';

import BruteForce from './BruteForce';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Traveling Salesman Vizualization</h1>
        </header>
        <BruteForce />
      </div>
    );
  }
}

export default App;
