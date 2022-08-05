import React, { Component } from 'react';
import Card from '../components/Card';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      products: [],
      click: false,
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      query: target.value,
    });
  }

  handleClick = async () => {
    const { query } = this.state;
    const response = await getProductsFromCategoryAndQuery('', query);
    this.setState({
      products: response.results,
      click: true,
    });
  }

  render() {
    const { products, click } = this.state;
    return (
      <div>
        <span
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </span>
        <input
          onChange={ this.handleChange }
          type="text"
          data-testid="query-input"
        />
        <button
          onClick={ this.handleClick }
          type="button"
          data-testid="query-button"
        >
          Pesquisar
        </button>
        {products.length < 2 && click ? <span>Nenhum produto foi encontrado</span>
          : (
            <div>
              {products.map((item) => (<Card
                key={ item.id }
                title={ item.title }
                thumbnail={ item.thumbnail }
                price={ item.price }
              />))}
            </div>)}
      </div>
    );
  }
}

export default Home;
