import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <span
        data-testid="home-initial-message"
      >
        Digite algum termo de pesquisa ou escolha uma categoria.
      </span>
    );
  }
}

export default Home;
