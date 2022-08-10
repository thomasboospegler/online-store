import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Details from './pages/Details';
import Checkout from './pages/Checkout';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route exact path="/cart" component={ Cart } />
            <Route exact path="/details/:id" component={ Details } />
            <Route exact path="/checkout" component={ Checkout } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
