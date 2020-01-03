import React from 'react';
import { Button } from 'antd';
import logo from './logo.svg';
import './App.css';
import APITable from './components/APITable';

function App() {
  return (
    <div className="App">
      <Button type="primary">버튼</Button>
      <APITable></APITable>
    </div>
  );
}

export default App;
