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
        <Route path="/Read" component={Read} />
        <Route path="/Update" component={Update} />
        <Route path="/Create" component={Create} />
        <Route path="/Delete" component={Delete} />
        <Route exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
