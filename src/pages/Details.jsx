import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductId } from '../services/api';
import { getProductsInCart, saveProductsInCart } from '../services/localStorageApi';

class Details extends Component {
  state = {
    productDetails: {},
  };

  componentDidMount() {
    this.fetchId();
  }

  fetchId = async () => {
    const { match: { params: { id: productId } } } = this.props;
    const response = await getProductId(productId);
    const { id, price, quantity = 1, thumbnail, title } = response;
    const result = { id, price, quantity, thumbnail, title };
    this.setState({ productDetails: result });
  }

  handleBtnChange = () => {
    const { productDetails } = this.state;
    const cartList = getProductsInCart();
    saveProductsInCart([...cartList, productDetails]);
  }

  render() {
    const { productDetails } = this.state;
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
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          onClick={ this.handleBtnChange }
        >
          Adicionar ao carrinho
        </button>
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
