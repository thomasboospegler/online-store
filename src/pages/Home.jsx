import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';
import { getProductQuantity,
  addProduct, subtractProduct } from '../services/localStorageApi';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      products: [],
      click: false,
      categoriesList: [],
      // didStorageChange: false,
    };
  }

  componentDidMount = async () => {
    const list = await getCategories();
    this.setState({ categoriesList: list });
  }

  handleChange = ({ target }) => {
    this.setState({
      query: target.value,
    });
  }

  handleClick = async ({ target }) => {
    const { name, value } = target;
    let response;
    if (name === 'category-button') {
      response = await getProductsFromCategoryAndQuery(value, '');
    } else {
      const { query } = this.state;
      response = await getProductsFromCategoryAndQuery('', query);
    }
    this.setState({
      products: response.results,
      click: true,
    });
  }

  handleCardBtn = ({ target }, product) => {
    const { name } = target;
    // this.setState({ didStorageChange: true });
    if (name === 'addButton') {
      addProduct(product);
    }
    if (name === 'subtractButton') {
      subtractProduct(product);
    }
    this.forceUpdate();
  }

  setProduto = (item, quantity) => {
    const result = {
      id: item.id,
      title: item.title,
      thumbail: item.thumbnail,
      price: item.price,
      quantity };
    return result;
  }

  getQuantity = async (item) => {
    const result = await getProductQuantity(item);
    console.log('getquantity: ', result);
    return result;
  }

  render() {
    const { products, click, categoriesList } = this.state;
    return (
      <div>
        <header>
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
          <Link to="/cart">
            <button data-testid="shopping-cart-button" type="button">
              Carrinho
            </button>
          </Link>
        </header>
        <div className="home-categories">
          {categoriesList.map(({ id, name }) => (
            <button
              type="button"
              data-testid="category"
              value={ id }
              key={ id }
              name="category-button"
              onClick={ this.handleClick }
            >
              {name}
            </button>))}
        </div>
        {products.length < 2 && click ? <span>Nenhum produto foi encontrado</span>
          : (
            <div>
              {products.map((item) => {
                const quantity = this.getQuantity(item);
                console.log('render: ', quantity);
                return (<Card
                  key={ item.id }
                  id={ item.id }
                  title={ item.title }
                  thumbnail={ item.thumbnail }
                  price={ item.price }
                  quantity={ quantity }
                  onClick={ (e) => this.handleCardBtn(e, this
                    .setProduto(item, quantity)) }
                />);
              })}
            </div>
          )}
      </div>
    );
  }
}

export default Home;
