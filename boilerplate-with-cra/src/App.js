import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Read from './pages/Read';
import Update from './pages/Update';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Read" component={Read} />
        <Route exact path="/Update" component={Update} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
