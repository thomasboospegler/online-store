import React from 'react';
/* import logo from './logo.svg'; */
import './App.css';
// import { getProductsFromCategoryAndQuery } from './services/Api';

class App extends React.Component {
  render() {
    // const algo = getProductsFromCategoryAndQuery;
    return (
      <div className="App">
        <header className="App-header" />
        <getProductsFromCategoryAndQuery />
      </div>
    );
  }
}

export default App;
