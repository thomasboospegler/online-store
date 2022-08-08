import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductId } from '../services/api';
import { getProductsInCart, saveProductsInCart } from '../services/localStorageApi';

class Details extends Component {
  state = {
    productDetails: [],
    quantity: 0,
    evaluation: '',
    email: '',
  };

  componentDidMount() {
    const { match: { params: { id: productId } } } = this.props;
    const cartList = getProductsInCart();
    const product = cartList.filter((item) => item.id === productId);
    this.fetchId(productId);
    if (product.length > 0) {
      this.setState({
        quantity: product[0].quantity,
      });
    }
  }

  fetchId = async (productId) => {
    const response = await getProductId(productId);
    const { id, price, thumbnail, title } = response;
    const cartList = getProductsInCart();
    const product = cartList.filter((item) => item.id === productId);
    const result = { id,
      price,
      quantity: product.length > 0 ? product[0].quantity : 0,
      thumbnail,
      title,
      available_quantity: response.available_quantity };
    this.setState({
      productDetails: result,
    });
  }

  handleBtnChange = () => {
    let cartList = getProductsInCart();
    const { productDetails } = this.state;
    productDetails.quantity += 1;
    this.setState({
      quantity: productDetails.quantity,
    });
    cartList = cartList.filter((item) => item.id !== productDetails.id);
    saveProductsInCart([...cartList, productDetails]);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { productDetails, quantity, evaluation, email } = this.state;
    return (
      <section>
        <Link to="/cart">
          <button data-testid="shopping-cart-button" type="button">
            Carrinho
          </button>
        </Link>
        <h3 data-testid="product-detail-name">{productDetails.title}</h3>
        <p data-testid="product-detail-price">{`R$ ${productDetails.price}`}</p>
        <img
          data-testid="product-detail-image"
          src={ productDetails.thumbnail }
          alt={ productDetails.price }
        />
        <h4>Especificações Técnicas</h4>
        <ul>
          <li>{productDetails.warranty}</li>
          <li>{`Quantidade: ${productDetails.available_quantity}`}</li>
          <li>Outras Especificações...</li>
        </ul>
        <div className="card-quantity">
          <button
            data-testid="product-detail-add-to-cart"
            type="button"
            className="card-cart-btn"
            onClick={ this.handleBtnChange }
          >
            Adicionar ao carrinho
          </button>
          { quantity > 0
          && (
            <span
              className="card-cart-amount"
            >
              { quantity }
            </span>)}
        </div>
        <form className="comments-container">
          <input
            type="text"
            name="email"
            value={ email }
            data-testid="product-detail-email"
            required
          />
          <label htmlFor="1-rating">
            <input
              name="rating"
              value="1"
              type="radio"
              data-testid="1-rating"
              id="1-rating"
            />
            1
          </label>
          <label htmlFor="2-rating">
            <input
              name="rating"
              value="2"
              type="radio"
              data-testid="2-rating"
              id="2-rating"
            />
            2
          </label>
          <label htmlFor="3-rating">
            <input
              name="rating"
              value="3"
              type="radio"
              data-testid="3-rating"
              id="3-rating"
            />
            3
          </label>
          <label htmlFor="4-rating">
            <input
              name="rating"
              value="4"
              type="radio"
              data-testid="4-rating"
              id="4-rating"
            />
            4
          </label>
          <label htmlFor="5-rating">
            <input
              name="rating"
              value="5"
              type="radio"
              data-testid="5-rating"
              id="5-rating"
            />
            5
          </label>
          <textarea
            name="evaluation"
            id="product-detail-evaluation"
            cols="30"
            rows="10"
            data-testid="product-detail-evaluation"
            value={ evaluation }
            onChange={ this.handleChange }
            required
          />
          <button
            type="submit"
            data-testid="submit-review-btn"
            onClick={ this.handleSubmitBtn }
          >
            Enviar
          </button>
        </form>
      </section>
    );
  }
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default Details;
