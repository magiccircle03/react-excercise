import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Read from './pages/Read';
import Update from './pages/Update';
import Create from './pages/Create';
import Delete from './pages/Delete';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Read" component={Read} />
        <Route exact path="/Update" component={Update} />
        <Route exact path="/Create" component={Create} />
        <Route exact path="/Delete" component={Delete} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
