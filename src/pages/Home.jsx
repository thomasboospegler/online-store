import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';
import { getProductsInCart, saveProductsInCart } from '../services/localStorageApi';
import '../styles/Home.css';
// import { addProductQuantity,
//   subtractProductQuantity, getQuantityInCart } from '../services/stateAPI';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      products: [],
      click: false,
      categoriesList: [],
      cartList: [],
    };
  }

  componentDidMount = async () => {
    const categorylist = await getCategories();
    this.setState({
      categoriesList: categorylist,
      cartList: getProductsInCart(),
    });
  }

  componentDidUpdate = () => {
    const { cartList } = this.state;
    if (JSON.stringify(cartList) !== JSON.stringify(getProductsInCart())) {
      saveProductsInCart(cartList);
    }
  }

  handleChange = ({ target }) => {
    this.setState({
      query: target.value,
    });
  }

  saveCartInState = (productsLlist) => this
    .setState({ cartList: productsLlist });

  getCartInState = () => {
    const { cartList } = this.state;
    const result = cartList;
    return result;
  };

  removeProductFromArray = (product) => {
    const productsInState = this.getCartInState();
    if (productsInState.length > 0) {
      return (productsInState.filter((p) => p.id !== product.id));
    }
    return [];
  };

  removeProductFromState = (product) => {
    const productsInState = this.getCartInState();
    if (productsInState.length > 0) {
      this.saveCartInState(productsInState.filter((p) => p.id !== product.id));
    }
  };

  setItem = (product) => {
    if (product) {
      const productsInState = this.removeProductFromArray(product);
      if (product.quantity > 0) {
        this.saveCartInState([...productsInState || {}, product]);
      } else {
        this.removeProductFromState(product);
      }
    }
  };

  addProductQuantity = (product, quantity, avaliable) => {
    if (product.quantity < avaliable) {
      product.quantity += quantity;
      this.setItem(product/* , 1 */);
    }
  };

  subtractProductQuantity = (product, quantity) => {
    product.quantity -= quantity;
    this.setItem(product/* , MINUS */);
  };

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

  handleCardBtn = ({ target }, product, avaliable) => {
    const { name } = target;
    const { cartList } = this.state;
    saveProductsInCart(cartList);
    if (name === 'addButton') {
      // addProduct(product);
      this.addProductQuantity(product, 1, avaliable);
    }
    if ((name === 'minusButton') && (product.quantity > 1)) {
      this.subtractProductQuantity(product, 1);
    }
    if (name === 'removeButton') {
      this.subtractProductQuantity(product, product.quantity);
    }
  }

  getQuantityInCart = (item) => {
    const { cartList } = this.state;
    const result = cartList.filter(({ id }) => id === item.id);
    return !result[0] ? 0 : result[0].quantity || 0;
  }

  render() {
    const { products, click, categoriesList } = this.state;
    return (
      <div>
        <header className="home-header">
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
            <button
              data-testid="shopping-cart-button"
              type="button"
              name="cart"
            >
              Carrinho
            </button>
          </Link>
        </header>
        <div className="home-category-products-container">
          <div className="home-categories">
            {categoriesList.map(({ id, name }) => (
              <button
                type="button"
                data-testid="category"
                className="home-category-btn"
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
              <div className="home-products">
                {products.map((item) => {
                  const quantity = this.getQuantityInCart(item, this.state);
                  return (<Card
                    key={ item.id }
                    id={ item.id }
                    title={ item.title }
                    thumbnail={ item.thumbnail }
                    price={ item.price }
                    quantity={ quantity }
                    avaliableQuantity={ item.available_quantity }
                    onClick={ this.handleCardBtn }
                  />);
                })}
              </div>
            )}
        </div>

      </div>
    );
  }
}

export default Home;
