import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from './components'
// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={ Home } exact />
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
